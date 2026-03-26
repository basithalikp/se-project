Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Smart Water System - Dual Server Launcher (PowerShell)  ║" -ForegroundColor Cyan
Write-Host "║        Version 2.0 - Purple Grapefruit Theme             ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Set location to project root
Set-Location "d:\SmartWaterSystem"

Write-Host "🔧 Starting Backend Server on Port 5000..." -ForegroundColor Yellow
Write-Host "🎨 Starting Frontend Server on Port 3000..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📊 Dashboard: http://localhost:3000" -ForegroundColor Green
Write-Host "🔌 API: http://localhost:5000" -ForegroundColor Green
Write-Host ""
Write-Host "🍇 Theme: Juicy Purple Grapefruit" -ForegroundColor Magenta
Write-Host "💜 Decimals: Optimized (1-2 places)" -ForegroundColor Magenta
Write-Host "✨ Legend: Visible at bottom" -ForegroundColor Magenta
Write-Host ""

# Start backend
Write-Host "⏳ Launching backend..." -ForegroundColor Yellow
$backendProcess = Start-Process -FilePath "powershell" -ArgumentList "-NoExit -Command `"cd 'd:\SmartWaterSystem\backend'; npm start`"" -PassThru
$backendPID = $backendProcess.Id
Write-Host "✅ Backend process started (PID: $backendPID)" -ForegroundColor Green

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend
Write-Host "⏳ Launching frontend..." -ForegroundColor Yellow
$frontendProcess = Start-Process -FilePath "powershell" -ArgumentList "-NoExit -Command `"cd 'd:\SmartWaterSystem\frontend'; npm start`"" -PassThru
$frontendPID = $frontendProcess.Id
Write-Host "✅ Frontend process started (PID: $frontendPID)" -ForegroundColor Green

Write-Host ""
Write-Host "✅ Both servers starting..." -ForegroundColor Green
Write-Host "⏳ Waiting for servers to boot (this takes ~30 seconds)..." -ForegroundColor Yellow
Write-Host ""

Start-Sleep -Seconds 5
Write-Host "🚀 Servers should be running now!" -ForegroundColor Green
Write-Host "� Open browser and go to: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔐 Login with: bensen@farm.com / password123" -ForegroundColor Cyan
Write-Host ""
Write-Host "�📌 PROCESS IDs:" -ForegroundColor Yellow
Write-Host "   Backend:  $backendPID" -ForegroundColor White
Write-Host "   Frontend: $frontendPID" -ForegroundColor White
Write-Host ""
Write-Host "🛑 To stop servers:" -ForegroundColor Yellow
Write-Host "   - Press Ctrl+C in backend/frontend windows, OR" -ForegroundColor White
Write-Host "   - Close the backend/frontend windows, OR" -ForegroundColor White
Write-Host "   - Run: Stop-Process -Id $backendPID" -ForegroundColor White
Write-Host ""

# Wait for both processes
try {
    $backendProcess.WaitForExit()
} catch {
    Write-Host "Backend process ended" -ForegroundColor Gray
}

try {
    $frontendProcess.WaitForExit()
} catch {
    Write-Host "Frontend process ended" -ForegroundColor Gray
}
