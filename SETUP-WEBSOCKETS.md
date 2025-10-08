# 🚀 WebSocket Watch Party Setup

## 🎬 Quick Start (3 Minutes!)

### Step 1: Install Dependencies
```bash
cd "D:\video player"
npm install
```

### Step 2: Start the Server
```bash
npm start
```

You should see:
```
🎃========================================🎃
🎬  LX4T Video Player WebSocket Server  🎬
🎃========================================🎃

✅ Server running on http://localhost:3001
🔌 WebSocket ready for connections
```

### Step 3: Open the Player
Open `http://localhost:3001` in multiple browser windows/tabs to test!

---

## 🎯 How It Works

### **Real-Time Multiplayer:**
- ✅ Users across **different devices** can join
- ✅ Host controls everyone's video
- ✅ **Instant** sync (no lag!)
- ✅ Live chat with all viewers
- ✅ Emoji reactions broadcast to everyone
- ✅ Auto host transfer if host leaves

### **What Changed:**

#### Before (LocalStorage):
- ❌ Only works on same device
- ❌ Manual polling every 2 seconds
- ❌ No real-time updates

#### After (WebSockets):
- ✅ Works across ALL devices globally
- ✅ Instant real-time sync
- ✅ Server handles everything
- ✅ Auto-reconnect if connection drops

---

## 📁 New Files Created

1. **`server.js`** - WebSocket server
2. **`package.json`** - Dependencies
3. **`watch-party-websocket.js`** - Client-side WebSocket code (reference)

---

## 🔧 Configuration

### Change Server URL for Production:

In `script.js` (line ~311):
```javascript
const SOCKET_URL = 'http://localhost:3001'; 
// Change to your production URL:
// const SOCKET_URL = 'https://lx4t.com';
```

### Change Server Port:

In `server.js` (line 11):
```javascript
const PORT = process.env.PORT || 3001;
```

Or use environment variable:
```bash
PORT=5000 npm start
```

---

## 🌐 Deploy to Production

### Option 1: Deploy on Heroku (Free)
```bash
# Install Heroku CLI
heroku create lx4t-video-player
git push heroku main
```

### Option 2: Deploy on Railway (Free)
1. Go to https://railway.app
2. Connect your GitHub repo
3. Deploy automatically

### Option 3: Your Own Server
```bash
# On your server:
cd /var/www/lx4t
git clone your-repo
npm install
npm start

# Use PM2 to keep it running:
npm install -g pm2
pm2 start server.js --name lx4t-player
pm2 save
```

### Option 4: Integrate with xat Server
Add to your existing xat server:
```javascript
// In your xat server code:
const io = require('socket.io')(yourServer);
// ... copy socket event handlers from server.js
```

---

## 🧪 Testing Multiplayer

### Test 1: Same Computer
1. Start server: `npm start`
2. Open `http://localhost:3001` in Chrome
3. Open `http://localhost:3001` in Firefox
4. Create party in Chrome, join in Firefox
5. Play video in Chrome, watch it sync in Firefox!

### Test 2: Different Devices (Same Network)
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Open on phone: `http://YOUR_LOCAL_IP:3001`
3. Create/join party and test!

### Test 3: Different Networks (Production Only)
Deploy to Heroku/Railway, then share the URL!

---

## 🎮 Features That Work

### ✅ Working Now:
- [x] Create/join parties across devices
- [x] Real-time video sync (play/pause/seek)
- [x] Live chat with all viewers
- [x] User presence (see who's watching)
- [x] Emoji reactions
- [x] Host migration
- [x] Password protection
- [x] Auto-cleanup (24h)
- [x] Connection status indicator
- [x] Reconnection handling

### 🔜 Easy Additions:
- [ ] Voice chat (add WebRTC)
- [ ] Video quality sync
- [ ] Typing indicators
- [ ] "User is watching" presence
- [ ] Party invites via link
- [ ] Scheduled parties
- [ ] Party history

---

## 🐛 Troubleshooting

### Server won't start?
```bash
# Check if port is in use:
netstat -ano | findstr :3001

# Kill the process or use different port:
PORT=3002 npm start
```

### Can't connect from other device?
```bash
# Check firewall - allow port 3001
# Windows Firewall: Allow inbound TCP port 3001
```

### Socket.io not loading?
Make sure `socket.io.js` script tag is in HTML:
```html
<script src="/socket.io/socket.io.js"></script>
```

---

## 📊 Server Commands

```bash
# Start server
npm start

# Start with auto-reload (development)
npm run dev

# Start on different port
PORT=5000 npm start

# Run in background (Linux/Mac)
nohup npm start &

# Use PM2 (production)
pm2 start server.js
pm2 logs
pm2 stop server
```

---

## 💡 Pro Tips

1. **Test locally first** before deploying
2. **Use PM2** in production for auto-restart
3. **Set up SSL** for HTTPS in production
4. **Monitor server** with PM2 dashboard
5. **Scale horizontally** with Redis adapter if needed

---

## 🎬 Next Steps

### Want to add more features?
- **Voice Chat**: Add simple-peer or WebRTC
- **Screen Sharing**: Use navigator.mediaDevices
- **Video Reactions**: Timed emoji overlays
- **Voting**: "Skip intro" votes
- **Timestamps**: Share specific moments

### Want to integrate with xat?
- Connect to xat user accounts
- Use xat chat alongside video
- Show xat avatars for users
- xat powers/effects in player

**You now have a FULLY MULTIPLAYER video player!** 🎉🚀

Any questions? Just ask! 🎃

