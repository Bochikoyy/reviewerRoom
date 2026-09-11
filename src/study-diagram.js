import {esc} from './study-ui.js';

let diagramId = 0;
const NODE_WIDTH = 216;
const LINE_HEIGHT = 20;

// SVG text does not wrap by itself. Measure conservatively so long names and
// unbroken identifiers remain inside their cards, including in printed notes.
function textWidth(text) {
  return [...text].reduce((width, char) => width + (char.codePointAt(0) > 0x2e80 ? 16 : /[ilI.,:;'!| ]/.test(char) ? 4 : /[MW@%]/.test(char) ? 12 : /[A-Z0-9]/.test(char) ? 9 : 8), 0);
}

function wrap(text, width) {
  const lines = [];
  let line = '';
  for (const word of text.trim().split(/\s+/)) {
    if (line && textWidth(`${line} ${word}`) > width) {
      lines.push(line);
      line = '';
    }
    for (const char of `${line ? ' ' : ''}${word}`) {
      if (line && textWidth(line + char) > width) {
        lines.push(line);
        line = '';
      }
      line += char;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function normalize(diagram) {
  if (!diagram || !['flow', 'cycle', 'hierarchy'].includes(diagram.kind) || !Array.isArray(diagram.nodes) || diagram.nodes.length < 2 || diagram.nodes.length > 12 || !Array.isArray(diagram.edges) || !diagram.edges.length || diagram.edges.length > 36) return null;
  const nodes = diagram.nodes.map(node => ({id: node?.id, label: node?.label}));
  if (nodes.some(node => typeof node.id !== 'string' || !node.id || typeof node.label !== 'string' || !node.label.trim() || node.label.length > 600) || new Set(nodes.map(node => node.id)).size !== nodes.length) return null;
  const ids = new Set(nodes.map(node => node.id));
  if (diagram.edges.some(edge => !edge || !ids.has(edge.from) || !ids.has(edge.to) || typeof (edge.label ?? '') !== 'string' || (edge.label?.length ?? 0) > 240)) return null;
  return {nodes, edges: diagram.edges.map(edge => ({...edge, label: edge.label?.trim() || ''})), caption: typeof diagram.caption === 'string' && diagram.caption.trim() ? diagram.caption.trim() : 'How these concepts connect'};
}

function layout(nodes, edges) {
  const incoming = new Map(nodes.map(node => [node.id, edges.filter(edge => edge.to === node.id).length]));
  const ranks = new Map(nodes.map(node => [node.id, 0]));
  const queue = nodes.filter(node => incoming.get(node.id) === 0).map(node => node.id);
  const visited = new Set();
  while (queue.length) {
    const id = queue.shift();
    visited.add(id);
    for (const edge of edges.filter(edge => edge.from === id)) {
      ranks.set(edge.to, Math.max(ranks.get(edge.to), ranks.get(id) + 1));
      incoming.set(edge.to, incoming.get(edge.to) - 1);
      if (incoming.get(edge.to) === 0) queue.push(edge.to);
    }
  }
  // Keep a cycle's return arrow explicit instead of pretending it is a tree.
  let nextRank = visited.size ? Math.max(...[...visited].map(id => ranks.get(id))) + 1 : 0;
  for (const node of nodes) if (!visited.has(node.id)) ranks.set(node.id, nextRank++);
  const rows = [];
  for (const rank of [...new Set(ranks.values())].sort((a, b) => a - b)) {
    const group = nodes.filter(node => ranks.get(node.id) === rank);
    // Broad branches fold into rows of three so the chart remains usable on
    // paper and only the chart itself scrolls on smaller screens.
    while (group.length) rows.push(group.splice(0, 3));
  }
  const columns = Math.max(...rows.map(row => row.length));
  const contentWidth = columns * (NODE_WIDTH + 36) - 36 + 56;
  const gap = 78;
  const positioned = new Map();
  let y = 24;
  rows.forEach((row, rowIndex) => {
    const lines = row.map(node => wrap(node.label, NODE_WIDTH - 38));
    const height = Math.max(...lines.map(value => value.length * LINE_HEIGHT + 28));
    row.forEach((node, index) => positioned.set(node.id, {
      ...node, row: rowIndex, lines: lines[index], height,
      x: (contentWidth - (row.length * (NODE_WIDTH + 36) - 36)) / 2 + index * (NODE_WIDTH + 36), y,
    }));
    y += height + gap;
  });
  const indirect = edges.filter(edge => positioned.get(edge.to).row !== positioned.get(edge.from).row + 1);
  const width = contentWidth + (indirect.length ? 154 + indirect.length * 14 : 0);
  return {positioned, width, contentWidth, height: y - gap + 40};
}

function labelText(lines, x, y, className) {
  return `<text class="${className}" text-anchor="middle">${lines.map((line, index) => `<tspan x="${x}" y="${y + index * LINE_HEIGHT}">${esc(line)}</tspan>`).join('')}</text>`;
}

export function studyDiagram(value) {
  const diagram = normalize(value);
  if (!diagram) return '';
  const uid = `study-diagram-${++diagramId}`;
  const {positioned, width, contentWidth, height} = layout(diagram.nodes, diagram.edges);
  const readable = diagram.edges.map(edge => `${positioned.get(edge.from).label} — ${edge.label || 'connects to'} → ${positioned.get(edge.to).label}`);
  let indirectIndex = 0;
  const connectors = diagram.edges.map((edge, index) => {
    const from = positioned.get(edge.from), to = positioned.get(edge.to);
    const fromX = from.x + NODE_WIDTH / 2, toX = to.x + NODE_WIDTH / 2;
    let path, labelX, labelY;
    if (to.row === from.row + 1) {
      const middle = (from.y + from.height + to.y) / 2;
      path = `M ${fromX} ${from.y + from.height} V ${middle} H ${toX} V ${to.y - 7}`;
      labelX = (fromX + toX) / 2;
      labelY = middle;
    } else {
      const rail = contentWidth + 12 + indirectIndex++ * 14;
      const startY = from.y + from.height + 17;
      const endY = to.y - 17;
      // Travel between rows, then around the outside, so return arrows and
      // links that skip a row never pass through another concept card.
      path = `M ${fromX} ${from.y + from.height} V ${startY} H ${rail} V ${endY} H ${toX} V ${to.y - 7}`;
      labelX = rail + 46;
      labelY = startY;
    }
    // Numbered keys keep a dense branching chart legible; the full wording is
    // always available directly below it in the connection list.
    const key = `<g class="study-diagram__edge-key"><circle cx="${labelX}" cy="${labelY}" r="11"/><text x="${labelX}" y="${labelY + 4}" text-anchor="middle">${index + 1}</text></g>`;
    return `<g class="study-diagram__edge"><path d="${path}" marker-end="url(#${uid}-arrow)"/>${key}</g>`;
  }).join('');
  const cards = [...positioned.values()].map((node, index) => `<g class="study-diagram__node${index === 0 ? ' study-diagram__node--first' : ''}"><rect x="${node.x}" y="${node.y}" width="${NODE_WIDTH}" height="${node.height}" rx="10"/>${labelText(node.lines, node.x + NODE_WIDTH / 2, node.y + (node.height - node.lines.length * LINE_HEIGHT) / 2 + 15, 'study-diagram__node-label')}</g>`).join('');
  return `<figure class="study-diagram"><figcaption id="${uid}-caption"><span class="eyebrow">CONNECT THE IDEAS</span>${esc(diagram.caption)}</figcaption><div class="study-diagram__scroll" tabindex="0" role="region" aria-labelledby="${uid}-caption"><svg class="study-diagram__canvas" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${uid}-title ${uid}-description"><title id="${uid}-title">${esc(diagram.caption)}</title><desc id="${uid}-description">${esc(readable.join('. ') + '.')}</desc><defs><marker id="${uid}-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>${connectors}${cards}</svg></div><div class="study-diagram__connections"><p>Follow the arrows</p><ol>${diagram.edges.map(edge => `<li><strong>${esc(positioned.get(edge.from).label)}</strong><span> ${esc(edge.label || 'connects to')} <span aria-hidden="true">→</span> </span><strong>${esc(positioned.get(edge.to).label)}</strong></li>`).join('')}</ol></div></figure>`;
}
