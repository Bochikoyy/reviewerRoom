import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { PDFParse } from 'pdf-parse';

const input = 'C:/Users/USER/Downloads/digestion (1) (1) (1).pdf';
const output = 'C:/Users/USER/OneDrive/Desktop/reviewer/tmp/pdfs/digestion';

await mkdir(output, { recursive: true });
const parser = new PDFParse({ data: await readFile(input) });
const text = await parser.getText();
await writeFile(`${output}/digestion.txt`, text.text, 'utf8');
const screenshots = await parser.getScreenshot({ desiredWidth: 1000, imageDataUrl: false });
for (const page of screenshots.pages) {
  await writeFile(`${output}/page-${String(page.pageNumber).padStart(2, '0')}.png`, page.data);
}
await parser.destroy();
console.log(JSON.stringify({ pages: text.total, characters: text.text.length, rendered: screenshots.pages.length }));
