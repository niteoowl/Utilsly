$files = Get-ChildItem -Path "c:\Users\PC\Desktop\Utilsly" -Filter "*.html" -Recurse

$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false
    
    # Check if already has render meta tag
    if ($content -match 'http-equiv="X-UA-Compatible"') {
        continue
    }
    
    # Add after viewport meta tag
    if ($content -match '(<meta name="viewport"[^>]+>)') {
        $viewportTag = $matches[1]
        $renderTag = "`r`n    <meta http-equiv=`"X-UA-Compatible`" content=`"IE=edge`">"
        $content = $content -replace '(<meta name="viewport"[^>]+>)', "`$1$renderTag"
        $modified = $true
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Added render meta: $($file.Name)"
        $count++
    }
}

Write-Host "`nTotal files updated: $count"
