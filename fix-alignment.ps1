$files = Get-ChildItem -Path "c:\Users\PC\Desktop\Utilsly\tools" -Filter "*.html" -Recurse

$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false
    
    # Skip BMR and BMI calculators as they're already correct
    if ($file.Name -eq "bmr-calculator.html" -or $file.Name -eq "bmi-calculator.html") {
        continue
    }
    
    # Remove max-width + margin: 0 auto patterns from container classes
    $patterns = @(
        @{
            Old = 'max-width:\s*\d+px;\s*\r?\n\s*margin:\s*0\s*auto;'
            New = ''
        },
        @{
            Old = 'margin:\s*0\s*auto;\s*\r?\n\s*display:'
            New = 'display:'
        },
        @{
            Old = 'align-items:\s*center;\s*\r?\n'
            New = ''
        }
    )
    
    foreach ($pattern in $patterns) {
        if ($content -match $pattern.Old) {
            $content = $content -replace $pattern.Old, $pattern.New
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Fixed alignment: $($file.Name)"
        $count++
    }
}

Write-Host "`nTotal files fixed: $count"
