const fs = require('fs');
const { PDFParse } = require('pdf-parse');
(async () => {
  fs.mkdirSync('sources', { recursive: true });
  fs.mkdirSync('public/lessons', { recursive: true });
  for (let n = 1; n <= 3; n++) {
    const path = `C:/Users/USER/Downloads/Unit-${n}.pdf`;
    const parser = new PDFParse({ data: fs.readFileSync(path) });
    const result = await parser.getText();
    fs.writeFileSync(`sources/unit-${n}.txt`, result.text);
    fs.copyFileSync(path, `public/lessons/Unit-${n}.pdf`);
    console.log(`Unit ${n}: ${result.total} pages, ${result.text.length} characters`);
    await parser.destroy();
  }
})();
