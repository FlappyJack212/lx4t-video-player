// Profile Page - LX4T Platform
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

async function loadProfile() {
    try {
        // Get user info
        const userRes = await fetch(`/api/auth/profile/${userId}`);
        const userData = await userRes.json();
        
        // Get user's videos
        const videosRes = await fetch(`/api/upload/videos?creator=${userId}`);
        const videosData = await videosRes.json();
        
        // Display profile
        document.getElementById('profileAvatar').textContent = userData.username[0].toUpperCase();
        document.getElementById('profileName').textContent = userData.username;
        document.getElementById('profileBio').textContent = userData.bio || 'No bio yet';
        document.getElementById('videoCount').textContent = videosData.videos.length;
        
        const totalViews = videosData.videos.reduce((sum, v) => sum + (v.views || 0), 0);
        document.getElementById('viewCount').textContent = totalViews;
        
        // Display videos
        if (videosData.videos.length > 0) {
            document.getElementById('userVideos').innerHTML = videosData.videos.map(v => `
                <div class="video-card" onclick="window.location.href='/watch.html?v=${v.id}'" style="cursor: pointer;">
                    <div class="video-thumbnail"><div class="video-thumbnail-placeholder">🎬</div></div>
                    <div class="video-info">
                        <h3 class="video-title">${v.title}</h3>
                        <div class="video-stats"><span>👁️ ${v.views || 0} views</span></div>
                    </div>
                </div>
            `).join('');
        } else {
            document.getElementById('userVideos').innerHTML = '<p style="color: rgba(255, 255, 255, 0.6);">No videos yet</p>';
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

loadProfile();

