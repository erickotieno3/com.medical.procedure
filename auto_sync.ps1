while ($true) {
    cd "C:\Users\Administrator\myApp"
    git add .
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "UI Auto-sync: $timestamp" --allow-empty
    git push origin ui-dev
    Start-Sleep -Seconds 300
}
