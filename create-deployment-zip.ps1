# Safe cPanel OVERLAY zip — does not include images or extra site folders.
# Extract over the existing public_html. Do not delete the live site first.

Write-Host "Creating SAFE overlay deployment package..." -ForegroundColor Cyan

$zipName = Join-Path ([Environment]::GetFolderPath("UserProfile")) "Downloads\amazon-filtration-careers-OVERLAY.zip"
$tempDir = "deployment-temp"

if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

function Copy-ToTemp($relativePath) {
    $src = $relativePath
    if (-not (Test-Path $src)) {
        Write-Host "  SKIP missing $relativePath" -ForegroundColor DarkYellow
        return
    }
    $dest = Join-Path $tempDir $relativePath
    $destDir = Split-Path $dest -Parent
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }
    Copy-Item $src -Destination $dest -Force
    Write-Host "  OK $relativePath" -ForegroundColor Green
}

Copy-ToTemp "index.html"
Copy-ToTemp ".htaccess"
Copy-ToTemp "CPANEL-README.txt"
Copy-ToTemp "static\js\main.d12675dc.js"
Copy-ToTemp "static\css\amazon-dark-theme.css"
Copy-ToTemp "static\css\amazon-industrial.css"
Copy-ToTemp "static\css\amazon-mfg.css"

Copy-ToTemp "images\logo-nav.png"
Copy-ToTemp "images\about\Amazon-filtration-company-pic.jpg"
Copy-ToTemp "images\about\about-hero-filters.png"
Get-ChildItem "images\home" -ErrorAction SilentlyContinue | ForEach-Object {
    Copy-ToTemp ("images\home\" + $_.Name)
}
Copy-ToTemp "backend-php\api\jobs.php"
Copy-ToTemp "backend-php\api\applications.php"
Copy-ToTemp "backend-php\smtp.php"
Copy-ToTemp "backend-php\create_tables.sql"

$resumeDir = Join-Path $tempDir "backend-php\uploads\resumes"
New-Item -ItemType Directory -Path $resumeDir -Force | Out-Null
if (Test-Path "backend-php\uploads\resumes\.htaccess") {
    Copy-Item "backend-php\uploads\resumes\.htaccess" -Destination $resumeDir -Force
}

Write-Host ""
Write-Host "Creating zip: $zipName" -ForegroundColor Cyan
if (Test-Path $zipName) {
    Remove-Item $zipName -Force
}
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipName -Force
Remove-Item $tempDir -Recurse -Force

$fullPath = (Resolve-Path $zipName).Path
$sizeMB = [math]::Round((Get-Item $zipName).Length / 1MB, 2)
Write-Host ""
Write-Host "Done: $fullPath ($sizeMB MB)" -ForegroundColor Green
Write-Host "OVERLAY ONLY. Do not delete public_html or images first." -ForegroundColor Yellow
exit 0
