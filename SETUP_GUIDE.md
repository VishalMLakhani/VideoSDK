# VideoSDK Room Switcher - Setup Guide

## Quick Start (5 minutes)

### 1. Install Node.js

If you don't have Node.js installed:
- Visit https://nodejs.org/
- Download and install the LTS version (v18 or higher recommended)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. Get VideoSDK Token

1. Go to https://app.videosdk.live/
2. Sign up for a free account
3. Navigate to "API Keys" in the dashboard
4. Click "Generate New Token" or copy existing token
5. Save this token - you'll need it in step 4

### 3. Extract and Install

```bash
# Navigate to project directory
cd videosdk-room-switcher

# Install dependencies
npm install
```

Wait for installation to complete (usually 1-2 minutes).

### 4. Configure Token

Open `App.jsx` in your code editor and update line 7:

```javascript
// BEFORE
const VIDEOSDK_TOKEN = "YOUR_VIDEOSDK_TOKEN_HERE";

// AFTER
const VIDEOSDK_TOKEN = "your-actual-token-from-step-2";
```

Save the file.

### 5. Run the Application

```bash
npm start
```

The app will automatically open in your browser at http://localhost:3000

### 6. Test It Out

1. Click "Join Room A"
2. Click "Join Meeting"
3. Enable your camera and microphone
4. Open another browser tab/window to http://localhost:3000
5. Join Room A from the second tab to see yourself as a participant
6. Try switching rooms using both methods

## Detailed Setup

### Environment Variables (Optional but Recommended)

For better security, use environment variables:

1. Create `.env` file in project root:
   ```bash
   touch .env
   ```

2. Add your credentials:
   ```
   REACT_APP_VIDEOSDK_TOKEN=your_token_here
   REACT_APP_ROOM_A_ID=room-a-demo
   REACT_APP_ROOM_B_ID=room-b-demo
   ```

3. Update `App.jsx`:
   ```javascript
   const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN;
   const ROOM_A_ID = process.env.REACT_APP_ROOM_A_ID;
   const ROOM_B_ID = process.env.REACT_APP_ROOM_B_ID;
   ```

4. Restart the development server

### Custom Room IDs

You can use any room IDs you want:

```javascript
const ROOM_A_ID = "my-custom-room-1";
const ROOM_B_ID = "my-custom-room-2";
```

**Note**: Room IDs should be:
- Alphanumeric with hyphens
- Unique for different rooms
- Consistent across all participants joining the same room

### Testing with Multiple Participants

#### Option 1: Multiple Browser Tabs
```bash
# Open multiple tabs, each with:
http://localhost:3000
```

#### Option 2: Multiple Browsers
```bash
# Test in Chrome, Firefox, Safari simultaneously
```

#### Option 3: Multiple Devices
```bash
# On your development machine, note your local IP:
# - Windows: ipconfig
# - Mac/Linux: ifconfig or ip addr

# Access from other devices on same network:
http://YOUR_LOCAL_IP:3000
# Example: http://192.168.1.100:3000
```

### Production Deployment

When deploying to production:

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy the build folder** to your hosting service:
   - Netlify: Drag and drop `build` folder
   - Vercel: Connect GitHub repo
   - AWS S3: Upload `build` contents
   - Any static hosting service

3. **Set environment variables** in your hosting platform:
   ```
   REACT_APP_VIDEOSDK_TOKEN=your_production_token
   ```

4. **Secure your token:**
   - Never commit tokens to version control
   - Use environment variables
   - Rotate tokens periodically
   - Consider server-side token generation for production

### Network Requirements

Ensure the following ports are accessible:

- **3000**: Development server (local only)
- **443**: HTTPS for VideoSDK API
- **3478**: STUN server (UDP/TCP)
- **49152-65535**: WebRTC media (UDP)

### Firewall Configuration

If behind a corporate firewall, you may need to:

1. Allow outbound connections to:
   - `*.videosdk.live`
   - STUN/TURN servers

2. Enable WebRTC protocols:
   - UDP ports for media
   - TCP fallback if UDP is blocked

### Browser Permissions

The app requires browser permissions for:
- Camera (video calling)
- Microphone (audio calling)

**Grant permissions when prompted** or configure manually:
- Chrome: Settings → Privacy and Security → Site Settings
- Firefox: Preferences → Privacy & Security → Permissions
- Safari: Preferences → Websites → Camera/Microphone

## Troubleshooting Setup

### "Command not found: npm"

**Problem**: Node.js not installed or not in PATH

**Solution**:
1. Install Node.js from https://nodejs.org/
2. Restart terminal
3. Verify: `node --version`

### "Cannot find module '@videosdk.live/react-sdk'"

**Problem**: Dependencies not installed

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Token authentication failed"

**Problem**: Invalid or expired VideoSDK token

**Solution**:
1. Generate new token from VideoSDK dashboard
2. Update `App.jsx` with new token
3. Restart development server

### "Port 3000 is already in use"

**Problem**: Another application using port 3000

**Solution**:
```bash
# Option 1: Use different port
PORT=3001 npm start

# Option 2: Kill process using port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "WebRTC not supported"

**Problem**: Browser doesn't support WebRTC or using HTTP instead of HTTPS

**Solution**:
- Use modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- For production, always use HTTPS
- For local development, localhost is exempt from HTTPS requirement

### Camera/Microphone Not Working

**Problem**: Permissions denied or device in use

**Solution**:
1. Check browser permissions
2. Ensure no other app is using camera/mic
3. Try refreshing the page
4. Check browser console for errors
5. Test in different browser

## Development Tips

### Hot Reload

The development server supports hot reload:
- Save any file → changes appear automatically
- No need to manually refresh browser

### Console Logging

Add debug logging to track behavior:

```javascript
// In App.jsx
console.log('Current Room:', currentRoom);
console.log('Relay Mode:', relayMode);

// In MeetingView
console.log('Meeting ID:', meetingId);
console.log('Participants:', participants.size);
```

### React Developer Tools

Install React DevTools browser extension:
- Chrome: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/react-devtools/

### Network Debugging

Monitor network activity:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Filter by "WS" to see WebSocket connections
4. Check for failed requests

## Performance Optimization

### Reduce Bundle Size

```bash
# Analyze bundle
npm install -g source-map-explorer
npm run build
source-map-explorer 'build/static/js/*.js'
```

### Enable Production Mode

```javascript
// Ensure production build for deployment
npm run build

// Verify production mode
console.log(process.env.NODE_ENV); // should be 'production'
```

### Optimize Media Quality

Adjust media constraints in `MeetingProvider` config:

```javascript
config={{
  meetingId: getMeetingId(),
  micEnabled: false,
  webcamEnabled: false,
  name: "Participant",
  // Add custom constraints
  multiStream: false,
  customVideoTrack: {
    width: 640,
    height: 480,
    frameRate: 30
  }
}}
```

## Next Steps

After successful setup:

1. **Read the README.md** for detailed implementation info
2. **Explore the code** - it's well-commented
3. **Test both switching methods** to understand differences
4. **Try with multiple participants** for real-world testing
5. **Customize the UI** to match your needs
6. **Review Media Relay section** to understand limitations

## Getting Help

- **VideoSDK Docs**: https://docs.videosdk.live/
- **VideoSDK Discord**: https://discord.gg/videosdk
- **GitHub Issues**: Create issue in repository
- **Stack Overflow**: Tag questions with `videosdk`

---

**Setup Complete!** 🎉

You're now ready to explore room switching functionality.
