import os
import io
from pypdf import PdfReader
from PIL import Image

output_dir = 'public/images/pathology-3'
os.makedirs(output_dir, exist_ok=True)
reader = PdfReader('public/lessons/Pathology-3.pdf')

saved = []
for i, page in enumerate(reader.pages):
    for img_name, img_file in page.images.items():
        try:
            im = Image.open(io.BytesIO(img_file.data))
            clean_name = img_name.replace('/', '')
            if im.mode == 'RGB' and im.width >= 150 and im.height >= 100:
                fname = f"page_{i+1}_{clean_name}.png"
                path = os.path.join(output_dir, fname)
                im.save(path)
                saved.append((i+1, img_name, fname, im.size, len(img_file.data)))
        except Exception as e:
            print(f"Error on page {i+1} {img_name}: {e}")

print(f"Total extracted: {len(saved)}")
for s in saved:
    print(f"Page {s[0]}: {s[1]} -> {s[2]} size={s[3]} bytes={s[4]}")
