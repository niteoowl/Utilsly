$files = Get-ChildItem -Path "c:\Users\PC\Desktop\Utilsly\tools" -Filter "*.html" -Recurse

$boxPatterns = @(
    'clock-card',
    'controls-wrapper',
    'result-container'
)

$count = 0
$filesWithBoxes = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    foreach ($pattern in $boxPatterns) {
        if ($content -match $pattern) {
            $filesWithBoxes += $file.FullName
            Write-Host "Found box pattern '$pattern' in: $($file.Name)"
            break
        }
    }
}

Write-Host "`nTotal files with boxes: $($filesWithBoxes.Count)"
$filesWithBoxes | ForEach-Object { Write-Host $_ }
