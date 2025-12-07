$files = Get-ChildItem -Path "c:\Users\PC\Desktop\Utilsly\tools" -Filter "*.html" -Recurse

$centeringPatterns = @(
    'max-width:\s*\d+px;\s*margin:\s*0\s*auto',
    'margin:\s*0\s*auto.*max-width',
    'qr-container',
    'generator-container',
    'roulette-container'
)

$filesWithCentering = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    foreach ($pattern in $centeringPatterns) {
        if ($content -match $pattern) {
            if ($file.FullName -notlike "*bmr-calculator.html" -and $file.FullName -notlike "*bmi-calculator.html") {
                $filesWithCentering += @{
                    File = $file.FullName
                    Pattern = $pattern
                }
                Write-Host "Found centering pattern in: $($file.Name)"
                break
            }
        }
    }
}

Write-Host "`nTotal files with centering: $($filesWithCentering.Count)"
