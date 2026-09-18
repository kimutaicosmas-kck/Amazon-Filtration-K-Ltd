# PowerShell script to create deployment zip for Amazon Filtration website
# Run this script after building your React app (ASCII-only for Windows PS compatibility)

Write-Host "Creating Amazon Filtration deployment package..." -ForegroundColor Cyan

$zipName = Join-Path ([Environment]::GetFolderPath("UserProfile")) "Downloads\amazon-filtration-cpanel-careers.zip"
$tempDir = "deployment-temp"

if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

Write-Host "Copying files..." -ForegroundColor Yellow

$filesToCopy = @(
    "index.html",
    "favicon.ico",
    "logo.png",
    "manifest.json",
    "robots.txt",
    "sitemap.xml",
    "browserconfig.xml",
    ".htaccess",
    "CPANEL-README.txt",
    "google55fe466bb53372ac.html"
)

foreach ($file in $filesToCopy) {
    if (Test-Path $file) {
        Copy-Item $file -Destination $tempDir -Force
        Write-Host "  OK $file" -ForegroundColor Green
    }
}

if (Test-Path "static") {
    New-Item -ItemType Directory -Path (Join-Path $tempDir "static\js") -Force | Out-Null
    New-Item -ItemType Directory -Path (Join-Path $tempDir "static\css") -Force | Out-Null
    Copy-Item "static\js\main.d12675dc.js" -Destination (Join-Path $tempDir "static\js") -Force
    if (Test-Path "static\js\main.d12675dc.js.LICENSE.txt") {
        Copy-Item "static\js\main.d12675dc.js.LICENSE.txt" -Destination (Join-Path $tempDir "static\js") -Force
    }
    Copy-Item "static\css\main.f964a97d.css" -Destination (Join-Path $tempDir "static\css") -Force
    Copy-Item "static\css\amazon-industrial.css" -Destination (Join-Path $tempDir "static\css") -Force
    if (Test-Path "static\css\amazon-dark-theme.css") {
        Copy-Item "static\css\amazon-dark-theme.css" -Destination (Join-Path $tempDir "static\css") -Force
    }
    Write-Host "  OK static/ (current bundle + CSS only)" -ForegroundColor Green
}

if (Test-Path "build") {
    Copy-Item "build" -Destination $tempDir -Recurse -Force
    Write-Host "  OK build/" -ForegroundColor Green
}

if (Test-Path "backend-php") {
    # Exclude uploads/ (often locked locally; create empty folder on server with write perms)
    $destBackend = Join-Path $tempDir "backend-php"
    New-Item -ItemType Directory -Path $destBackend -Force | Out-Null
    robocopy "backend-php" $destBackend /E /XD uploads /NFL /NDL /NJH /NJS | Out-Null
    $rc = $LASTEXITCODE
    if ($rc -ge 8) {
        Write-Host "  ERROR robocopy backend-php failed (exit $rc)" -ForegroundColor Red
        exit $rc
    }
    New-Item -ItemType Directory -Path (Join-Path $destBackend "uploads\resumes") -Force | Out-Null
    if (Test-Path "backend-php\uploads\resumes\.htaccess") {
        Copy-Item "backend-php\uploads\resumes\.htaccess" -Destination (Join-Path $destBackend "uploads\resumes") -Force
    }
    Write-Host "  OK backend-php/ (uploads/resumes empty -- set chmod 755 on server)" -ForegroundColor Green
}

if (Test-Path "images") {
    Copy-Item "images" -Destination $tempDir -Recurse -Force
    Write-Host "  OK images/" -ForegroundColor Green
}

$dirsToCopy = @("about", "admin", "industries", "services", "support", "team")
foreach ($dir in $dirsToCopy) {
    if (Test-Path $dir) {
        Copy-Item $dir -Destination $tempDir -Recurse -Force
        Write-Host "  OK $dir/" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Creating zip: $zipName" -ForegroundColor Cyan

if (Test-Path $zipName) {
    Remove-Item $zipName -Force
}

try {
    Compress-Archive -Path "$tempDir\*" -DestinationPath $zipName -Force -ErrorAction Stop
} catch {
    Write-Host "Zip failed: $_" -ForegroundColor Red
    Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    exit 1
}

Remove-Item $tempDir -Recurse -Force

if (-not (Test-Path $zipName)) {
    Write-Host "Zip file was not created." -ForegroundColor Red
    exit 1
}

$fullPath = (Resolve-Path $zipName).Path
$sizeMB = [math]::Round((Get-Item $zipName).Length / 1MB, 2)

Write-Host ""
Write-Host "Done: $fullPath ($sizeMB MB)" -ForegroundColor Green
Write-Host "Upload this file to cPanel File Manager -> public_html -> Upload -> Extract here." -ForegroundColor Yellow

exit 0
