// Creator Dashboard - LX4T Platform
const token = localStorage.getItem('lx4t_token');
const user = JSON.parse(localStorage.getItem('lx4t_user') || '{}');

if (!token) window.location.href = '/auth.html';

document.getElementById('userName').textContent = user.username;

async function loadDashboard() {
    try {
        // Get user's videos
        const videosRes = await fetch(`/api/upload/videos?creator=${user.id}`);
        const videosData = await videosRes.json();
        
        const videos = videosData.videos || [];
        
        // Calculate stats
        const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);
        const totalVideos = videos.length;
        
        // Get subscriber count
        const userRes = await fetch(`/api/auth/profile/${user.id}`);
        const userData = await userRes.json();
        
        document.getElementById('totalViews').textContent = totalViews.toLocaleString();
        document.getElementById('totalVideos').textContent = totalVideos;
        document.getElementById('totalSubs').textContent = (userData.subscriberCount || 0).toLocaleString();
        
        // Load comments count (simplified - would need API)
        document.getElementById('totalComments').textContent = '0';
        
        // Display videos table
        if (videos.length > 0) {
            document.getElementById('videosTable').innerHTML = videos.map(v => `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 80px; height: 45px; background: #2a2a2a; border-radius: 4px; display: flex; align-items: center; justify-content: center;">🎬</div>
                            <strong>${v.title}</strong>
                        </div>
                    </td>
                    <td>👁️ ${v.views || 0}</td>
                    <td>💬 0</td>
                    <td>${getTimeAgo(v.uploadedAt)}</td>
                    <td>
                        <button onclick="window.location.href='/watch.html?v=${v.id}'" style="background: rgba(255,255,255,0.1); border: none; color: #fff; padding: 6px 12px; border-radius: 4px; cursor: pointer;">View</button>
                    </td>
                </tr>
            `).join('');
        } else {
            document.getElementById('videosTable').innerHTML = `
                <tr><td colspan="5" style="text-align: center; padding: 40px; color: rgba(255,255,255,0.6);">
                    No videos yet. <a href="/upload.html" style="color: #ff6600;">Upload your first video!</a>
                </td></tr>
            `;
        }
        
    } catch (error) {
        console.error('Dashboard error:', error);
    }
}

function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 2592000)}mo ago`;
}

loadDashboard();

