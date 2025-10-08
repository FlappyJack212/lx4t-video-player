// Browse Page - LX4T Platform

// Check authentication
const token = localStorage.getItem('lx4t_token');
const user = JSON.parse(localStorage.getItem('lx4t_user') || '{}');

if (!token) {
    window.location.href = '/auth.html';
}

// User avatar
const userAvatar = document.getElementById('userAvatar');
if (user.username) {
    userAvatar.textContent = user.username[0].toUpperCase();
    userAvatar.addEventListener('click', () => {
        if (confirm('Logout?')) {
            localStorage.removeItem('lx4t_token');
            localStorage.removeItem('lx4t_user');
            window.location.href = '/auth.html';
        }
    });
}

// Load videos
async function loadVideos() {
    const container = document.getElementById('browseContainer');
    
    try {
        const response = await fetch('/api/upload/videos');
        const data = await response.json();
        
        if (data.videos && data.videos.length > 0) {
            renderVideos(data.videos);
        } else {
            renderEmptyState();
        }
    } catch (error) {
        console.error('Error loading videos:', error);
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <h3>Error Loading Videos</h3>
                <p>Please try again later</p>
            </div>
        `;
    }
}

function renderVideos(videos) {
    const container = document.getElementById('browseContainer');
    
    // Group videos by category
    const categories = {};
    videos.forEach(video => {
        const cat = video.category || 'Uncategorized';
        if (!categories[cat]) {
            categories[cat] = [];
        }
        categories[cat].push(video);
    });
    
    // Always show "All Videos" section
    let html = `
        <div class="video-row">
            <div class="row-header">
                <h2 class="row-title">All Videos</h2>
                <a href="#" class="row-more">${videos.length} videos</a>
            </div>
            <div class="video-grid">
                ${videos.slice(0, 12).map(video => createVideoCard(video)).join('')}
            </div>
        </div>
    `;
    
    // Add category sections
    Object.entries(categories).forEach(([category, categoryVideos]) => {
        if (categoryVideos.length > 0) {
            html += `
                <div class="video-row">
                    <div class="row-header">
                        <h2 class="row-title">${category}</h2>
                        <a href="#" class="row-more">${categoryVideos.length} videos</a>
                    </div>
                    <div class="video-grid">
                        ${categoryVideos.slice(0, 6).map(video => createVideoCard(video)).join('')}
                    </div>
                </div>
            `;
        }
    });
    
    container.innerHTML = html;
    
    // Add click listeners to video cards
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.dataset.videoId;
            const magnetUri = card.dataset.magnetUri;
            
            // Save to localStorage and redirect to player
            localStorage.setItem('currentVideo', JSON.stringify({
                id: videoId,
                magnetUri: magnetUri
            }));
            
            window.location.href = '/watch.html?v=' + videoId;
        });
    });
}

function createVideoCard(video) {
    const timeAgo = getTimeAgo(video.uploadedAt);
    const fileSize = formatFileSize(video.fileSize);
    
    return `
        <div class="video-card" data-video-id="${video.id}" data-magnet-uri="${video.magnetUri}">
            <div class="video-thumbnail">
                <div class="video-thumbnail-placeholder">🎬</div>
                ${video.duration ? `<div class="video-duration">${formatDuration(video.duration)}</div>` : ''}
            </div>
            <div class="video-info">
                <h3 class="video-title">${escapeHtml(video.title)}</h3>
                <div class="video-meta">
                    <div class="video-creator">
                        <div class="creator-avatar"></div>
                        <span>${escapeHtml(video.creatorName || 'Anonymous')}</span>
                    </div>
                </div>
                <div class="video-stats">
                    <span>👁️ ${video.views || 0} views</span>
                    <span>📅 ${timeAgo}</span>
                    <span>💾 ${fileSize}</span>
                </div>
            </div>
        </div>
    `;
}

function renderEmptyState() {
    const container = document.getElementById('browseContainer');
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">📹</div>
            <h3>No Videos Yet</h3>
            <p>Be the first to upload content to the platform!</p>
            <a href="/upload.html" class="hero-btn hero-btn-primary" style="display: inline-block; margin-top: 20px;">Upload Your First Video</a>
        </div>
    `;
}

// Helper functions
function formatFileSize(bytes) {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
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

// Load videos on page load
loadVideos();

