# 🤖 AI Integration Guide - LX4T Platform

## Setup Claude API

### Step 1: Get API Key
1. Go to: https://console.anthropic.com
2. Create account
3. Get your API key
4. Add to `.env` file:
```
ANTHROPIC_API_KEY=your-key-here
```

### Step 2: Install Package
```bash
npm install @anthropic-ai/sdk
```

### Step 3: Add AI Routes
File already created: `server/ai.js`

---

## 🎯 AI Features Implemented:

### 1. Smart Recommendations
- Analyzes watch history
- Suggests similar videos
- Personalized "For You" feed

### 2. Intelligent Search
- Natural language queries
- "Show me funny gaming videos"
- Context-aware results

### 3. Auto-Categorization
- Analyzes video content
- Suggests tags
- Auto-generates descriptions

### 4. Content Moderation
- Scans comments for violations
- Auto-flags inappropriate content
- Provides mod suggestions

### 5. Creator Assistant
- Generates video titles
- Writes descriptions
- Suggests thumbnails
- Optimizes SEO

---

## 💡 Usage:

### For Recommendations:
```javascript
POST /api/ai/recommend
Body: { userId: "uuid" }
Returns: Array of recommended videos
```

### For Search:
```javascript
POST /api/ai/search
Body: { query: "funny cat videos" }
Returns: Ranked search results
```

### For Creator Help:
```javascript
POST /api/ai/assistant
Body: { 
  action: "generate-title",
  context: "video about gaming"
}
Returns: AI-generated title
```

---

## 🔧 Implementation Status:

✅ API Routes Created
✅ Frontend Integration Ready
⏳ Requires API Key to activate
⏳ Test endpoints before production

---

**Add your API key and all AI features will work!**

