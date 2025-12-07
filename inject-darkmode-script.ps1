# Dark mode flash prevention script to inject into HTML files
$darkModeScript = @'
    <script>
        // Prevent dark mode flash
        (function() {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
        })();
    </script>
'@

# Get all HTML files in tools directory
$toolFiles = Get-ChildItem -Path "c:\Users\PC\Desktop\Utilsly\tools" -Filter "*.html" -Recurse

$updatedCount = 0

foreach ($file in $toolFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Skip if already has the dark mode script
    if ($content -match "Prevent dark mode flash") {
        continue
    }
    
    # Find the position to insert (after <head> tag and before first <link or <script>)
    if ($content -match '(?s)(<head>.*?<meta name="description"[^>]*>)') {
        $newContent = $content -replace '(?s)(<meta name="description"[^>]*>)', "`$1`n$darkModeScript"
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        $updatedCount++
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "`nTotal files updated: $updatedCount"
