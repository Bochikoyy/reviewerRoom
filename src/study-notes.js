// Source-first study notes: reorganize the document without supplying missing facts.
const clean = value => String(value || '').normalize('NFC').replace(/\u00ad/g, '').replace(/\s+/g, ' ').trim();
const key = value => clean(value).toLocaleLowerCase();
const unique = values => [...new Set(values.filter(Boolean))];
const bullet = /^(?:[•●▪◦‣■–—-]|â€¢|â—|â–ª)\s+/;
const stripBullet = value => clean(value).replace(bullet, '');
const genericHeading = /^(?:page|slide|document|section)\s*\d*$/i;
const continuation = /\s*(?:[-–—:]\s*)?(?:\((?:cont(?:inued)?\.?|cont['’]d)\)|(?:cont(?:inued)?\.?|cont['’]d))\s*$/i;
const sentenceCase = value => /^(?:a|an|the|this|these|those|it)\b/.test(value) ? value[0].toUpperCase() + value.slice(1) : value;

export function readableTitle(text) {
  const title = clean(text).replace(/^(?:lecture|lesson|chapter|unit)\s*\d+\s*[:.\-–—]?\s*/i, '').replace(continuation, '');
  // Preserve ordinary scientific capitalization (cAMP, DNA, Na+); normalize slide titles.
  return title && title === title.toUpperCase() && /[A-Z]{3}/.test(title)
    ? title.toLowerCase().replace(/(^|[.!?]\s+)[a-z]/g, character => character.toUpperCase()) : title;
}

function isNoise(text, block, index) {
  if (!text || key(text) === key(block.heading)) return true;
  if (/^(?:slide|page)\s+\d+(?:\s*(?:of|\/)\s*\d+)?$/i.test(text)) return true;
  if (/^(?:click to (?:edit|add)|double[- ]click to edit|add (?:a )?(?:footer|slide title))\b/i.test(text)) return true;
  if (/^(?:©|copyright\b|all rights reserved\b)/i.test(text)) return true;
  if (/^(?:thank you(?: for (?:listening|your attention))?[.!]?|questions\?|end of (?:lecture|presentation))$/i.test(text)) return true;
  // A numeric page footer is noise only when it matches the actual source number.
  const page = String(block.source || '').match(/^(?:page|slide)\s+(\d+)$/i);
  return !!(page && index === block.lines.length - 1 && text === page[1]);
}

function sourceItems(block) {
  const items = [];
  for (const [index, value] of (block.lines || []).entries()) {
    const raw = String(value);
    const text = stripBullet(raw).replace(/^Speaker notes:\s*/i, '');
    if (isNoise(text, block, index)) continue;
    const previous = items.at(-1);
    // PDF line wrapping is distinct from an actual list or a new definition.
    if (previous && !bullet.test(clean(raw)) && !/[.!?:;]$/.test(previous.text)
      && /^[a-z]/.test(text) && !/\s\|\s/.test(text) && !/^.{2,65}:\s/.test(text)
      && previous.text.length > 65) {
      previous.text += ` ${text}`;
      previous.raw.push(raw);
    } else items.push({text, raw:[raw], source:block.source || ''});
  }
  return items;
}

function topicGroups(blocks) {
  const groups = [];
  const byHeading = new Map();
  for (const block of blocks) {
    let heading = readableTitle(block.heading) || 'Key concepts';
    let items = sourceItems(block);
    if (!items.length) continue;
    if (genericHeading.test(heading) && groups.length) heading = groups.at(-1).heading;
    if (genericHeading.test(heading)) {
      const first = items[0].text;
      heading = shortLabel(first) && items.length > 1 ? readableTitle(items.shift().text) : 'Key concepts';
    }
    // A continuing topic often spans several slides, including speaker notes.
    let group = byHeading.get(key(heading));
    if (!group) {
      group = {heading, items:[], sources:[]};
      groups.push(group);
      byHeading.set(key(heading), group);
    }
    const seen = new Set(group.items.map(item => key(item.text)));
    for (const item of items) if (!seen.has(key(item.text))) {
      group.items.push(item);
      seen.add(key(item.text));
    }
    group.sources = unique([...group.sources, block.source]);
  }
  return groups;
}

function shortLabel(text) {
  return text.length >= 2 && text.length <= 75 && !/[.!?;:]$/.test(text)
    && !/\s(?:is|are|was|were|has|have|can|will|must|should)\s/i.test(text)
    && !/^(?:\d+[.)]|step\s+\d+|first,|next,|then,|finally,)\s/i.test(text)
    && text.split(/\s+/).length <= 9 && !/[|→⇒]/.test(text);
}

function definition(text) {
  const match = text.match(/^(.{2,75}?)\s*(?::\s+|\s+(?:is defined as|refers to|means|is|are)\s+)(.{3,})$/i);
  if (!match || match[1].split(/\s+/).length > 10 || /[.!?;|→⇒]/.test(match[1])) return null;
  return {term:match[1], explanation:sentenceCase(match[2]), original:text};
}

function sentences(text) {
  // Split only unambiguous sentence boundaries; retain decimals and abbreviations.
  return text.split(/(?<=[.!?])\s+(?=[A-Z][a-z])/).reduce((parts, part) => {
    const previous = parts.at(-1);
    if (previous && /\b(?:e\.g|i\.e|Dr|Mr|Ms|Prof|Fig|vs|etc)\.$/i.test(previous)) parts[parts.length - 1] += ` ${part}`;
    else parts.push(part);
    return parts;
  }, []);
}

function pipeCells(text) {
  if (!text.includes('|')) return null;
  const cells = text.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map(clean);
  return cells.length >= 2 ? cells : null;
}

function sourceTable(group) {
  for (let index = 0; index < group.items.length; index++) {
    const headers = pipeCells(group.items[index].text);
    if (!headers || headers.some(cell => !cell) || new Set(headers.map(key)).size !== headers.length) continue;
    const rows = [], used = new Set([index]);
    for (let rowIndex = index + 1; rowIndex < group.items.length; rowIndex++) {
      const cells = pipeCells(group.items[rowIndex].text);
      if (!cells || cells.length !== headers.length) break;
      used.add(rowIndex);
      if (!cells.every(cell => /^:?-{2,}:?$/.test(cell))) rows.push(cells);
    }
    if (rows.length) return {table:{caption:group.heading, headers, rows}, used};
  }
  return null;
}

// These labels describe grammatical relations present in the source, not subject knowledge.
const relations = [
  [/^(?:is|are) synthesized\s+(.+)$/i, 'Synthesis'],
  [/^(?:is|are) (?:derived|made|produced)\s+(.+)$/i, 'Origin / production'],
  [/^(?:is|are) stored\s+(.+)$/i, 'Storage'],
  [/^(?:is|are) released\s+(.+)$/i, 'Release'],
  [/^(?:is|are) transported\s+(.+)$/i, 'Transport'],
  [/^(?:binds?|acts?)\s+(?:to|on)\s+(.+)$/i, 'Target / binding'],
  [/^requires?\s+(.+)$/i, 'Requirements'],
  [/^contains?\s+(.+)$/i, 'Contents'],
  [/^(?:has|have)\s+(.+)$/i, 'Characteristics'],
  [/^(?:is|are)\s+(.+)$/i, 'Description']
];

function entityFacts(group) {
  const entities = new Map();
  const add = (entity, feature, value, itemIndex) => {
    if (!entities.has(key(entity))) entities.set(key(entity), {name:entity, facts:new Map(), used:new Set()});
    const record = entities.get(key(entity));
    const existing = record.facts.get(key(feature));
    record.facts.set(key(feature), {name:feature, value:existing ? `${existing.value} ${value}` : value});
    record.used.add(itemIndex);
  };
  let currentEntity = '';
  for (let index = 0; index < group.items.length; index++) {
    const text = group.items[index].text;
    const next = group.items[index + 1]?.text || '';
    if (shortLabel(text) && /^.{2,55}:\s+/.test(next)) {
      currentEntity = readableTitle(text);
      if (!entities.has(key(currentEntity))) entities.set(key(currentEntity), {name:currentEntity, facts:new Map(), used:new Set([index])});
      continue;
    }
    const labeled = text.match(/^(.{2,55}):\s+(.+)$/);
    if (currentEntity && labeled) {
      add(currentEntity, readableTitle(labeled[1]), labeled[2], index);
      continue;
    }
    currentEntity = '';
    // Repeated explicit subjects allow a comparison without guessing what "it" refers to.
    for (const sentence of sentences(text)) {
      const subject = sentence.match(/^(.{2,75}?)\s+((?:is|are|has|have|requires?|contains?|binds?|acts?)\s+.+)$/i);
      if (!subject || subject[1].split(/\s+/).length > 8 || /^(?:it|they|this|these|those|there|which|that)$/i.test(subject[1])) continue;
      const relation = relations.find(([pattern]) => pattern.test(subject[2]));
      if (relation) add(subject[1], relation[1], subject[2], index);
    }
  }
  return [...entities.values()];
}

function comparisonTable(group) {
  const entities = entityFacts(group).filter(entity => entity.facts.size >= 2);
  // Only align features explicitly present for every compared entity. Sparse facts stay in prose.
  let best = null;
  for (let start = 0; start < entities.length; start++) {
    const first = entities[start];
    const others = entities.slice(start + 1).filter(entity => [...first.facts.keys()].filter(feature => entity.facts.has(feature)).length >= 2);
    if (!others.length) continue;
    const compared = [first, ...others].slice(0, 5);
    const shared = [...first.facts.keys()].filter(feature => compared.every(entity => entity.facts.has(feature)));
    if (shared.length < 2) continue;
    const score = compared.length * shared.length;
    if (!best || score > best.score) best = {compared, shared, score};
  }
  if (!best) return null;
  const {compared, shared} = best;
  const table = {
    caption:`${group.heading}: compare the key features`,
    headers:['Feature', ...compared.map(entity => entity.name)],
    rows:shared.map(feature => [compared[0].facts.get(feature).name, ...compared.map(entity => sentenceCase(entity.facts.get(feature).value))])
  };
  // The prose retains all details that did not fit the comparison. Complete source statements
  // go into the table only if every sentence and every labeled fact has been represented.
  const tableText = key(table.rows.flat().join(' '));
  const used = new Set();
  for (const entity of compared) for (const index of entity.used) {
    const text = group.items[index].text;
    if (key(text) === key(entity.name)) {
      if ([...entity.facts.keys()].every(feature => shared.includes(feature))) used.add(index);
    } else {
      const labeled = text.match(/^(.{2,55}):\s+(.+)$/);
      if (labeled && shared.includes(key(labeled[1])) && tableText.includes(key(labeled[2]))) used.add(index);
      else if (sentences(text).every(sentence => {
        const remainder = sentence.slice(entity.name.length).trim();
        return key(sentence).startsWith(key(entity.name) + ' ') && tableText.includes(key(remainder));
      })) used.add(index);
    }
  }
  return {table, used};
}

function definitionTable(points, heading) {
  const eligible = points.map((point, index) => ({...point, index})).filter(point => point.term
    && point.explanation.length >= 8 && point.explanation.length <= 240
    && !/^(?:example|note|important|step|speaker notes|summary|takeaway|remember)\b/i.test(point.term));
  if (eligible.length < 3) return null;
  const rows = eligible.slice(0, 12);
  return {table:{caption:`${heading}: terms at a glance`, headers:['Term / concept', 'Meaning / defining detail'], rows:rows.map(point => [point.term, point.explanation])}, used:new Set(rows.map(point => point.index))};
}

function sourceDiagram(group) {
  for (const item of group.items) {
    if (!/(?:→|⇒|->)/.test(item.text) || /(?:↔|<->|⇌)/.test(item.text)) continue;
    let chain = item.text;
    const prefix = chain.match(/^([^:→⇒]{2,65}):\s+/);
    if (prefix) chain = chain.slice(prefix[0].length);
    const labels = chain.split(/\s*(?:→|⇒|->)\s*/).map(text => text.replace(/[.;]$/, '').trim());
    if (labels.length < 2 || labels.length > 12 || labels.some(label => label.length < 2 || label.length > 180)) continue;
    const distinct = unique(labels);
    if (distinct.length < 2 || labels.some(label => !item.raw.some(raw => raw.includes(label)))) continue;
    const nodes = distinct.map((label, index) => ({id:`n${index + 1}`, label}));
    const ids = new Map(nodes.map(node => [node.label, node.id]));
    return {
      caption:prefix ? prefix[1] : `${group.heading}: follow the sequence`,
      kind:labels[0] === labels.at(-1) ? 'cycle' : 'flow', nodes,
      edges:labels.slice(1).map((label, index) => ({from:ids.get(labels[index]), to:ids.get(label), label:''})),
      evidence:unique(item.raw)
    };
  }
  const sequenceContext = /\b(?:steps?|process|procedure|sequence|pathway|stages?|cycle|synthesis)\b/i.test(group.heading);
  const steps = [];
  for (const item of group.items) {
    const match = item.text.match(/^(Step\s+)?(\d{1,2})\s*[.):–-]\s*(.{3,180})$/i);
    if (!match || (!match[1] && !sequenceContext)) {
      if (steps.length) break;
      continue;
    }
    if (Number(match[2]) !== steps.length + 1) break;
    const label = match[3];
    if (!item.raw.some(raw => raw.includes(label))) break;
    steps.push({label, raw:item.raw});
  }
  if (steps.length < 2 || steps.length > 12) return null;
  return {
    caption:`${group.heading}: step by step`, kind:'flow',
    nodes:steps.map((step, index) => ({id:`n${index + 1}`, label:step.label})),
    edges:steps.slice(1).map((_, index) => ({from:`n${index + 1}`, to:`n${index + 2}`, label:''})),
    evidence:unique(steps.flatMap(step => step.raw))
  };
}

function concepts(items) {
  const points = [];
  for (let index = 0; index < items.length; index++) {
    const text = items[index].text;
    const next = items[index + 1]?.text;
    if (shortLabel(text) && next && !shortLabel(next) && !definition(next) && !pipeCells(next)) {
      // A term on one slide line and its explanation on the next belong together.
      points.push({term:readableTitle(text), explanation:next});
      index++;
      continue;
    }
    const parsed = definition(text);
    const point = parsed ? {term:parsed.term, explanation:parsed.explanation} : {term:'', explanation:text};
    const previous = points.at(-1);
    if (!point.term && previous?.term && /^(?:for example|e\.g\.|this\b|these\b|it\b|they\b|however\b|because\b|therefore\b|in contrast\b)/i.test(text)) previous.explanation += ` ${text}`;
    else points.push(point);
  }
  return points;
}

function recallTakeaway(section) {
  if (section.diagram) return `Trace ${section.diagram.nodes[0].label} through to ${section.diagram.nodes.at(-1).label}, explaining each step from memory.`;
  if (section.table && section.table.headers[0] === 'Feature') {
    return `Compare ${section.table.headers.slice(1).join(' and ')} by ${section.table.rows.map(row => row[0].toLowerCase()).join(', ')}. Be able to explain each difference without looking at the table.`;
  }
  const terms = unique(section.points.map(point => point.term));
  if (section.table?.headers[0] === 'Term / concept') terms.push(...section.table.rows.map(row => row[0]));
  if (terms.length) return `Check your understanding: explain ${terms.slice(0, 3).join('; ')} in your own words, including the defining details.`;
  if (section.table) return `Reconstruct the ${section.table.headers.join(' / ')} table from memory, then check each entry.`;
  return `Explain ${section.heading.replace(/[.!?]$/, '').toLowerCase()} in your own words, using the mechanisms, conditions, and examples given above.`;
}

function buildSection(group) {
  const diagram = sourceDiagram(group);
  const extractedTable = sourceTable(group) || comparisonTable(group);
  const remaining = group.items.filter((_, index) => !extractedTable?.used.has(index));
  // An explicit author conclusion belongs in the callout instead of being repeated verbatim.
  const conclusionIndex = remaining.findIndex(item => /^(?:key takeaway|takeaway|remember|in summary|key point|important)\s*[:–—]\s*\S/i.test(item.text));
  const conclusion = conclusionIndex < 0 ? '' : remaining.splice(conclusionIndex, 1)[0].text.replace(/^[^:–—]+[:–—]\s*/, '');
  const summaryIndex = remaining.findIndex(item => item.text.length >= 45 && /[.!?]$/.test(item.text)
    && !/^(?:step\s+\d|\d+[.)]|for example|e\.g\.)/i.test(item.text) && !pipeCells(item.text)
    && !/^[^:]{2,65}:\s/.test(item.text) && !/[→⇒]|->/.test(item.text));
  const summary = summaryIndex < 0 ? '' : remaining.splice(summaryIndex, 1)[0].text;
  let points = concepts(remaining);
  let table = extractedTable?.table || null;
  if (!table) {
    const definitions = definitionTable(points, group.heading);
    if (definitions) {
      table = definitions.table;
      points = points.filter((_, index) => !definitions.used.has(index));
    }
  }
  const section = {heading:group.heading, summary, points, table, diagram, takeaway:conclusion, sources:group.sources};
  section.takeaway ||= recallTakeaway(section);
  return section;
}

function objectiveFor(section) {
  if (section.diagram) return `Trace the sequence in ${section.heading.toLowerCase()} and explain each step.`;
  if (section.table?.headers[0] === 'Feature') return `Compare ${section.table.headers.slice(1).join(' and ')} using their defining features.`;
  const terms = section.table?.headers[0] === 'Term / concept' ? section.table.rows.map(row => row[0]) : section.points.map(point => point.term).filter(Boolean);
  if (terms.length >= 2) return `Distinguish ${terms.slice(0, 3).map(term => term.replace(/^(?:a|an|the)\s+/i, '')).join(', ')}.`;
  return `Explain ${section.heading.replace(/[.!?]$/, '').toLowerCase()} using the details in the lesson.`;
}

export function buildStudyGuide(blocks = []) {
  const sections = topicGroups(blocks).map(buildSection);
  const titles = blocks.map(block => readableTitle(block.heading)).filter(title => title && !genericHeading.test(title));
  const title = titles.find(value => !/^(?:introductory concepts|introduction|overview|learning objectives|objectives)$/i.test(value)) || titles[0] || 'Study notes';
  const objectives = unique(sections.map(objectiveFor)).slice(0, 5);
  const firstSummary = sections.find(section => section.summary)?.summary;
  return {
    version:3, title,
    subtitle:firstSummary && firstSummary.length <= 320 ? firstSummary : `Build a clear understanding of ${sections.slice(0, 3).map(section => section.heading.toLowerCase()).join(', ') || 'the source material'}. Use the comparisons and recall prompts to check what you know.`,
    objectives, sections
  };
}

export function guideForLesson(lesson) {
  const guide = lesson.studyGuide;
  // Upgrade stored source notes automatically; user writing and AI explanations are authoritative.
  if (guide && (guide.version >= 3 || lesson.manualEdits || lesson.notesText != null || /\bAI\b/i.test(lesson.generationMethod || ''))) return guide;
  if (guide && !(lesson.notes || []).some(note => note.lines?.length)) return guide;
  return buildStudyGuide((lesson.notes || []).map(note => ({heading:note.heading, lines:note.lines || [], source:note.source})));
}
