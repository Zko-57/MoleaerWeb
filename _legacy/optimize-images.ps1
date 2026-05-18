# Optimiza las imagenes pesadas del proyecto usando System.Drawing.
# - JPG q=78, ancho maximo 1600 px para hero/decorativas (sin alpha)
# - PNG re-comprimido manteniendo alpha cuando es necesario
# Salida: nuevos archivos en /images/ + reporte de ahorro.

Add-Type -AssemblyName System.Drawing

$root = $PSScriptRoot
$imagesDir = Join-Path $root 'images'
$report = @()

function Convert-ToJpeg {
    param(
        [string]$inputPath,
        [string]$outputPath,
        [int]$maxWidth = 1600,
        [int]$quality = 78
    )

    $img = [System.Drawing.Image]::FromFile($inputPath)
    try {
        $w = $img.Width
        $h = $img.Height
        if ($w -gt $maxWidth) {
            $h = [int]($h * $maxWidth / $w)
            $w = $maxWidth
        }

        $bmp = New-Object System.Drawing.Bitmap $w, $h
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        # Fondo negro para imagenes JPEG (sin alpha)
        $g.Clear([System.Drawing.Color]::Black)
        $g.DrawImage($img, 0, 0, $w, $h)
        $g.Dispose()

        $jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
                       Where-Object { $_.MimeType -eq 'image/jpeg' }
        $params = New-Object System.Drawing.Imaging.EncoderParameters 1
        $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter (
            [System.Drawing.Imaging.Encoder]::Quality, [long]$quality
        )
        $bmp.Save($outputPath, $jpegEncoder, $params)
        $bmp.Dispose()
    } finally {
        $img.Dispose()
    }
}

$targets = @(
    @{ name = 'frutiger_bubbles.png';   out = 'frutiger_bubbles.jpg';   max = 1400; q = 80 },
    @{ name = 'frutiger_tech.png';      out = 'frutiger_tech.jpg';      max = 1400; q = 82 },
    @{ name = 'lettuce_roots.png';      out = 'lettuce_roots.jpg';      max = 1600; q = 80 },
    @{ name = 'underwater_ambient.png'; out = 'underwater_ambient.jpg'; max = 1920; q = 72 },
    @{ name = 'water_hands.png';        out = 'water_hands.jpg';        max = 1400; q = 80 }
)

foreach ($t in $targets) {
    $inPath  = Join-Path $imagesDir $t.name
    $outPath = Join-Path $imagesDir $t.out
    if (-not (Test-Path $inPath)) {
        Write-Host "Skip (no existe): $($t.name)" -ForegroundColor Yellow
        continue
    }

    $sizeBefore = (Get-Item $inPath).Length
    Convert-ToJpeg -inputPath $inPath -outputPath $outPath -maxWidth $t.max -quality $t.q
    $sizeAfter = (Get-Item $outPath).Length

    $report += [PSCustomObject]@{
        Original = $t.name
        New      = $t.out
        BeforeKB = [math]::Round($sizeBefore / 1024, 1)
        AfterKB  = [math]::Round($sizeAfter  / 1024, 1)
        Saved    = "$([math]::Round(100 - ($sizeAfter / $sizeBefore * 100), 1))%"
    }
}

$report | Format-Table -AutoSize
$totalBefore = ($report | Measure-Object BeforeKB -Sum).Sum
$totalAfter  = ($report | Measure-Object AfterKB  -Sum).Sum
Write-Host ""
Write-Host ("Total antes: {0:N1} KB" -f $totalBefore)
Write-Host ("Total despues: {0:N1} KB" -f $totalAfter)
Write-Host ("Ahorro total: {0:N1} KB ({1:N1}%)" -f ($totalBefore - $totalAfter), (100 - $totalAfter / $totalBefore * 100))
