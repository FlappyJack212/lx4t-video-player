# 🚀 GitHub & Heroku Deployment Guide

## ✅ STEP 1: CREATE GITHUB REPOSITORY

### Option A: Via Website (Easiest)
1. Go to https://github.com/new
2. **Repository name**: `lx4t-video-player`
3. **Description**: `Ultimate video player with watch parties, 60+ features, and seasonal themes`
4. **Public** or **Private** (your choice)
5. **DO NOT** check "Add README" (we already have one)
6. Click **"Create repository"**

### Option B: Via GitHub CLI
```bash
# Install GitHub CLI: https://cli.github.com/
gh repo create lx4t-video-player --public --source=. --remote=origin
```

---

## ✅ STEP 2: PUSH TO GITHUB

### Get Your Repository URL
After creating, GitHub shows you a URL like:
```
https://github.com/YOUR_USERNAME/lx4t-video-player.git
```

### Push Your Code
```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/lx4t-video-player.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### If you get errors:
```bash
# If remote already exists:
git remote set-url origin https://github.com/YOUR_USERNAME/lx4t-video-player.git

# If branch is called 'master' not 'main':
git push -u origin master
```

---

## ✅ STEP 3: VERIFY ON GITHUB

1. Go to `https://github.com/YOUR_USERNAME/lx4t-video-player`
2. You should see all your files!
3. Click on `README.md` to see if it displays nicely

---

## 🟣 STEP 4: DEPLOY TO HEROKU

### Install Heroku CLI

#### Windows:
Download: https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli

#### Mac:
```bash
brew tap heroku/brew && brew install heroku
```

### Login to Heroku
```bash
heroku login
```
(Opens browser - login with your Heroku account)

### Create Heroku App
```bash
# Option 1: Random name
heroku create

# Option 2: Custom name (must be unique globally)
heroku create lx4t-player
# OR
heroku create lx4t-video
# OR  
heroku create movienight-lx4t
```

If name is taken, try:
- `lx4t-player-2024`
- `lx4t-video-app`
- `watch-party-lx4t`

### Deploy to Heroku
```bash
git push heroku main
```

Or if your branch is master:
```bash
git push heroku master
```

### Open Your Live App!
```bash
heroku open
```

---

## ⚙️ STEP 5: UPDATE SOCKET URL

**CRITICAL**: After deploying, you MUST update the WebSocket URL!

### Get Your Heroku URL
```bash
heroku apps:info
```

Look for: `Web URL: https://your-app-name.herokuapp.com`

### Update script.js
Open `script.js` and find line ~311:
```javascript
// Change this:
const SOCKET_URL = 'http://localhost:3001';

// To your Heroku URL:
const SOCKET_URL = 'https://your-app-name.herokuapp.com';
```

### Push the Update
```bash
git add script.js
git commit -m "Update Socket URL for production"
git push heroku main
git push origin main
```

---

## ✅ STEP 6: TEST IT!

1. Open your Heroku URL in browser
2. Click "Create/Join Party"
3. Create a party
4. **Open same URL on your phone** (or different browser)
5. Join the party with Party ID
6. Play video in one - watch it sync in the other!
7. Send chat messages
8. React with emojis
9. **IT WORKS WORLDWIDE!** 🌍🎉

---

## 🔍 VIEW LOGS (If Issues)

```bash
# Real-time logs:
heroku logs --tail

# Last 100 lines:
heroku logs -n 100

# Filter for errors:
heroku logs --tail | findstr ERROR
```

---

## 🎯 OPTIONAL: CUSTOM DOMAIN

If you have a domain (like lx4t.com):

```bash
# Add domain to Heroku
heroku domains:add player.lx4t.com

# Heroku gives you a DNS target
# Add CNAME record in your DNS:
# player.lx4t.com → your-app-name.herokuapp.com
```

---

## 📊 HEROKU COMMANDS

```bash
# Check app status
heroku ps

# Restart app
heroku restart

# Open app
heroku open

# View config
heroku config

# Set environment variable
heroku config:set NODE_ENV=production

# Scale dynos
heroku ps:scale web=1

# Check dyno hours (free tier)
heroku ps -a your-app-name
```

---

## 💰 HEROKU FREE TIER

### What You Get Free:
- ✅ 550-1000 dyno hours/month
- ✅ Sleep after 30 min inactivity
- ✅ Perfect for testing
- ✅ Custom domain support
- ✅ SSL certificate (HTTPS)

### Limitations:
- App sleeps after 30min inactive
- Wakes up in ~10 seconds
- Good for 100-1000 users/day

### Upgrade if Needed:
```bash
# $7/month for always-on:
heroku ps:type hobby
```

---

## 🎊 YOU'RE LIVE!

Your video player is now:
- ✅ On GitHub (source code)
- ✅ On Heroku (live app)
- ✅ Accessible worldwide
- ✅ Real multiplayer WebSockets
- ✅ Production ready!

---

## 📱 SHARE YOUR APP

Share this link:
```
https://your-app-name.herokuapp.com
```

Or use a short link:
```bash
# bitly, tinyurl, etc.
https://bit.ly/lx4t-player
```

---

## 🐛 Common Issues

### "Deployed but app crashes"
```bash
# Check logs:
heroku logs --tail

# Usually means:
# 1. Missing dependencies: npm install locally first
# 2. Port issue: Make sure server uses process.env.PORT
# 3. Missing Procfile: We have it!
```

### "Can't connect to WebSocket"
```bash
# Make sure you updated SOCKET_URL in script.js!
# Check browser console (F12) for connection errors
```

### "Application error H10"
```bash
# Server crash - check logs:
heroku logs --tail

# Usually missing dependencies:
git add package.json
git commit -m "Update dependencies"
git push heroku main
```

---

## 🎬 YOU DID IT!

You now have a **FULLY DEPLOYED** multiplayer video player!

Test it, share it, enjoy it! 🎉🍿

Want to add more features? Just ask! 🚀

