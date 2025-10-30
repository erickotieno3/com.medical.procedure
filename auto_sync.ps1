while ($true) {
    cd "C:\Users\Administrator\myApp"
    git add .
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "UI Auto-sync: $timestamp" --allow-empty
    git push origin ui-dev
    Start-Sleep -Seconds 300
}
while ($true) {
    git add .
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "UI Auto-sync: $timestamp" --allow-empty
    git push origin ui-dev
    Start-Sleep -Seconds 300  # every 5 minutes
}
# Auto Git Sync Script for UI updates
while ($true) {
    try {
        Set-Location "C:\Users\Administrator\myApp"
        git add .
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        git commit -m "UI Auto-sync: $timestamp" --allow-empty
        git push origin ui-dev
        Write-Host "✅ Auto-sync completed at $timestamp"
    } catch {
        Write-Host "⚠️ Sync error: $($_.Exception.Message)"
    }
    Start-Sleep -Seconds 180   # Run every 3 minutes
}
