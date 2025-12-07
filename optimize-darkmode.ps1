$files = Get-ChildItem -Path "c:\Users\PC\Desktop\Utilsly" -Filter "*.html" -Recurse

$oldScript = @'
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

$newScript = @'
<script>
        !function(){const e=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;"dark"!==e&&(e||!t)||document.documentElement.setAttribute("data-theme","dark")}();
    </script>
'@

$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    if ($content -match [regex]::Escape($oldScript)) {
        $content = $content -replace [regex]::Escape($oldScript), $newScript
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Optimized dark mode script: $($file.Name)"
        $count++
    }
}

Write-Host "`nTotal files optimized: $count"
