$files = Get-ChildItem -Path "c:\Users\PC\Desktop\Utilsly" -Filter "*.html" -Recurse

$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false
    
    # Check if already has preload for style.css
    if ($content -match 'rel="preload".*style\.css') {
        continue
    }
    
    # Find the CSS link and add preload before it
    if ($content -match '(<link rel="stylesheet" href="[^"]*style\.css">)') {
        $cssLink = $matches[1]
        $cssPath = if ($cssLink -match 'href="([^"]+)"') { $matches[1] } else { '' }
        
        if ($cssPath) {
            $preloadLink = "<link rel=`"preload`" href=`"$cssPath`" as=`"style`">`r`n    "
            $content = $content -replace '(<link rel="stylesheet" href="[^"]*style\.css">)', "$preloadLink`$1"
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Added CSS preload: $($file.Name)"
        $count++
    }
}

Write-Host "`nTotal files updated: $count"
