// Go Live - LX4T Platform  
const token = localStorage.getItem('lx4t_token');
const user = JSON.parse(localStorage.getItem('lx4t_user') || '{}');

if (!token) window.location.href = '/auth.html';

const socket = io();
let localStream;
let isLive = false;
let streamId = null;

// Go Live button
document.getElementById('goLiveBtn').addEventListener('click', async () => {
    const title = document.getElementById('streamTitle').value.trim();
    if (!title) {
        alert('Please enter a stream title');
        return;
    }
    
    try {
        // Get camera/screen
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        document.getElementById('streamPreview').srcObject = localStream;
        
        // Create stream ID
        streamId = 'stream-' + Date.now();
        
        // Notify server
        socket.emit('start-stream', {
            streamId,
            userId: user.id,
            username: user.username,
            title
        });
        
        isLive = true;
        document.getElementById('goLiveBtn').style.display = 'none';
        document.getElementById('endStreamBtn').style.display = 'block';
        document.getElementById('liveIndicator').style.display = 'flex';
        
        alert('🔴 You are now LIVE! Share this link: /live.html?stream=' + streamId);
        
    } catch (error) {
        console.error('Go live error:', error);
        alert('Failed to start stream. Make sure you granted camera/mic permissions!');
    }
});

// End stream
document.getElementById('endStreamBtn').addEventListener('click', () => {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    
    socket.emit('end-stream', { streamId });
    
    document.getElementById('goLiveBtn').style.display = 'block';
    document.getElementById('endStreamBtn').style.display = 'none';
    document.getElementById('liveIndicator').style.display = 'none';
    isLive = false;
});

// Update viewer count
socket.on('viewer-count', (data) => {
    document.getElementById('viewerCount').textContent = data.count;
});

