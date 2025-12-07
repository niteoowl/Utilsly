$darkModeScript = @'
    <script>
        (function () {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        })();
    </script>
'@

# Get all HTML files in tools directory
$files = Get-ChildItem -Path "c:\Users\PC\Desktop\Utilsly\tools" -Filter "*.html" -Recurse

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Skip if already has the dark mode script
    if ($content -match 'localStorage\.getItem\(''theme''\)') {
        Write-Host "Skipping $($file.Name) - already has dark mode script"
        continue
    }
    
    # Insert dark mode script before the first <link rel="stylesheet"
    if ($content -match '(\s*)<link rel="stylesheet"') {
        $newContent = $content -replace '(\s*)<link rel="stylesheet"', "$darkModeScript`r`n`$1<link rel=`"stylesheet`""
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.Name)"
        $count++
    }
}

Write-Host "`nTotal files updated: $count"
