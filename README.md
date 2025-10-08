# 🎃 LX4T Video Player 🎬

**The Ultimate Video Player with Movie Nights, Seasonal Themes & 50+ Features!**

Built for **lx4t.com** - A private xat.com server

---

## 🚀 Quick Start

### Windows:
```bash
# Double-click start.bat
# OR run:
npm install
npm start
```

### Mac/Linux:
```bash
npm install
npm start
```

Then open: **http://localhost:3001**

---

## ✨ Features (55+)

### 🎬 Watch Parties / Movie Nights
- **Real-time multiplayer** - Watch with friends across devices
- **Host controls** - One person controls everyone's video
- **Live chat** - Talk during the movie
- **Emoji reactions** - React with 👍❤️😂😮🔥🎉
- **User avatars** - See who's watching
- **Password protection** - Private parties
- **Auto host transfer** - Seamless if host leaves

### 🎨 Smart Seasonal Themes (12 Themes!)
- **Auto-detects** date and changes theme automatically
- Halloween 🎃 (October)
- Christmas 🎄 (December)
- Valentine's ❤️ (February)
- Spring 🌸 (Mar-May)
- Summer ☀️ (Jun-Aug)
- Autumn 🍂 (September)
- Winter ❄️ (January)
- Easter 🐰, St. Patrick's 🍀, 4th of July 🇺🇸, New Year 🎉
- **Manual override** - Choose any theme anytime

### 📺 Video Player Features
- ✅ **Playlists** - Queue multiple videos
- ✅ **Quality selector** - 720p, 1080p, etc.
- ✅ **Chapters** - Navigate video sections
- ✅ **Subtitles** - .srt/.vtt support
- ✅ **Thumbnails** - Hover preview
- ✅ **Download** - Save videos
- ✅ **Upload** - Drag & drop your files
- ✅ **Mini player** - Sticky corner mode
- ✅ **Bookmarks** - Save favorite moments
- ✅ **Speed control** - 0.25x to 2x
- ✅ **Loop modes** - One, all, off
- ✅ **Keyboard shortcuts** - Full control
- ✅ **Picture-in-Picture**
- ✅ **Fullscreen**

### 💾 Smart Features
- ✅ **Save preferences** - Volume, speed, theme, etc.
- ✅ **Watch history** - Last 50 videos
- ✅ **Video analytics** - Track views
- ✅ **Comments system**
- ✅ **Loading states** - Beautiful spinners
- ✅ **Error handling** - Graceful failures
- ✅ **Mobile gestures** - Touch controls
- ✅ **PWA support** - Install as app

---

## 🎯 How to Use Watch Parties

### Host a Movie Night:
1. Click **"Create/Join Party"**
2. Enter party name: "Friday Movie Night"
3. Enter your name
4. Click **"🎬 Create Party"**
5. Share the **Party ID** with friends!

### Join a Party:
1. Get Party ID from host
2. Click **"Create/Join Party"**
3. Enter Party ID and your name
4. Click **"🚪 Join Party"**
5. Video syncs automatically!

---

## 📁 File Structure

```
video player/
├── index.html              # Main HTML
├── style.css               # All styles (2800+ lines!)
├── script.js               # All JavaScript (2800+ lines!)
├── server.js               # WebSocket server
├── package.json            # Dependencies
├── manifest.json           # PWA config
├── service-worker.js       # PWA service worker
├── start.bat               # Quick start (Windows)
├── README.md               # This file
├── SETUP-WEBSOCKETS.md     # WebSocket setup guide
└── watch-party-websocket.js # WebSocket code reference
```

---

## 🌐 Deploy to Production

### Heroku:
```bash
heroku create lx4t-player
git push heroku main
```

### Railway.app:
1. Connect GitHub repo
2. Click Deploy
3. Done!

### Your xat Server:
Add to your existing server:
```javascript
const io = require('socket.io')(yourServer);
// Copy socket handlers from server.js
```

---

## 🔧 Configuration

### Change Server URL:
In `script.js` (line 311):
```javascript
const SOCKET_URL = 'https://your-domain.com';
```

### Change Port:
```bash
PORT=5000 npm start
```

---

## 🎨 Customize Themes

In `script.js` (lines 160-257), edit the `themes` object:
```javascript
halloween: {
    name: 'Halloween',
    colors: { primary: '#ff6600', secondary: '#ff9500' },
    emojis: ['🎃', '👻', '🦇'],
    // ... customize!
}
```

---

## 📊 Tech Stack

- **Frontend**: Vanilla JavaScript (no frameworks!)
- **Backend**: Node.js + Express + Socket.io
- **Real-time**: WebSockets
- **Storage**: LocalStorage (client) + In-Memory (server)
- **PWA**: Service Workers + Manifest

---

## 🎮 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` / `K` | Play/Pause |
| `←` / `→` | Seek ±5s |
| `↑` / `↓` | Volume ±10% |
| `F` | Fullscreen |
| `M` | Mute |
| `P` | Previous video |
| `N` | Next video |
| `0-9` | Jump to 0%-90% |
| `?` | Show shortcuts |

---

## 🐛 Troubleshooting

### Server won't start?
```bash
npm install
npm start
```

### Can't connect to party?
- Check firewall allows port 3001
- Make sure server is running
- Check console for errors (F12)

### Video won't play?
- Check video URL is valid
- Try different browser
- Check browser console

---

## 📈 Stats

- **Lines of Code**: 5,600+
- **Features**: 55+
- **Themes**: 12
- **Animations**: 20+
- **File Size**: ~150KB total
- **Load Time**: <1 second
- **Browser Support**: All modern browsers

---

## 🎯 What Makes This Special?

### Compared to YouTube/Netflix:
| Feature | LX4T Player | YouTube | Netflix |
|---------|------------|---------|---------|
| Watch Parties | ✅ Built-in | ❌ Extensions only | ❌ Paid only |
| Seasonal Themes | ✅ 12 auto themes | ❌ None | ❌ None |
| File Upload | ✅ Yes | ❌ Account needed | ❌ No |
| Bookmarks | ✅ Yes | ❌ Limited | ❌ No |
| Download | ✅ Yes | ❌ Premium | ❌ Limited |
| Custom Themes | ✅ Full control | ❌ No | ❌ No |
| Open Source | ✅ Yes | ❌ No | ❌ No |

**This player beats commercial players in features!** 🏆

---

## 🚀 Future Ideas

Want to add:
- Voice chat during parties
- Screen sharing
- Video reactions (timed overlays)
- Voting system
- Scheduled movie nights
- Integration with xat accounts
- More themes
- AI-generated thumbnails

---

## 💖 Credits

Built for **lx4t.com** - A xat.com private server

Made with ❤️ and lots of ☕

---

## 📝 License

MIT License - Use it however you want!

---

## 🎬 Ready to Host Movie Nights?

```bash
npm start
```

**Open http://localhost:3001 and start watching!** 🎉🍿

---

**Questions? Want to add features? Just ask!** 🎃
