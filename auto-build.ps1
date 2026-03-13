cd C:\Users\Public\Documents\YourAppName
$allLogs = @()
$attempt = 0

while ($true) {
    $attempt++
    Write-Host "`n========== BUILD ATTEMPT $attempt ==========" -ForegroundColor Cyan
    
    # Trigger build and capture output
    $buildOutput = npx eas build -p android --profile production --no-wait 2>&1
    $buildOutput | Tee-Object "build-attempt-$attempt.txt"
    
    # Extract build ID
    $buildId = ($buildOutput | Select-String "builds/([a-f0-9-]{36})" | ForEach-Object { $_.Matches[0].Groups[1].Value } | Select-Object -Last 1)
    
    if (-not $buildId) {
        Write-Host "Could not extract build ID. Waiting 30s..." -ForegroundColor Yellow
        Start-Sleep -Seconds 30
        continue
    }
    
    Write-Host "Build ID: $buildId" -ForegroundColor Green
    Write-Host "Waiting for build to complete..."
    
    # Poll build status every 30 seconds
    $status = ""
    while ($status -ne "ERRORED" -and $status -ne "FINISHED") {
        Start-Sleep -Seconds 30
        $viewJson = (npx eas build:view $buildId --json 2>&1 | Where-Object { $_ -match '^\s*[\{\[]' -or $_ -match '^\s+"' }) -join ""
        try {
            $parsed = $viewJson | ConvertFrom-Json
            $status = $parsed.status
            Write-Host "Status: $status" -ForegroundColor Yellow
            
            # Immediately save logs while URLs are fresh
            $logDir = "logs\attempt-$attempt-$buildId"
            New-Item -ItemType Directory -Force -Path $logDir | Out-Null
            $li = 0
            foreach ($url in $parsed.logFiles) {
                try {
                    Invoke-WebRequest -Uri $url -OutFile "$logDir\log-$li.txt" -TimeoutSec 30
                    Write-Host "Saved log-$li.txt" -ForegroundColor Green
                } catch {
                    Write-Host "Log $li expired or failed" -ForegroundColor Red
                }
                $li++
            }
            
            if ($status -eq "ERRORED") {
                Write-Host "`n===== GRADLE ERROR DETAILS =====" -ForegroundColor Red
                Get-ChildItem "$logDir\*.txt" | ForEach-Object {
                    Get-Content $_ | Select-String "FAILURE|What went wrong|error:|Exception|BUILD FAILED|caused by" -CaseSensitive:$false
                } | Select-Object -Last 60 | Tee-Object "latest-error.txt"
                Write-Host "`nFull logs saved to: $logDir" -ForegroundColor Cyan
                Write-Host "Error summary saved to: latest-error.txt" -ForegroundColor Cyan
                break
            }
            
            if ($status -eq "FINISHED") {
                Write-Host "BUILD SUCCEEDED!" -ForegroundColor Green
                Write-Host "Download your AAB from: https://expo.dev/accounts/erickfotieno/projects/YourAppName/builds/$buildId"
                exit
            }
        } catch {
            Write-Host "Parsing error, retrying..." -ForegroundColor Yellow
        }
    }
    
    Write-Host "`nRetry in 10 seconds..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    break  # Remove this line to loop builds infinitely
}
