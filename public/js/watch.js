// Watch Page JavaScript - LX4T Platform

// Get video ID from URL
const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('v');
const magnetUri = urlParams.get('magnet');

// Check auth
const token = localStorage.getItem('lx4t_token');
if (!token) {
    window.location.href = '/auth.html';
}

// WebTorrent client
const client = new WebTorrent();
let currentTorrent = null;

// Load video data
async function loadVideo() {
    if (!videoId && !magnetUri) {
        document.getElementById('videoInfo').innerHTML = `
            <div class="loading-state">
                <h3>⚠️ No Video Specified</h3>
                <p><a href="/browse-new.html" style="color: #ff6600;">← Back to Browse</a></p>
            </div>
        `;
        return;
    }
    
    try {
        let video;
        let magnet;
        
        // Get video info from database
        if (videoId) {
            const response = await fetch(`/api/upload/videos/${videoId}`);
            const data = await response.json();
            video = data.video;
            magnet = video.magnetUri;
        } else {
            magnet = magnetUri;
            video = {
                title: 'Streaming Video',
                description: 'Loading from magnet link...',
                creatorName: 'Unknown',
                views: 0,
                uploadedAt: Date.now()
            };
        }
        
        // Display video info
        displayVideoInfo(video);
        
        // Load video via WebTorrent
        if (magnet) {
            loadTorrent(magnet);
        }
        
        // Load related videos
        loadRelatedVideos();
        
    } catch (error) {
        console.error('Error loading video:', error);
        document.getElementById('videoInfo').innerHTML = `
            <div class="loading-state">
                <h3>⚠️ Error Loading Video</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function displayVideoInfo(video) {
    const creatorInitial = (video.creatorName || 'U')[0].toUpperCase();
    const timeAgo = getTimeAgo(video.uploadedAt);
    
    document.getElementById('videoInfo').innerHTML = `
        <h1 class="video-title">${escapeHtml(video.title)}</h1>
        
        <div class="video-meta">
            <div class="video-stats">
                <span>👁️ ${video.views || 0} views</span>
                <span>📅 ${timeAgo}</span>
                <span>💾 ${formatFileSize(video.fileSize || 0)}</span>
            </div>
        </div>
        
        <div class="creator-section">
            <div class="creator-info">
                <div class="creator-avatar">${creatorInitial}</div>
                <div class="creator-details">
                    <h3>${escapeHtml(video.creatorName || 'Anonymous')}</h3>
                    <p>Creator</p>
                </div>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="subscribe-btn" onclick="tipCreator()">💰 Tip Creator</button>
                <button class="subscribe-btn" style="background: rgba(255,255,255,0.1);">⭐ Subscribe</button>
            </div>
        </div>
        
        <div class="description-section">
            <div class="description-header">
                <span>📝 Description</span>
            </div>
            <div class="description-text">${escapeHtml(video.description || 'No description provided.')}</div>
        </div>
        
        <div style="background: rgba(255, 165, 0, 0.1); border: 1px solid rgba(255, 165, 0, 0.3); border-radius: 8px; padding: 15px; margin-top: 20px;">
            <h4 style="margin: 0 0 10px 0; color: #ffa500;">💸 Support This Platform</h4>
            <p style="margin: 0 0 15px 0; color: rgba(255,255,255,0.8); font-size: 0.875rem;">Help us keep LX4T running and ad-free!</p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="https://venmo.com/YourUsername" target="_blank" class="subscribe-btn" style="text-decoration: none; display: inline-block;">
                    Venmo @YourUsername
                </a>
                <a href="https://paypal.me/YourUsername" target="_blank" class="subscribe-btn" style="background: #0070ba; text-decoration: none; display: inline-block;">
                    PayPal
                </a>
                <a href="https://cash.app/$YourUsername" target="_blank" class="subscribe-btn" style="background: #00d632; text-decoration: none; display: inline-block;">
                    Cash App
                </a>
            </div>
        </div>
    `;
}

// Tip creator function
function tipCreator() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: #1a1a1a; border-radius: 12px; padding: 30px; max-width: 400px; width: 100%;">
            <h2 style="margin: 0 0 20px 0; color: #fff;">💰 Tip the Creator</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 0 0 20px 0;">Choose your preferred payment method:</p>
            
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <a href="https://venmo.com/CreatorUsername" target="_blank" class="subscribe-btn" style="text-decoration: none; text-align: center;">
                    💙 Venmo
                </a>
                <a href="https://paypal.me/CreatorUsername" target="_blank" class="subscribe-btn" style="background: #0070ba; text-decoration: none; text-align: center;">
                    💳 PayPal
                </a>
                <a href="https://cash.app/$CreatorUsername" target="_blank" class="subscribe-btn" style="background: #00d632; text-decoration: none; text-align: center;">
                    💵 Cash App
                </a>
            </div>
            
            <button onclick="this.parentElement.parentElement.remove()" class="subscribe-btn" style="background: rgba(255,255,255,0.1); width: 100%; margin-top: 20px;">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Load torrent
function loadTorrent(magnetUri) {
    const torrentStatus = document.getElementById('torrentStatus');
    torrentStatus.style.display = 'block';
    
    client.add(magnetUri, (torrent) => {
        currentTorrent = torrent;
        
        // Find video file
        const videoFile = torrent.files.find(file => {
            const ext = file.name.split('.').pop().toLowerCase();
            return ['mp4', 'webm', 'mkv', 'avi', 'mov', 'm4v', 'ogv'].includes(ext);
        }) || torrent.files[0];
        
        // Render to video element
        const video = document.getElementById('videoPlayer');
        videoFile.renderTo(video, {
            autoplay: true,
            controls: true
        });
        
        // Update stats
        setInterval(() => {
            if (!currentTorrent) return;
            
            document.getElementById('downloadSpeed').textContent = formatBytes(torrent.downloadSpeed) + '/s';
            document.getElementById('numPeers').textContent = torrent.numPeers;
            document.getElementById('progress').textContent = (torrent.progress * 100).toFixed(1) + '%';
        }, 1000);
    });
}

// Load related videos
async function loadRelatedVideos() {
    try {
        const response = await fetch('/api/upload/videos?limit=10');
        const data = await response.json();
        
        const html = data.videos.map(video => `
            <div class="related-video" onclick="window.location.href='/watch.html?v=${video.id}'">
                <div class="related-thumbnail">🎬</div>
                <div class="related-info">
                    <h4 class="related-title">${escapeHtml(video.title)}</h4>
                    <p class="related-creator">${escapeHtml(video.creatorName || 'Anonymous')}</p>
                    <p class="related-stats">${video.views || 0} views • ${getTimeAgo(video.uploadedAt)}</p>
                </div>
            </div>
        `).join('');
        
        document.getElementById('relatedVideos').innerHTML = html || '<p style="color: rgba(255,255,255,0.6); text-align: center;">No related videos</p>';
    } catch (error) {
        console.error('Error loading related videos:', error);
    }
}

// Helper functions
function formatBytes(bytes) {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatFileSize(bytes) {
    return formatBytes(bytes);
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
    return `${Math.floor(seconds / 31536000)}y ago`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load video on page load
loadVideo();

