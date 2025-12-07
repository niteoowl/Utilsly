$files = Get-ChildItem -Path "c:\Users\PC\Desktop\Utilsly\tools" -Filter "*.html" -Recurse

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false
    
    # Fix white backgrounds in styles - replace with var(--bg-primary)
    # But preserve specific cases like canvas backgrounds
    $originalContent = $content
    
    # Pattern 1: Simple background: white; -> background: var(--bg-primary);
    $content = $content -replace '(\s+)background:\s*white;', '$1background: var(--bg-primary);'
    
    # Pattern 2: background-color: white; -> background-color: var(--bg-primary);
    $content = $content -replace '(\s+)background-color:\s*white;', '$1background-color: var(--bg-primary);'
    
    # Pattern 3: background: #fff; or #ffffff; -> background: var(--bg-primary);
    $content = $content -replace '(\s+)background:\s*#fff(fff)?;', '$1background: var(--bg-primary);'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Fixed dark mode colors: $($file.Name)"
        $count++
        $modified = $true
    }
}

Write-Host "`nTotal files with dark mode fixes: $count"
