# 🚀 Quick Start Guide

Get up and running in 2 minutes!

## Step 1: Install Dependencies (30 seconds)

Open TWO terminal windows:

### Terminal 1 - Backend
```bash
cd backend
npm install
```

### Terminal 2 - Frontend  
```bash
cd frontend
npm install
```

## Step 2: Start Servers (10 seconds)

### Terminal 1 - Backend
```bash
cd backend
npm start
```

Wait for:
```
✅ Server running on port 5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

App opens at: `http://localhost:3000`

## Step 3: Test It! (30 seconds)

1. ✅ Check "Backend: connected" at top
2. ✅ Click "Join Room A"
3. ✅ Click "Join Meeting"
4. ✅ Enable camera/microphone
5. ✅ Try "Switch to Room B"

## 🎉 That's It!

You're now running a full-stack video conferencing app!

## 📝 What's Running?

- **Backend**: `http://localhost:5000` - API server
- **Frontend**: `http://localhost:3000` - React app

## 🧪 Test with Multiple Users

1. Open new browser tab
2. Go to `http://localhost:3000`
3. Join same room
4. See yourself in both tabs!

## ❓ Something Wrong?

### Backend not starting?
```bash
# Port 5000 in use? Try different port:
cd backend
PORT=5001 npm start
```

### Frontend shows "disconnected"?
1. Make sure backend is running first
2. Check `http://localhost:5000/api/health`
3. Look at backend terminal for errors

### Need clean install?
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next: Read Full Documentation

See `README.md` for:
- Complete API documentation
- Architecture details
- Production deployment
- Advanced features

---

**Time to first video call: < 2 minutes!** ⚡
