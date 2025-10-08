# 🚀 Deployment Guide

## 📦 GitHub Setup

### Step 1: Create GitHub Repository
```bash
# Go to github.com and create a new repository
# Name it: lx4t-video-player
# Don't initialize with README (we have one)
```

### Step 2: Push to GitHub
```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "🎉 LX4T Video Player - 60+ features with Watch Parties"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/lx4t-video-player.git

# Push to GitHub
git push -u origin main
```

---

## 🟣 Heroku Deployment

### Step 1: Install Heroku CLI
Download from: https://devcenter.heroku.com/articles/heroku-cli

Or use npm:
```bash
npm install -g heroku
```

### Step 2: Login to Heroku
```bash
heroku login
```
This will open your browser to login.

### Step 3: Create Heroku App
```bash
# Create app (Heroku will generate a URL)
heroku create

# OR create with custom name:
heroku create lx4t-player
# Your URL will be: https://lx4t-player.herokuapp.com
```

### Step 4: Deploy to Heroku
```bash
git push heroku main
```

### Step 5: Open Your App
```bash
heroku open
```

---

## ⚙️ Update Socket URL

After deploying, you MUST update the Socket URL in your code:

**In `script.js` (line ~311):**
```javascript
// Change this:
const SOCKET_URL = 'http://localhost:3001';

// To your Heroku URL:
const SOCKET_URL = 'https://your-app-name.herokuapp.com';
```

Then commit and push again:
```bash
git add script.js
git commit -m "Update Socket URL for production"
git push heroku main
```

---

## 🔍 View Logs (if issues)
```bash
heroku logs --tail
```

---

## 🎯 Alternative: Railway Deployment

Even easier than Heroku!

1. Go to https://railway.app
2. Click "Start a New Project"
3. Click "Deploy from GitHub repo"
4. Select your repo
5. Done! Railway auto-detects and deploys

Railway gives you a URL like: `https://lx4t-player.up.railway.app`

---

## ✅ After Deployment Checklist

- [ ] App is live at Heroku/Railway URL
- [ ] Updated SOCKET_URL in script.js
- [ ] Pushed updated code
- [ ] Tested creating a party
- [ ] Tested joining from different device
- [ ] Chat works
- [ ] Video syncs

---

## 🎬 Share Your App!

Your friends can now access:
```
https://your-app-name.herokuapp.com
```

Or whatever URL Railway gives you!

---

## 💡 Pro Tips

### Custom Domain:
```bash
heroku domains:add www.lx4t.com
# Then update your DNS records
```

### Environment Variables:
```bash
heroku config:set NODE_ENV=production
heroku config:set MAX_PARTY_AGE=86400000
```

### Scale Up (if needed):
```bash
# Heroku free tier is fine for testing
# Upgrade when you get lots of users:
heroku ps:scale web=2
```

---

## 🐛 Troubleshooting

### App crashes on Heroku?
```bash
# Check logs:
heroku logs --tail

# Common issues:
# 1. Missing dependencies: npm install
# 2. Wrong start command: check Procfile
# 3. Port issue: server.js uses process.env.PORT (correct!)
```

### Can't connect to Socket?
```bash
# Make sure SOCKET_URL matches your Heroku URL
# Check browser console (F12) for errors
```

---

## 🎊 You're Live!

Your video player is now accessible worldwide! 🌍

Share the link and start hosting movie nights! 🎬🍿

