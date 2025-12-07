$files = Get-ChildItem -Path "c:\Users\PC\Desktop\Utilsly\tools" -Filter "*.html" -Recurse

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false
    
    # Remove username from sidebar
    if ($content -match '<span class="username">Utilsly</span>') {
        $content = $content -replace '\s*<span class="username">Utilsly</span>', ''
        $modified = $true
    }
    
    # Fix breadcrumbs - extract the current page name from the last breadcrumb-item
    if ($content -match '<span class="breadcrumb-item current-page">([^<]+)</span>') {
        $pageName = $matches[1]
        # Replace entire breadcrumbs section with just the page name
        $content = $content -replace '<div class="breadcrumbs">[\s\S]*?</div>', "<div class=`"breadcrumbs`">`r`n                    <span class=`"breadcrumb-item`">$pageName</span>`r`n                </div>"
        $modified = $true
    }
    # Handle cases where there's no current-page class but still has breadcrumbs
    elseif ($content -match '<div class="breadcrumbs">[\s\S]*?<span class="breadcrumb-item">([^<]+)</span>[\s\S]*?</div>') {
        # Find the last breadcrumb item
        if ($content -match '<span class="breadcrumb-item">([^<]+)</span>\s*</div>') {
            $pageName = $matches[1]
            $content = $content -replace '<div class="breadcrumbs">[\s\S]*?</div>', "<div class=`"breadcrumbs`">`r`n                    <span class=`"breadcrumb-item`">$pageName</span>`r`n                </div>"
            $modified = $true
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.Name)"
        $count++
    }
}

Write-Host "`nTotal files updated: $count"
