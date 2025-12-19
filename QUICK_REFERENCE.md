# Quick Reference Card

## 🚀 5-Minute Setup

```bash
# 1. Install
npm install

# 2. Configure (edit App.jsx line 7)
const VIDEOSDK_TOKEN = "your-token-from-videosdk.live";

# 3. Run
npm start
```

## 🎯 Key Features

| Feature | Button/Action | Result |
|---------|--------------|---------|
| Join Room | Click "Join Room A/B" | Enter room selection |
| Start Meeting | Click "Join Meeting" | Connect to video call |
| Toggle Mic | Click 🎤 button | Mute/unmute audio |
| Toggle Camera | Click 📹 button | Start/stop video |
| Normal Switch | Click "Switch to Room X" | Disconnect and reconnect |
| Relay Switch | Click "Relay to Room X" | Simulate seamless transition |
| Leave | Click 📞 Leave button | Exit meeting |

## 📁 File Structure

```
videosdk-room-switcher/
├── App.jsx              # Main application logic
├── App.css              # All styles
├── index.js             # React entry point
├── package.json         # Dependencies
├── README.md            # Full documentation (20KB)
├── SETUP_GUIDE.md       # Setup instructions (8KB)
├── PROJECT_SUMMARY.md   # Project overview (12KB)
└── public/
    └── index.html       # HTML template
```

## 🔧 Quick Customization

### Change Colors (App.css)
```css
:root {
  --primary: #00d9ff;     /* Main accent color */
  --secondary: #ff006e;   /* Secondary color */
  --bg-dark: #0a0e27;     /* Background */
}
```

### Change Room Names (App.jsx)
```javascript
const ROOM_A_ID = "my-room-1";
const ROOM_B_ID = "my-room-2";
```

### Modify Participant Name (App.jsx)
```javascript
name: "John Doe"  // Instead of random ID
```

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Token error | Get new token from videosdk.live |
| Port 3000 in use | Run: `PORT=3001 npm start` |
| No video/audio | Check browser permissions |
| Participants not showing | Open multiple browser tabs |
| Dependencies error | Run: `rm -rf node_modules && npm install` |

## 📚 Documentation Map

- **Quick Start**: Read this file
- **Detailed Setup**: See SETUP_GUIDE.md
- **Implementation Details**: See README.md
- **Project Overview**: See PROJECT_SUMMARY.md

## 🎨 UI Controls

### Meeting Header
- **Room Badge**: Shows current room (A or B)
- **Meeting ID**: Displays VideoSDK meeting identifier
- **Relay Indicator**: Appears when relay mode is active

### Media Controls
- **🎤 Microphone**: Toggle audio on/off
- **📹 Camera**: Toggle video on/off
- **📞 Leave**: Exit the meeting

### Switch Controls
- **Normal Switch**: Standard room change (1-2 sec interruption)
- **Relay Switch**: Simulated seamless transition

## 🔍 Testing Scenarios

### Single User Testing
```bash
1. npm start
2. Open http://localhost:3000
3. Join Room A → Test controls
4. Switch to Room B → Verify transition
```

### Multi-User Testing
```bash
1. Open 2+ browser tabs
2. All join same room
3. Test switching from one tab
4. Observe from other tabs
```

### Network Testing
```bash
# Get your local IP
# Mac/Linux: ifconfig | grep "inet "
# Windows: ipconfig

# Access from phone/tablet on same network
http://YOUR_IP:3000
```

## 🎯 Key Code Locations

| Feature | File | Line/Section |
|---------|------|-------------|
| Token config | App.jsx | Line 7-9 |
| Room IDs | App.jsx | Line 8-9 |
| Normal switch logic | App.jsx | Line 89-98 |
| Relay switch logic | App.jsx | Line 101-109 |
| Participant view | App.jsx | Line 11-48 |
| Meeting controls | App.jsx | Line 140-167 |
| Styling | App.css | All |

## 🔐 Security Checklist

- [ ] Token not committed to git
- [ ] Using .env for production
- [ ] HTTPS enabled in production
- [ ] Tokens rotated regularly
- [ ] Browser permissions granted

## 📊 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |

## 🎓 Learning Path

1. **Start Here**: Run the app, join a room
2. **Basic Testing**: Try all controls
3. **Read Code**: Review App.jsx comments
4. **Try Switching**: Test both methods
5. **Multi-User**: Open multiple tabs
6. **Read Docs**: Deep dive into README.md
7. **Customize**: Change colors, add features

## ⚡ Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Clean install
rm -rf node_modules package-lock.json && npm install

# Use different port
PORT=3001 npm start

# Check for updates
npm outdated
```

## 🎯 Production Deployment

```bash
# 1. Build
npm run build

# 2. The 'build' folder contains static files
# 3. Deploy to: Netlify, Vercel, AWS S3, etc.
# 4. Set environment variables in hosting platform
```

## 📞 Quick Links

- **VideoSDK Dashboard**: https://app.videosdk.live/
- **VideoSDK Docs**: https://docs.videosdk.live/
- **Get Token**: https://app.videosdk.live/api-keys
- **Discord Support**: https://discord.gg/videosdk

## 💡 Pro Tips

1. **Multiple Browsers**: Test in Chrome + Firefox simultaneously
2. **Incognito Mode**: Useful for multi-user testing
3. **Console Logs**: Press F12 to see detailed logs
4. **Network Tab**: Monitor WebRTC connections
5. **React DevTools**: Install for component inspection

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Video call connects without errors
- ✅ You can see/hear yourself
- ✅ Multiple participants appear in grid
- ✅ Switching changes the room badge
- ✅ Controls respond immediately
- ✅ No console errors

---

**Need Help?** Check README.md or SETUP_GUIDE.md for detailed information.
