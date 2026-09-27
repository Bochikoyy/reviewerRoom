Add-Type -AssemblyName System.Drawing

$source = 'C:\Users\USER\OneDrive\Desktop\reviewer\tmp\pdfs\digestion'
$files = Get-ChildItem -LiteralPath $source -Filter 'page-*.png' | Sort-Object Name
$thumbWidth = 220
$thumbHeight = 285
$labelHeight = 25
$columns = 5
$rows = 2
$perSheet = $columns * $rows

for ($offset = 0; $offset -lt $files.Count; $offset += $perSheet) {
  $count = [Math]::Min($perSheet, $files.Count - $offset)
  $sheet = New-Object System.Drawing.Bitmap ($columns * $thumbWidth), ($rows * ($thumbHeight + $labelHeight))
  $graphics = [System.Drawing.Graphics]::FromImage($sheet)
  $graphics.Clear([System.Drawing.Color]::White)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $font = New-Object System.Drawing.Font 'Arial', 12
  $brush = [System.Drawing.Brushes]::Black

  for ($index = 0; $index -lt $count; $index++) {
    $file = $files[$offset + $index]
    $column = $index % $columns
    $row = [Math]::Floor($index / $columns)
    $x = $column * $thumbWidth
    $y = $row * ($thumbHeight + $labelHeight)
    $image = [System.Drawing.Image]::FromFile($file.FullName)
    $graphics.DrawImage($image, $x, $y, $thumbWidth, $thumbHeight)
    $graphics.DrawString($file.BaseName, $font, $brush, $x + 4, $y + $thumbHeight + 3)
    $image.Dispose()
  }

  $sheetNumber = [Math]::Floor($offset / $perSheet) + 1
  $sheet.Save((Join-Path $source "contact-$sheetNumber.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $font.Dispose()
  $graphics.Dispose()
  $sheet.Dispose()
}
