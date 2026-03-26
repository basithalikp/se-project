#!/bin/bash

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     Smart Water System - Dual Server Launcher              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "🔧 Starting Backend Server on Port 5000..."
echo "🎨 Starting Frontend Server on Port 3000..."
echo ""
echo "📊 Dashboard: http://localhost:3000"
echo "🔌 API: http://localhost:5000"
echo ""

# Start backend in background
cd backend && npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend in same terminal after backend
cd /home/katen/gits/se-project/frontend && npm start &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers starting..."
echo "🚀 Process IDs: Backend=$BACKEND_PID, Frontend=$FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
