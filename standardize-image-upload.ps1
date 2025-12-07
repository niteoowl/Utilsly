$imageFiles = @(
    "c:\Users\PC\Desktop\Utilsly\tools\image\image-resizer.html",
    "c:\Users\PC\Desktop\Utilsly\tools\image\image-filters.html",
    "c:\Users\PC\Desktop\Utilsly\tools\image\image-converter.html",
    "c:\Users\PC\Desktop\Utilsly\tools\image\color-extractor.html"
)

$standardDropZone = @'
                    <div class="drop-zone" id="dropZone"
                        style="border: 2px dashed var(--border-color); padding: 40px; text-align: center; cursor: pointer; margin-bottom: 24px;">
                        <span class="material-symbols-rounded"
                            style="font-size: 48px; color: var(--text-tertiary);">cloud_upload</span>
                        <p style="margin-top: 16px;">이미지를 업로드하세요</p>
                        <input type="file" id="fileInput" accept="image/*" style="display: none;">
                    </div>
'@

$count = 0

foreach ($file in $imageFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Check if it has old drop-zone style
        if ($content -match 'drop-zone.*?background.*?border-radius') {
            # Replace old drop-zone with standard one
            $content = $content -replace '(?s)<div class="drop-zone"[^>]*>.*?</div>\s*</div>', $standardDropZone
            
            Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
            Write-Host "Standardized: $(Split-Path $file -Leaf)"
            $count++
        }
    }
}

Write-Host "`nTotal files standardized: $count"
