import {test, expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {studyDiagram} from '../src/study-diagram.js';

const diagramCss = readFileSync(new URL('../src/study-diagram.css', import.meta.url), 'utf8');
const fixture = (diagram) => `<style>:root{font-family:Arial,sans-serif;--border:#d7d4c9;--surface:#fffefa;--sidebar:#f6f4ec;--yellow-soft:#fbf2cf;--yellow-text:#655018;--text:#39372e;--muted:#7c7b70}*{box-sizing:border-box}body{margin:16px}${diagramCss}</style>${studyDiagram(diagram)}`;

test('diagram rendering rejects broken graphs and escapes document text', () => {
  expect(studyDiagram(null)).toBe('');
  expect(studyDiagram({kind:'flow', nodes:[{id:'a',label:'A'}], edges:[]})).toBe('');
  const graph = {kind:'flow', caption:'<img src=x onerror=alert(1)>', nodes:[{id:'a',label:'<script>alert(1)</script>'},{id:'b',label:'B & C'}], edges:[{from:'a',to:'b',label:'<b>activates</b>'}]};
  const html = studyDiagram(graph);
  expect(html).not.toContain('<script>');
  expect(html).not.toContain('<img');
  expect(html).toContain('&lt;script&gt;');
  expect(html).toContain('&lt;b&gt;activates&lt;/b&gt;');
  expect(studyDiagram({...graph, edges:[{from:'a',to:'missing'}]})).toBe('');
  expect(studyDiagram({...graph, nodes:[graph.nodes[0], graph.nodes[0]]})).toBe('');
});

test('branching diagrams scroll internally, wrap names, and retain accessible connections', async ({page}) => {
  const graph = {kind:'hierarchy', caption:'Branches of a classification', nodes:Array.from({length:12}, (_,i) => ({id:`n${i}`,label:i ? `Branch ${i}: a detailed concept with a long name and its important qualifier` : 'Classification'})), edges:Array.from({length:11}, (_,i) => ({from:'n0',to:`n${i+1}`,label:'includes'}))};
  await page.setViewportSize({width:320,height:740});
  await page.setContent(fixture(graph));
  await expect(page.getByRole('img')).toHaveAccessibleName(/Branches of a classification/);
  await expect(page.locator('.study-diagram__node')).toHaveCount(12);
  await expect(page.locator('.study-diagram__edge')).toHaveCount(11);
  await expect(page.locator('.study-diagram__connections li')).toHaveCount(11);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator('.study-diagram__scroll').evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
  const cardsFit = await page.locator('.study-diagram__node').evaluateAll(cards => cards.every(card => {
    const rect = card.querySelector('rect').getBBox(), text = card.querySelector('text').getBBox();
    return text.x >= rect.x && text.x + text.width <= rect.x + rect.width && text.y >= rect.y && text.y + text.height <= rect.y + rect.height;
  }));
  expect(cardsFit).toBe(true);
  await page.emulateMedia({media:'print'});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('cycle diagrams preserve the return arrow and its relationship', async ({page}) => {
  await page.setContent(fixture({kind:'cycle',caption:'A feedback cycle',nodes:[{id:'a',label:'First event'},{id:'b',label:'Second event'},{id:'c',label:'Third event'}],edges:[{from:'a',to:'b',label:'stimulates'},{from:'b',to:'c',label:'produces'},{from:'c',to:'a',label:'feeds back to'}]}));
  await expect(page.locator('.study-diagram__edge')).toHaveCount(3);
  await expect(page.locator('.study-diagram__connections li').last()).toHaveText('Third event feeds back to → First event');
  await expect(page.locator('svg desc')).toContainText('Third event — feeds back to → First event');
  const ids = await page.locator('svg marker').evaluateAll(markers => markers.map(marker => marker.id));
  expect(ids).toHaveLength(1);
  await expect(page.locator('.study-diagram__edge > path').last()).toHaveAttribute('marker-end',`url(#${ids[0]})`);
});
