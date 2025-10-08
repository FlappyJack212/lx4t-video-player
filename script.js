// Video Player JavaScript
const video = document.getElementById('videoPlayer');
// Video container defined later
const controls = document.getElementById('controls');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const rewindBtn = document.getElementById('rewindBtn');
const forwardBtn = document.getElementById('forwardBtn');
const progressBar = document.getElementById('progressBar');
const progressFilled = document.getElementById('progressFilled');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeHigh = document.querySelector('.volume-high');
const volumeMuted = document.querySelector('.volume-muted');
const speedBtn = document.getElementById('speedBtn');
const speedMenu = document.getElementById('speedMenu');
const speedOptions = document.querySelectorAll('.speed-option');

// Quality control elements
const qualityBtn = document.getElementById('qualityBtn');
const qualityMenu = document.getElementById('qualityMenu');
const qualityOptions = document.querySelectorAll('.quality-option');
const qualityText = document.getElementById('qualityText');
const pipBtn = document.getElementById('pipBtn');

// Thumbnail elements
const thumbnailPreview = document.getElementById('thumbnailPreview');
const thumbnailImage = document.getElementById('thumbnailImage');
const thumbnailTime = document.getElementById('thumbnailTime');

// Help modal elements
const helpModal = document.getElementById('helpModal');
const helpClose = document.getElementById('helpClose');

// Download elements
const downloadBtn = document.getElementById('downloadBtn');

// Upload elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const uploadProgress = document.getElementById('uploadProgress');
const progressFillUpload = document.getElementById('progressFillUpload');
const uploadStatus = document.getElementById('uploadStatus');

// Theme and interactive elements
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.querySelector('.theme-icon');
const themeText = document.querySelector('.theme-text');
const spookyBtn = document.getElementById('spookyBtn');
const batBtn = document.getElementById('batBtn');
const pumpkinBtn = document.getElementById('pumpkinBtn');

// Comments elements
const commentsToggle = document.getElementById('commentsToggle');
const commentsContainer = document.getElementById('commentsContainer');
const commentInput = document.getElementById('commentInput');
const addCommentBtn = document.getElementById('addCommentBtn');
const commentsList = document.getElementById('commentsList');

// Analytics elements
const analyticsToggle = document.getElementById('analyticsToggle');
const analyticsContainer = document.getElementById('analyticsContainer');
const viewCount = document.getElementById('viewCount');
const watchTime = document.getElementById('watchTime');
const commentCount = document.getElementById('commentCount');
const downloadCount = document.getElementById('downloadCount');
const timelineChart = document.getElementById('timelineChart');

// Mobile gesture elements
const mobileGestures = document.getElementById('mobileGestures');
const gestureClose = document.getElementById('gestureClose');

// Chapters elements
const chaptersToggle = document.getElementById('chaptersToggle');
const chaptersContainer = document.getElementById('chaptersContainer');
const chaptersList = document.getElementById('chaptersList');
const chapterTime = document.getElementById('chapterTime');
const chapterTitle = document.getElementById('chapterTitle');
const addChapterBtn = document.getElementById('addChapterBtn');

// Subtitles elements
const subtitlesToggle = document.getElementById('subtitlesToggle');
const subtitlesContainer = document.getElementById('subtitlesContainer');
const subtitleOnOff = document.getElementById('subtitleOnOff');
const uploadSubtitleBtn = document.getElementById('uploadSubtitleBtn');
const subtitleDisplay = document.getElementById('subtitleDisplay');
const videoSubtitleOverlay = document.getElementById('videoSubtitleOverlay');
const subtitleText = document.getElementById('subtitleText');
const subtitleStartTime = document.getElementById('subtitleStartTime');
const subtitleEndTime = document.getElementById('subtitleEndTime');
const addSubtitleBtn = document.getElementById('addSubtitleBtn');
const subtitlesList = document.getElementById('subtitlesList');

// Loading and error elements
const videoLoading = document.getElementById('videoLoading');
const loadingProgressBar = document.getElementById('loadingProgressBar');
const videoError = document.getElementById('videoError');
const errorMessage = document.getElementById('errorMessage');
const errorRetry = document.getElementById('errorRetry');

// Loop button
const loopBtn = document.getElementById('loopBtn');

// Mini player elements
const videoContainer = document.getElementById('videoContainer');
const miniPlayerBtn = document.getElementById('miniPlayerBtn');
const miniPlayerClose = document.getElementById('miniPlayerClose');

// Bookmark button
const bookmarkBtn = document.getElementById('bookmarkBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const fullscreenOpen = document.querySelector('.fullscreen-open');
const fullscreenClose = document.querySelector('.fullscreen-close');
const loadingSpinner = document.getElementById('loadingSpinner');
const playOverlay = document.getElementById('playOverlay');
const videoUrlInput = document.getElementById('videoUrl');
const loadVideoBtn = document.getElementById('loadVideoBtn');

// Playlist elements
const playlistList = document.getElementById('playlistList');
const addVideoBtn = document.getElementById('addVideoBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const clearPlaylistBtn = document.getElementById('clearPlaylistBtn');
const prevVideoBtn = document.getElementById('prevVideoBtn');
const nextVideoBtn = document.getElementById('nextVideoBtn');

// Playlist data
let playlist = [];
let currentVideoIndex = 0;
let isShuffled = false;

// Quality data
let currentQuality = 'auto';
let availableQualities = [];

// Thumbnail data
let thumbnailTimeout;
let isGeneratingThumbnail = false;

// Help modal data
let isHelpModalOpen = false;

// Download data
let downloadInProgress = false;

// Upload data
let uploadInProgress = false;

// Theme and comments data
let currentTheme = 'auto'; // 'auto', 'halloween', 'christmas', 'spring', etc.
let isHalloweenTheme = true; // Legacy support
let comments = [];
let isCommentsVisible = false;

// Seasonal Theme System
const themes = {
    halloween: {
        name: 'Halloween',
        months: [9, 10], // October (9) to early November (10)
        colors: { primary: '#ff6600', secondary: '#ff9500', accent: '#ffa500' },
        emojis: ['🎃', '👻', '🦇', '🕷️', '🕸️', '💀'],
        particles: ['ghost', 'bat', 'pumpkin'],
        gradient: 'linear-gradient(135deg, #ff6600 0%, #000000 50%, #6a0dad 100%)'
    },
    christmas: {
        name: 'Christmas',
        months: [11], // December
        colors: { primary: '#ff0000', secondary: '#00ff00', accent: '#ffffff' },
        emojis: ['🎄', '🎅', '❄️', '⛄', '🎁', '🔔'],
        particles: ['snowflake', 'star', 'gift'],
        gradient: 'linear-gradient(135deg, #ff0000 0%, #165e1c 50%, #ffffff 100%)'
    },
    valentines: {
        name: 'Valentine\'s Day',
        months: [1], // February
        colors: { primary: '#ff69b4', secondary: '#ff1493', accent: '#ffc0cb' },
        emojis: ['❤️', '💕', '💖', '💗', '💝', '🌹'],
        particles: ['heart', 'rose', 'cupid'],
        gradient: 'linear-gradient(135deg, #ff69b4 0%, #ff1493 50%, #ffc0cb 100%)'
    },
    spring: {
        name: 'Spring',
        months: [2, 3, 4], // March-May
        colors: { primary: '#ff69b4', secondary: '#98fb98', accent: '#ffb6c1' },
        emojis: ['🌸', '🌺', '🌼', '🌻', '🌷', '🦋'],
        particles: ['flower', 'butterfly', 'leaf'],
        gradient: 'linear-gradient(135deg, #ff69b4 0%, #98fb98 50%, #87ceeb 100%)'
    },
    summer: {
        name: 'Summer',
        months: [5, 6, 7], // June-August
        colors: { primary: '#ffd700', secondary: '#ff8c00', accent: '#87ceeb' },
        emojis: ['☀️', '🌊', '🏖️', '🍉', '🌴', '😎'],
        particles: ['sun', 'wave', 'palm'],
        gradient: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 50%, #87ceeb 100%)'
    },
    autumn: {
        name: 'Autumn',
        months: [8], // September
        colors: { primary: '#ff8c00', secondary: '#8b4513', accent: '#daa520' },
        emojis: ['🍂', '🍁', '🌰', '🦃', '🥧', '🌾'],
        particles: ['leaf', 'acorn', 'wheat'],
        gradient: 'linear-gradient(135deg, #ff8c00 0%, #8b4513 50%, #daa520 100%)'
    },
    winter: {
        name: 'Winter',
        months: [0, 11], // January & December
        colors: { primary: '#4169e1', secondary: '#ffffff', accent: '#b0c4de' },
        emojis: ['❄️', '⛄', '🌨️', '🎿', '⛷️', '🏔️'],
        particles: ['snowflake', 'icicle', 'snow'],
        gradient: 'linear-gradient(135deg, #4169e1 0%, #87ceeb 50%, #ffffff 100%)'
    },
    easter: {
        name: 'Easter',
        months: [2, 3], // March-April (variable)
        colors: { primary: '#ff69b4', secondary: '#ffeb3b', accent: '#98fb98' },
        emojis: ['🐰', '🥚', '🌷', '🐣', '🐇', '🌸'],
        particles: ['egg', 'bunny', 'flower'],
        gradient: 'linear-gradient(135deg, #ff69b4 0%, #ffeb3b 50%, #98fb98 100%)'
    },
    newyear: {
        name: 'New Year',
        months: [0], // January
        colors: { primary: '#ffd700', secondary: '#ff69b4', accent: '#9370db' },
        emojis: ['🎉', '🎊', '🥳', '🍾', '✨', '🎆'],
        particles: ['confetti', 'firework', 'sparkle'],
        gradient: 'linear-gradient(135deg, #ffd700 0%, #ff69b4 50%, #9370db 100%)'
    },
    stpatricks: {
        name: 'St. Patrick\'s Day',
        months: [2], // March 17
        colors: { primary: '#00ff00', secondary: '#228b22', accent: '#ffd700' },
        emojis: ['🍀', '🌈', '💚', '🎩', '🧙', '🇮🇪'],
        particles: ['clover', 'rainbow', 'coin'],
        gradient: 'linear-gradient(135deg, #00ff00 0%, #228b22 50%, #ffd700 100%)'
    },
    independence: {
        name: '4th of July',
        months: [6], // July
        colors: { primary: '#ff0000', secondary: '#ffffff', accent: '#0000ff' },
        emojis: ['🇺🇸', '🎆', '🎇', '🗽', '🦅', '🎉'],
        particles: ['firework', 'star', 'flag'],
        gradient: 'linear-gradient(135deg, #ff0000 0%, #ffffff 50%, #0000ff 100%)'
    },
    normal: {
        name: 'Default',
        months: [],
        colors: { primary: '#667eea', secondary: '#764ba2', accent: '#667eea' },
        emojis: ['🎬', '🎥', '📽️', '🎞️', '🍿', '🎭'],
        particles: ['circle', 'square', 'triangle'],
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
};

// Analytics data
let analytics = {
    views: 0,
    watchTime: 0,
    comments: 0,
    downloads: 0,
    startTime: Date.now(),
    engagement: []
};
let isAnalyticsVisible = false;

// Mobile gesture data
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// PWA data
let deferredPrompt;
let isPWAInstalled = false;

// Chapters and subtitles data
let chapters = [];
let subtitles = [];
let isChaptersVisible = false;
let isSubtitlesVisible = false;
let isSubtitlesEnabled = false;
let currentSubtitle = null;

// Loading and error state
let currentVideoUrl = '';
let loadingTimeout = null;

// Loop state
let loopMode = 'off'; // 'off', 'one', 'all'

// Mini player state
let isMiniPlayer = false;

// Watch Party State
let watchParty = {
    active: false,
    isHost: false,
    partyId: null,
    partyName: null,
    userName: null,
    users: [],
    lastSync: 0
};
let syncInterval = null;
let socket = null;
const SOCKET_URL = 'http://localhost:3001'; // Change to your server URL in production

let controlsTimeout;
let isVolumeBeforeMute = 100;

// Initialize
function init() {
    video.volume = volumeSlider.value / 100;
    updateTimeDisplay();
    
    // Add default videos to playlist
    addToPlaylist('Big Buck Bunny', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    addToPlaylist('Elephant Dream', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4');
    addToPlaylist('For Bigger Blazes', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
    addToPlaylist('Sintel', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4');
    
    // Load first video
    if (playlist.length > 0) {
        loadVideo(0);
    }
    
    // Add demo chapters (for Big Buck Bunny)
    chapters.push({ id: 1, time: 0, timeString: '0:00', title: 'Opening Scene' });
    chapters.push({ id: 2, time: 30, timeString: '0:30', title: 'Bunny Wakes Up' });
    chapters.push({ id: 3, time: 60, timeString: '1:00', title: 'Forest Adventure' });
    chapters.push({ id: 4, time: 120, timeString: '2:00', title: 'Meeting Friends' });
    
    // Add demo subtitles
    subtitles.push({ id: 1, text: 'Welcome to LX4T Video Player! 🎃', startTime: 1, endTime: 4, startTimeString: '0:01', endTimeString: '0:04' });
    subtitles.push({ id: 2, text: 'This is an example subtitle overlay', startTime: 5, endTime: 8, startTimeString: '0:05', endTimeString: '0:08' });
    subtitles.push({ id: 3, text: 'Try clicking the chapters below!', startTime: 30, endTime: 33, startTimeString: '0:30', endTimeString: '0:33' });
}

// Play/Pause Functions
function togglePlayPause() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

video.addEventListener('play', () => {
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
    playOverlay.classList.add('hidden');
    videoContainer.classList.remove('paused');
    startControlsTimer();
    
    // Track analytics
    analytics.views++;
    trackEngagement('play');
    updateAnalytics();
});

video.addEventListener('pause', () => {
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    videoContainer.classList.add('paused');
    clearTimeout(controlsTimeout);
});

playPauseBtn.addEventListener('click', togglePlayPause);
playOverlay.addEventListener('click', togglePlayPause);

// Skip Forward/Backward
rewindBtn.addEventListener('click', () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
});

forwardBtn.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
});

// Progress Bar
function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    updateTimeDisplay();
}

function scrub(e) {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
}

let isMouseDown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);
progressBar.addEventListener('mousemove', (e) => {
    if (isMouseDown) scrub(e);
});

// Thumbnail Preview Functions
function showThumbnailPreview(e) {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const time = pos * video.duration;
    
    if (isNaN(time) || time < 0) return;
    
    // Update thumbnail position
    const progressRect = progressBar.getBoundingClientRect();
    const mouseX = e.clientX - progressRect.left;
    const previewLeft = Math.max(80, Math.min(progressRect.width - 80, mouseX));
    thumbnailPreview.style.left = `${previewLeft}px`;
    
    // Update time display
    thumbnailTime.textContent = formatTime(time);
    
    // Show preview
    thumbnailPreview.classList.remove('hidden');
    thumbnailPreview.classList.add('show');
    
    // Generate thumbnail if not already generating
    if (!isGeneratingThumbnail) {
        generateThumbnail(time);
    }
}

function hideThumbnailPreview() {
    thumbnailPreview.classList.add('hidden');
    thumbnailPreview.classList.remove('show');
    clearTimeout(thumbnailTimeout);
}

function generateThumbnail(time) {
    if (isGeneratingThumbnail) return;
    
    isGeneratingThumbnail = true;
    
    // Create a canvas to capture video frame
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match thumbnail
    canvas.width = 160;
    canvas.height = 90;
    
    // Create a temporary video element to capture frame
    const tempVideo = document.createElement('video');
    tempVideo.crossOrigin = 'anonymous';
    tempVideo.muted = true;
    tempVideo.currentTime = time;
    
    tempVideo.addEventListener('loadeddata', () => {
        try {
            // Draw video frame to canvas
            ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
            
            // Convert canvas to image
            const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
            
            // Update thumbnail image
            const img = document.createElement('img');
            img.src = thumbnailUrl;
            img.onload = () => {
                thumbnailImage.innerHTML = '';
                thumbnailImage.appendChild(img);
                isGeneratingThumbnail = false;
            };
            
        } catch (error) {
            console.log('Thumbnail generation failed:', error);
            isGeneratingThumbnail = false;
        }
    });
    
    tempVideo.addEventListener('error', () => {
        isGeneratingThumbnail = false;
    });
    
    // Set video source
    tempVideo.src = video.src;
    tempVideo.load();
}

// Progress bar hover events
progressBar.addEventListener('mouseenter', (e) => {
    showThumbnailPreview(e);
});

progressBar.addEventListener('mousemove', (e) => {
    if (!thumbnailPreview.classList.contains('hidden')) {
        showThumbnailPreview(e);
    }
});

progressBar.addEventListener('mouseleave', () => {
    hideThumbnailPreview();
});

video.addEventListener('timeupdate', updateProgress);

// Time Display
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateTimeDisplay() {
    currentTimeDisplay.textContent = formatTime(video.currentTime);
    durationDisplay.textContent = formatTime(video.duration);
}

video.addEventListener('loadedmetadata', () => {
    updateTimeDisplay();
    renderChapterMarkers(); // Render chapter markers when video loads
});

// Volume Control
function updateVolume() {
    video.volume = volumeSlider.value / 100;
    
    if (video.volume === 0) {
        volumeHigh.classList.add('hidden');
        volumeMuted.classList.remove('hidden');
    } else {
        volumeHigh.classList.remove('hidden');
        volumeMuted.classList.add('hidden');
    }
}

function toggleMute() {
    if (video.volume > 0) {
        isVolumeBeforeMute = volumeSlider.value;
        volumeSlider.value = 0;
    } else {
        volumeSlider.value = isVolumeBeforeMute;
    }
    updateVolume();
}

volumeSlider.addEventListener('input', updateVolume);
volumeBtn.addEventListener('click', toggleMute);

// Video Quality Control
qualityBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    qualityMenu.classList.toggle('hidden');
});

qualityOptions.forEach(option => {
    option.addEventListener('click', () => {
        const quality = option.dataset.quality;
        setVideoQuality(quality);
        
        qualityOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        qualityText.textContent = quality === 'auto' ? 'Auto' : `${quality}p`;
        qualityMenu.classList.add('hidden');
    });
});

function setVideoQuality(quality) {
    currentQuality = quality;
    
    if (quality === 'auto') {
        // Let browser choose quality automatically
        video.removeAttribute('data-quality');
    } else {
        // Set specific quality (this would work with adaptive streaming)
        video.setAttribute('data-quality', quality);
        
        // For demo purposes, we'll simulate quality change
        // In a real implementation, you'd switch video sources
        console.log(`Quality set to: ${quality}p`);
        
        // Show quality indicator
        showQualityIndicator(quality);
    }
}

function showQualityIndicator(quality) {
    // Create temporary quality indicator
    const indicator = document.createElement('div');
    indicator.className = 'quality-indicator';
    indicator.textContent = `${quality}p`;
    indicator.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: #ff6600;
        padding: 8px 12px;
        border-radius: 4px;
        font-weight: bold;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    videoContainer.appendChild(indicator);
    
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }, 2000);
}

// Playback Speed
speedBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    speedMenu.classList.toggle('hidden');
});

speedOptions.forEach(option => {
    option.addEventListener('click', () => {
        const speed = parseFloat(option.dataset.speed);
        video.playbackRate = speed;
        
        speedOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        speedBtn.textContent = speed === 1 ? '1x' : `${speed}x`;
        speedMenu.classList.add('hidden');
    });
});

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if (!speedBtn.contains(e.target) && !speedMenu.contains(e.target)) {
        speedMenu.classList.add('hidden');
    }
    if (!qualityBtn.contains(e.target) && !qualityMenu.contains(e.target)) {
        qualityMenu.classList.add('hidden');
    }
});

// Picture in Picture
pipBtn.addEventListener('click', async () => {
    try {
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else {
            await video.requestPictureInPicture();
        }
    } catch (error) {
        console.error('PiP not supported:', error);
    }
});

// Fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            console.error('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

fullscreenBtn.addEventListener('click', toggleFullscreen);

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenOpen.classList.add('hidden');
        fullscreenClose.classList.remove('hidden');
    } else {
        fullscreenOpen.classList.remove('hidden');
        fullscreenClose.classList.add('hidden');
    }
});

// Loading State
video.addEventListener('waiting', () => {
    loadingSpinner.classList.remove('hidden');
});

video.addEventListener('canplay', () => {
    loadingSpinner.classList.add('hidden');
});

// Auto-hide Controls
function startControlsTimer() {
    clearTimeout(controlsTimeout);
    videoContainer.classList.remove('hide-controls');
    
    if (!video.paused) {
        controlsTimeout = setTimeout(() => {
            videoContainer.classList.add('hide-controls');
        }, 3000);
    }
}

videoContainer.addEventListener('mousemove', startControlsTimer);
videoContainer.addEventListener('touchstart', startControlsTimer);

// Playlist Functions
function addToPlaylist(title, url) {
    const videoItem = {
        id: Date.now() + Math.random(),
        title: title,
        url: url,
        duration: '0:00'
    };
    
    playlist.push(videoItem);
    renderPlaylist();
}

function removeFromPlaylist(id) {
    const index = playlist.findIndex(item => item.id === id);
    if (index !== -1) {
        playlist.splice(index, 1);
        if (currentVideoIndex >= playlist.length) {
            currentVideoIndex = Math.max(0, playlist.length - 1);
        }
        renderPlaylist();
    }
}

function loadVideo(index) {
    if (index >= 0 && index < playlist.length) {
        currentVideoIndex = index;
        const videoItem = playlist[index];
        video.src = videoItem.url;
        video.load();
        playOverlay.classList.remove('hidden');
        renderPlaylist();
    }
}

function nextVideo() {
    if (playlist.length > 0) {
        const nextIndex = (currentVideoIndex + 1) % playlist.length;
        loadVideo(nextIndex);
    }
}

function prevVideo() {
    if (playlist.length > 0) {
        const prevIndex = currentVideoIndex === 0 ? playlist.length - 1 : currentVideoIndex - 1;
        loadVideo(prevIndex);
    }
}

function shufflePlaylist() {
    if (playlist.length > 1) {
        const currentVideo = playlist[currentVideoIndex];
        
        // Fisher-Yates shuffle
        for (let i = playlist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
        }
        
        // Find new position of current video
        currentVideoIndex = playlist.findIndex(item => item.id === currentVideo.id);
        renderPlaylist();
        isShuffled = true;
    }
}

function renderPlaylist() {
    playlistList.innerHTML = '';
    
    playlist.forEach((item, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.className = `playlist-item ${index === currentVideoIndex ? 'active' : ''}`;
        playlistItem.innerHTML = `
            <div class="playlist-item-thumbnail">🎬</div>
            <div class="playlist-item-info">
                <div class="playlist-item-title">${item.title}</div>
                <div class="playlist-item-duration">${item.duration}</div>
            </div>
            <div class="playlist-item-actions">
                <button class="playlist-item-btn" onclick="removeFromPlaylist(${item.id})" title="Remove">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
        `;
        
        playlistItem.addEventListener('click', (e) => {
            if (!e.target.closest('.playlist-item-actions')) {
                loadVideo(index);
            }
        });
        
        playlistList.appendChild(playlistItem);
    });
}

// Auto-play next video when current ends
video.addEventListener('ended', () => {
    if (playlist.length > 1) {
        nextVideo();
    }
});

// Event Listeners for Playlist
addVideoBtn.addEventListener('click', () => {
    const url = videoUrlInput.value.trim();
    const title = prompt('Enter video title:', 'Untitled Video');
    if (url && title) {
        addToPlaylist(title, url);
        videoUrlInput.value = '';
    }
});

shuffleBtn.addEventListener('click', shufflePlaylist);
clearPlaylistBtn.addEventListener('click', () => {
    if (confirm('Clear entire playlist?')) {
        playlist = [];
        currentVideoIndex = 0;
        renderPlaylist();
        video.src = '';
        playOverlay.classList.add('hidden');
    }
});

prevVideoBtn.addEventListener('click', prevVideo);
nextVideoBtn.addEventListener('click', nextVideo);

// Load Video from URL
loadVideoBtn.addEventListener('click', () => {
    const url = videoUrlInput.value.trim();
    if (url) {
        addToPlaylist('Custom Video', url);
        videoUrlInput.value = '';
    }
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Only trigger if not typing in an input
    if (document.activeElement.tagName === 'INPUT') return;
    
    switch(e.key.toLowerCase()) {
        case ' ':
        case 'k':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'arrowleft':
            e.preventDefault();
            video.currentTime -= 5;
            break;
        case 'arrowright':
            e.preventDefault();
            video.currentTime += 5;
            break;
        case 'arrowup':
            e.preventDefault();
            volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
            updateVolume();
            break;
        case 'arrowdown':
            e.preventDefault();
            volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
            updateVolume();
            break;
        case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
        case 'm':
            e.preventDefault();
            toggleMute();
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            e.preventDefault();
            const percent = parseInt(e.key) * 10;
            video.currentTime = (video.duration * percent) / 100;
            break;
        case 'n':
            e.preventDefault();
            nextVideo();
            break;
        case 'p':
            e.preventDefault();
            prevVideo();
            break;
        case '?':
            e.preventDefault();
            if (isHelpModalOpen) {
                hideHelpModal();
            } else {
                showHelpModal();
            }
            break;
        case 'escape':
            if (isHelpModalOpen) {
                e.preventDefault();
                hideHelpModal();
            }
            break;
    }
});

// Help Modal Functions
function showHelpModal() {
    helpModal.classList.remove('hidden');
    helpModal.classList.add('show');
    isHelpModalOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function hideHelpModal() {
    helpModal.classList.add('hidden');
    helpModal.classList.remove('show');
    isHelpModalOpen = false;
    document.body.style.overflow = ''; // Restore scrolling
}

// Help modal event listeners
helpClose.addEventListener('click', hideHelpModal);

// Close modal when clicking outside
helpModal.addEventListener('click', (e) => {
    if (e.target === helpModal) {
        hideHelpModal();
    }
});

// Download Functions
function downloadVideo() {
    if (downloadInProgress || !video.src) return;
    
    downloadInProgress = true;
    
    // Show download indicator
    showDownloadIndicator();
    
    try {
        // Create download link
        const link = document.createElement('a');
        link.href = video.src;
        
        // Get video title from playlist or use default
        const currentVideo = playlist[currentVideoIndex];
        const fileName = currentVideo ? 
            `${currentVideo.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4` : 
            'video.mp4';
        
        link.download = fileName;
        link.target = '_blank';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        showDownloadSuccess(fileName);
        
        // Track analytics
        analytics.downloads++;
        trackEngagement('download');
        updateAnalytics();
        
    } catch (error) {
        console.error('Download failed:', error);
        showDownloadError();
    } finally {
        downloadInProgress = false;
    }
}

function showDownloadIndicator() {
    // Create download progress indicator
    const indicator = document.createElement('div');
    indicator.className = 'download-indicator';
    indicator.innerHTML = `
        <div class="download-content">
            <div class="download-spinner"></div>
            <span>Preparing download...</span>
        </div>
    `;
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: #ff6600;
        padding: 12px 16px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 10000;
        border: 2px solid rgba(255, 149, 0, 0.5);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(indicator);
    
    // Remove after 2 seconds
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }, 2000);
}

function showDownloadSuccess(fileName) {
    const indicator = document.createElement('div');
    indicator.className = 'download-success';
    indicator.innerHTML = `
        <div class="download-content">
            <span>✅</span>
            <span>Download started: ${fileName}</span>
        </div>
    `;
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: #4CAF50;
        padding: 12px 16px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 10000;
        border: 2px solid rgba(76, 175, 80, 0.5);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(indicator);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }, 3000);
}

function showDownloadError() {
    const indicator = document.createElement('div');
    indicator.className = 'download-error';
    indicator.innerHTML = `
        <div class="download-content">
            <span>❌</span>
            <span>Download failed. Try again.</span>
        </div>
    `;
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: #f44336;
        padding: 12px 16px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 10000;
        border: 2px solid rgba(244, 67, 54, 0.5);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(indicator);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }, 3000);
}

// Upload Functions
function handleFileUpload(files) {
    if (uploadInProgress) return;
    
    const videoFiles = Array.from(files).filter(file => 
        file.type.startsWith('video/')
    );
    
    if (videoFiles.length === 0) {
        showUploadError('Please select video files only.');
        return;
    }
    
    uploadInProgress = true;
    uploadProgress.classList.remove('hidden');
    
    // Process each video file
    videoFiles.forEach((file, index) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const videoUrl = e.target.result;
            const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
            
            // Add to playlist
            addToPlaylist(fileName, videoUrl);
            
            // Update progress
            const progress = ((index + 1) / videoFiles.length) * 100;
            updateUploadProgress(progress, `Uploaded: ${fileName}`);
            
            // If this is the first video, load it
            if (index === 0) {
                loadVideo(playlist.length - 1);
            }
            
            // Hide progress when all files are processed
            if (index === videoFiles.length - 1) {
                setTimeout(() => {
                    uploadProgress.classList.add('hidden');
                    uploadInProgress = false;
                }, 1000);
            }
        };
        
        reader.onerror = function() {
            showUploadError(`Failed to read file: ${file.name}`);
            uploadInProgress = false;
        };
        
        reader.readAsDataURL(file);
    });
}

function updateUploadProgress(percent, status) {
    progressFillUpload.style.width = `${percent}%`;
    uploadStatus.textContent = status;
}

function showUploadError(message) {
    uploadStatus.textContent = `Error: ${message}`;
    uploadStatus.style.color = '#f44336';
    
    setTimeout(() => {
        uploadProgress.classList.add('hidden');
        uploadStatus.style.color = '#fff';
        uploadInProgress = false;
    }, 3000);
}

// Upload event listeners
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileUpload(e.target.files);
    }
});

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    if (e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files);
    }
});

// Click to upload
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// Theme Switcher Functions
function toggleTheme() {
    isHalloweenTheme = !isHalloweenTheme;
    
    if (isHalloweenTheme) {
        document.body.classList.remove('normal-theme');
        themeIcon.textContent = '🎃';
        themeText.textContent = 'Halloween Mode';
    } else {
        document.body.classList.add('normal-theme');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Normal Mode';
    }
}

// Interactive Halloween Functions
function createGhostEffect() {
    const ghost = document.createElement('div');
    ghost.className = 'ghost-effect';
    ghost.innerHTML = '👻';
    ghost.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        z-index: 10000;
        animation: ghostFloat 2s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(ghost);
    
    setTimeout(() => {
        if (ghost.parentNode) {
            ghost.parentNode.removeChild(ghost);
        }
    }, 2000);
}

function createBatEffect() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const bat = document.createElement('div');
            bat.className = 'bat-effect';
            bat.innerHTML = '🦇';
            bat.style.cssText = `
                position: fixed;
                top: ${Math.random() * 100}%;
                left: -50px;
                font-size: 2rem;
                z-index: 10000;
                animation: batFly 3s linear forwards;
                pointer-events: none;
            `;
            
            document.body.appendChild(bat);
            
            setTimeout(() => {
                if (bat.parentNode) {
                    bat.parentNode.removeChild(bat);
                }
            }, 3000);
        }, i * 200);
    }
}

function createPumpkinEffect() {
    const pumpkin = document.createElement('div');
    pumpkin.className = 'pumpkin-effect';
    pumpkin.innerHTML = '🎃';
    pumpkin.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5rem;
        z-index: 10000;
        animation: pumpkinExplode 1.5s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(pumpkin);
    
    setTimeout(() => {
        if (pumpkin.parentNode) {
            pumpkin.parentNode.removeChild(pumpkin);
        }
    }, 1500);
}

// Comments Functions
function toggleComments() {
    isCommentsVisible = !isCommentsVisible;
    
    if (isCommentsVisible) {
        commentsContainer.classList.remove('hidden');
        commentsToggle.textContent = 'Hide Comments';
    } else {
        commentsContainer.classList.add('hidden');
        commentsToggle.textContent = 'Show Comments';
    }
}

function addComment() {
    const text = commentInput.value.trim();
    if (!text) return;
    
    const comment = {
        id: Date.now(),
        text: text,
        author: 'Anonymous User',
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now()
    };
    
    comments.unshift(comment);
    analytics.comments++;
    trackEngagement('comment');
    updateAnalytics();
    renderComments();
    commentInput.value = '';
}

function renderComments() {
    commentsList.innerHTML = '';
    
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.innerHTML = `
            <div class="comment-author">${comment.author}</div>
            <div class="comment-text">${comment.text}</div>
            <div class="comment-time">${comment.time}</div>
        `;
        commentsList.appendChild(commentElement);
    });
}

// Analytics Functions
function updateAnalytics() {
    viewCount.textContent = analytics.views;
    watchTime.textContent = formatTime(analytics.watchTime);
    commentCount.textContent = analytics.comments;
    downloadCount.textContent = analytics.downloads;
}

function trackEngagement(action) {
    analytics.engagement.push({
        action: action,
        timestamp: Date.now(),
        videoTime: video.currentTime
    });
}

function toggleAnalytics() {
    isAnalyticsVisible = !isAnalyticsVisible;
    
    if (isAnalyticsVisible) {
        analyticsContainer.classList.remove('hidden');
        analyticsToggle.textContent = 'Hide Stats';
        updateAnalytics();
    } else {
        analyticsContainer.classList.add('hidden');
        analyticsToggle.textContent = 'Show Stats';
    }
}

// Mobile Gesture Functions
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
}

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - seek backward
                video.currentTime = Math.max(0, video.currentTime - 10);
                videoContainer.classList.add('swipe-right');
                setTimeout(() => videoContainer.classList.remove('swipe-right'), 200);
            } else {
                // Swipe left - seek forward
                video.currentTime = Math.min(video.duration, video.currentTime + 10);
                videoContainer.classList.add('swipe-left');
                setTimeout(() => videoContainer.classList.remove('swipe-left'), 200);
            }
        }
    } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipeDistance) {
            if (deltaY > 0) {
                // Swipe down - volume down
                volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
                updateVolume();
                videoContainer.classList.add('swipe-down');
                setTimeout(() => videoContainer.classList.remove('swipe-down'), 200);
            } else {
                // Swipe up - volume up
                volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
                updateVolume();
                videoContainer.classList.add('swipe-up');
                setTimeout(() => videoContainer.classList.remove('swipe-up'), 200);
            }
        }
    }
}

function showMobileGestures() {
    if (isMobile) {
        mobileGestures.classList.remove('hidden');
        mobileGestures.classList.add('show');
    }
}

function hideMobileGestures() {
    mobileGestures.classList.add('hidden');
    mobileGestures.classList.remove('show');
}

// PWA Functions
function setupPWA() {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt();
    });

    // Listen for appinstalled event
    window.addEventListener('appinstalled', () => {
        isPWAInstalled = true;
        hideInstallPrompt();
    });
}

function showInstallPrompt() {
    const prompt = document.createElement('div');
    prompt.className = 'install-prompt';
    prompt.innerHTML = `
        <div class="install-text">
            <strong>📱 Install LX4T Player</strong><br>
            Add to home screen for better experience
        </div>
        <div class="install-buttons">
            <button class="install-btn" id="installBtn">Install</button>
            <button class="install-btn" id="dismissBtn">Later</button>
        </div>
    `;
    
    document.body.appendChild(prompt);
    
    document.getElementById('installBtn').addEventListener('click', installPWA);
    document.getElementById('dismissBtn').addEventListener('click', hideInstallPrompt);
}

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA installed');
            }
            deferredPrompt = null;
        });
    }
    hideInstallPrompt();
}

function hideInstallPrompt() {
    const prompt = document.querySelector('.install-prompt');
    if (prompt) {
        prompt.remove();
    }
}

// Event Listeners for all new features
themeBtn.addEventListener('click', toggleTheme);
spookyBtn.addEventListener('click', createGhostEffect);
batBtn.addEventListener('click', createBatEffect);
pumpkinBtn.addEventListener('click', createPumpkinEffect);
commentsToggle.addEventListener('click', toggleComments);
addCommentBtn.addEventListener('click', addComment);
commentInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addComment();
    }
});

// Analytics event listeners
analyticsToggle.addEventListener('click', toggleAnalytics);

// Mobile gesture event listeners
videoContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
videoContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
gestureClose.addEventListener('click', hideMobileGestures);

// Show mobile gestures on first mobile visit
if (isMobile) {
    setTimeout(showMobileGestures, 2000);
}

// PWA setup
setupPWA();

// Chapters Functions
function toggleChapters() {
    isChaptersVisible = !isChaptersVisible;
    
    if (isChaptersVisible) {
        chaptersContainer.classList.remove('hidden');
        chaptersToggle.textContent = 'Hide Chapters';
        renderChapters();
    } else {
        chaptersContainer.classList.add('hidden');
        chaptersToggle.textContent = 'Show Chapters';
    }
}

function addChapter() {
    const time = chapterTime.value.trim();
    const title = chapterTitle.value.trim();
    
    if (!time || !title) return;
    
    const timeInSeconds = parseTimeToSeconds(time);
    if (isNaN(timeInSeconds)) {
        alert('Invalid time format. Use MM:SS');
        return;
    }
    
    const chapter = {
        id: Date.now(),
        time: timeInSeconds,
        timeString: time,
        title: title
    };
    
    chapters.push(chapter);
    chapters.sort((a, b) => a.time - b.time);
    
    chapterTime.value = '';
    chapterTitle.value = '';
    renderChapters();
}

function renderChapters() {
    chaptersList.innerHTML = '';
    
    chapters.forEach(chapter => {
        const chapterElement = document.createElement('div');
        chapterElement.className = 'chapter-item';
        chapterElement.innerHTML = `
            <div class="chapter-time">${chapter.timeString}</div>
            <div class="chapter-title">${chapter.title}</div>
        `;
        
        chapterElement.addEventListener('click', () => {
            video.currentTime = chapter.time;
        });
        
        chaptersList.appendChild(chapterElement);
    });
    
    // Add chapter markers to progress bar
    renderChapterMarkers();
}

function renderChapterMarkers() {
    // Remove existing markers
    const existingMarkers = progressBar.querySelectorAll('.chapter-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    if (!video.duration) return;
    
    // Add new markers
    chapters.forEach(chapter => {
        const marker = document.createElement('div');
        marker.className = 'chapter-marker';
        marker.style.left = `${(chapter.time / video.duration) * 100}%`;
        marker.setAttribute('data-title', chapter.title);
        
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            video.currentTime = chapter.time;
        });
        
        progressBar.appendChild(marker);
    });
}

function parseTimeToSeconds(timeString) {
    const parts = timeString.split(':');
    
    // Handle both MM:SS and HH:MM:SS formats
    if (parts.length === 2) {
        const minutes = parseInt(parts[0]);
        const seconds = parseInt(parts[1]);
        
        if (isNaN(minutes) || isNaN(seconds)) return NaN;
        
        return minutes * 60 + seconds;
    } else if (parts.length === 3) {
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        const seconds = parseFloat(parts[2]);
        
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return NaN;
        
        return hours * 3600 + minutes * 60 + seconds;
    }
    
    return NaN;
}

// Subtitles Functions
function toggleSubtitles() {
    isSubtitlesVisible = !isSubtitlesVisible;
    
    if (isSubtitlesVisible) {
        subtitlesContainer.classList.remove('hidden');
        subtitlesToggle.textContent = 'Hide Subtitles';
        renderSubtitles();
    } else {
        subtitlesContainer.classList.add('hidden');
        subtitlesToggle.textContent = 'Show Subtitles';
    }
}

function toggleSubtitleDisplay() {
    isSubtitlesEnabled = !isSubtitlesEnabled;
    
    if (isSubtitlesEnabled) {
        subtitleOnOff.textContent = 'Subtitles: ON';
        subtitleOnOff.classList.add('active');
        startSubtitleTracking();
    } else {
        subtitleOnOff.textContent = 'Subtitles: OFF';
        subtitleOnOff.classList.remove('active');
        subtitleDisplay.textContent = '';
        currentSubtitle = null;
    }
}

function addSubtitle() {
    const text = subtitleText.value.trim();
    const startTime = subtitleStartTime.value.trim();
    const endTime = subtitleEndTime.value.trim();
    
    if (!text || !startTime || !endTime) return;
    
    const startSeconds = parseTimeToSeconds(startTime);
    const endSeconds = parseTimeToSeconds(endTime);
    
    if (isNaN(startSeconds) || isNaN(endSeconds)) {
        alert('Invalid time format. Use MM:SS');
        return;
    }
    
    const subtitle = {
        id: Date.now(),
        text: text,
        startTime: startSeconds,
        endTime: endSeconds,
        startTimeString: startTime,
        endTimeString: endTime
    };
    
    subtitles.push(subtitle);
    subtitles.sort((a, b) => a.startTime - b.startTime);
    
    subtitleText.value = '';
    subtitleStartTime.value = '';
    subtitleEndTime.value = '';
    renderSubtitles();
}

function renderSubtitles() {
    subtitlesList.innerHTML = '';
    
    subtitles.forEach(subtitle => {
        const subtitleElement = document.createElement('div');
        subtitleElement.className = 'subtitle-item';
        subtitleElement.innerHTML = `
            <div class="subtitle-time">${subtitle.startTimeString} - ${subtitle.endTimeString}</div>
            <div class="subtitle-text">${subtitle.text}</div>
            <div class="subtitle-actions">
                <button class="subtitle-action-btn" onclick="deleteSubtitle(${subtitle.id})" title="Delete">×</button>
            </div>
        `;
        
        subtitlesList.appendChild(subtitleElement);
    });
}

function deleteSubtitle(id) {
    subtitles = subtitles.filter(subtitle => subtitle.id !== id);
    renderSubtitles();
}

function startSubtitleTracking() {
    if (!isSubtitlesEnabled) return;
    
    const currentTime = video.currentTime;
    const activeSubtitle = subtitles.find(subtitle => 
        currentTime >= subtitle.startTime && currentTime <= subtitle.endTime
    );
    
    if (activeSubtitle && activeSubtitle !== currentSubtitle) {
        currentSubtitle = activeSubtitle;
        subtitleDisplay.textContent = activeSubtitle.text;
        videoSubtitleOverlay.textContent = activeSubtitle.text;
        videoSubtitleOverlay.classList.add('active');
    } else if (!activeSubtitle && currentSubtitle) {
        currentSubtitle = null;
        subtitleDisplay.textContent = '';
        videoSubtitleOverlay.textContent = '';
        videoSubtitleOverlay.classList.remove('active');
    }
    
    if (isSubtitlesEnabled) {
        requestAnimationFrame(startSubtitleTracking);
    }
}

function uploadSubtitleFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.srt,.vtt';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            parseSubtitleFile(content, file.name);
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function parseSubtitleFile(content, filename) {
    if (filename.endsWith('.srt')) {
        parseSRTFile(content);
    } else if (filename.endsWith('.vtt')) {
        parseVTTFile(content);
    }
}

function parseSRTFile(content) {
    const blocks = content.split('\n\n');
    
    blocks.forEach(block => {
        const lines = block.trim().split('\n');
        if (lines.length >= 3) {
            const timeLine = lines[1];
            const text = lines.slice(2).join('\n');
            
            const timeMatch = timeLine.match(/(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/);
            if (timeMatch) {
                const startTime = timeMatch[1].replace(',', '.').split(':');
                const endTime = timeMatch[2].replace(',', '.').split(':');
                
                const startSeconds = parseInt(startTime[0]) * 3600 + parseInt(startTime[1]) * 60 + parseFloat(startTime[2]);
                const endSeconds = parseInt(endTime[0]) * 3600 + parseInt(endTime[1]) * 60 + parseFloat(endTime[2]);
                
                const subtitle = {
                    id: Date.now() + Math.random(),
                    text: text,
                    startTime: startSeconds,
                    endTime: endSeconds,
                    startTimeString: `${Math.floor(startSeconds / 60)}:${Math.floor(startSeconds % 60).toString().padStart(2, '0')}`,
                    endTimeString: `${Math.floor(endSeconds / 60)}:${Math.floor(endSeconds % 60).toString().padStart(2, '0')}`
                };
                
                subtitles.push(subtitle);
            }
        }
    });
    
    subtitles.sort((a, b) => a.startTime - b.startTime);
    renderSubtitles();
}

function parseVTTFile(content) {
    // Simple VTT parser - you can enhance this
    const lines = content.split('\n');
    let currentSubtitle = null;
    
    lines.forEach(line => {
        if (line.includes('-->')) {
            const timeMatch = line.match(/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/);
            if (timeMatch) {
                currentSubtitle = {
                    startTime: parseTimeToSeconds(timeMatch[1].split('.')[0]),
                    endTime: parseTimeToSeconds(timeMatch[2].split('.')[0]),
                    text: ''
                };
            }
        } else if (currentSubtitle && line.trim()) {
            currentSubtitle.text += line.trim() + ' ';
        } else if (currentSubtitle && !line.trim()) {
            if (currentSubtitle.text) {
                const subtitle = {
                    id: Date.now() + Math.random(),
                    text: currentSubtitle.text.trim(),
                    startTime: currentSubtitle.startTime,
                    endTime: currentSubtitle.endTime,
                    startTimeString: `${Math.floor(currentSubtitle.startTime / 60)}:${Math.floor(currentSubtitle.startTime % 60).toString().padStart(2, '0')}`,
                    endTimeString: `${Math.floor(currentSubtitle.endTime / 60)}:${Math.floor(currentSubtitle.endTime % 60).toString().padStart(2, '0')}`
                };
                subtitles.push(subtitle);
            }
            currentSubtitle = null;
        }
    });
    
    subtitles.sort((a, b) => a.startTime - b.startTime);
    renderSubtitles();
}

// Event Listeners for Chapters and Subtitles
chaptersToggle.addEventListener('click', toggleChapters);
addChapterBtn.addEventListener('click', addChapter);
chapterTime.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chapterTitle.focus();
    }
});
chapterTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addChapter();
    }
});

subtitlesToggle.addEventListener('click', toggleSubtitles);
subtitleOnOff.addEventListener('click', toggleSubtitleDisplay);
uploadSubtitleBtn.addEventListener('click', uploadSubtitleFile);
addSubtitleBtn.addEventListener('click', addSubtitle);

// Make deleteSubtitle globally accessible
window.deleteSubtitle = deleteSubtitle;

// Loading and Error Handling Functions
function showLoading() {
    videoLoading.classList.add('active');
    videoError.classList.remove('active');
    loadingProgressBar.style.width = '0%';
    
    // Timeout after 30 seconds
    loadingTimeout = setTimeout(() => {
        showError('Video loading timeout. Please check your connection.');
    }, 30000);
}

function hideLoading() {
    videoLoading.classList.remove('active');
    if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
    }
}

function showError(message) {
    hideLoading();
    videoError.classList.add('active');
    errorMessage.textContent = message;
}

function hideError() {
    videoError.classList.remove('active');
}

function retryVideo() {
    hideError();
    if (currentVideoUrl) {
        video.src = currentVideoUrl;
        video.load();
    } else if (playlist.length > 0) {
        loadVideo(currentVideoIndex);
    }
}

// Video event listeners for loading states
video.addEventListener('loadstart', () => {
    showLoading();
    currentVideoUrl = video.currentSrc || video.src;
});

video.addEventListener('loadeddata', () => {
    loadingProgressBar.style.width = '50%';
});

video.addEventListener('canplay', () => {
    loadingProgressBar.style.width = '100%';
    setTimeout(hideLoading, 300);
});

video.addEventListener('error', (e) => {
    let message = 'Failed to load video';
    
    if (video.error) {
        switch (video.error.code) {
            case 1:
                message = 'Video loading aborted';
                break;
            case 2:
                message = 'Network error occurred';
                break;
            case 3:
                message = 'Video format not supported';
                break;
            case 4:
                message = 'Video source not found';
                break;
        }
    }
    
    showError(message);
    trackAnalytics('error', message);
});

video.addEventListener('stalled', () => {
    showLoading();
});

video.addEventListener('waiting', () => {
    if (!video.paused) {
        videoLoading.classList.add('active');
    }
});

video.addEventListener('playing', () => {
    videoLoading.classList.remove('active');
});

// Error retry button
errorRetry.addEventListener('click', retryVideo);

// Loop/Repeat Functions
function toggleLoop() {
    if (loopMode === 'off') {
        loopMode = 'one';
        video.loop = true;
        loopBtn.classList.add('active');
        loopBtn.title = 'Loop: One';
    } else if (loopMode === 'one') {
        loopMode = 'all';
        video.loop = false;
        loopBtn.title = 'Loop: All';
    } else {
        loopMode = 'off';
        video.loop = false;
        loopBtn.classList.remove('active');
        loopBtn.title = 'Loop: Off';
    }
    
    savePreferences();
}

// Handle loop all mode
video.addEventListener('ended', () => {
    if (loopMode === 'all') {
        nextVideo();
    }
});

loopBtn.addEventListener('click', toggleLoop);

// LocalStorage Preferences
function savePreferences() {
    const prefs = {
        volume: video.volume,
        playbackRate: video.playbackRate,
        theme: isHalloweenTheme ? 'halloween' : 'normal',
        quality: currentQuality,
        loopMode: loopMode,
        subtitlesEnabled: isSubtitlesEnabled
    };
    
    localStorage.setItem('lx4t_video_prefs', JSON.stringify(prefs));
}

function loadPreferences() {
    const saved = localStorage.getItem('lx4t_video_prefs');
    if (!saved) return;
    
    try {
        const prefs = JSON.parse(saved);
        
        // Restore volume
        if (prefs.volume !== undefined) {
            video.volume = prefs.volume;
            volumeSlider.value = prefs.volume * 100;
        }
        
        // Restore playback rate
        if (prefs.playbackRate) {
            video.playbackRate = prefs.playbackRate;
            speedBtn.textContent = prefs.playbackRate === 1 ? '1x' : prefs.playbackRate + 'x';
        }
        
        // Restore theme
        if (prefs.theme === 'normal' && isHalloweenTheme) {
            toggleTheme();
        }
        
        // Restore loop mode
        if (prefs.loopMode) {
            loopMode = prefs.loopMode;
            if (loopMode === 'one') {
                video.loop = true;
                loopBtn.classList.add('active');
                loopBtn.title = 'Loop: One';
            } else if (loopMode === 'all') {
                loopBtn.classList.add('active');
                loopBtn.title = 'Loop: All';
            }
        }
        
        // Restore subtitles
        if (prefs.subtitlesEnabled && !isSubtitlesEnabled) {
            toggleSubtitleDisplay();
        }
    } catch (e) {
        console.error('Error loading preferences:', e);
    }
}

// Save preferences on changes
volumeSlider.addEventListener('change', savePreferences);
video.addEventListener('ratechange', savePreferences);

// Load preferences on init
setTimeout(loadPreferences, 100);

// Watch History
function saveToHistory(videoUrl, title) {
    let history = JSON.parse(localStorage.getItem('lx4t_watch_history') || '[]');
    
    // Remove if already exists
    history = history.filter(item => item.url !== videoUrl);
    
    // Add to front
    history.unshift({
        url: videoUrl,
        title: title,
        timestamp: Date.now(),
        date: new Date().toLocaleString()
    });
    
    // Keep only last 50
    history = history.slice(0, 50);
    
    localStorage.setItem('lx4t_watch_history', JSON.stringify(history));
}

// Save to history when video plays
video.addEventListener('play', () => {
    const title = playlist[currentVideoIndex]?.title || 'Unknown Video';
    const url = video.currentSrc || video.src;
    if (url) {
        saveToHistory(url, title);
    }
});

// Mini Player Functions
function toggleMiniPlayer() {
    isMiniPlayer = !isMiniPlayer;
    
    if (isMiniPlayer) {
        videoContainer.classList.add('mini-player');
        miniPlayerBtn.classList.add('active');
        miniPlayerBtn.title = 'Exit Mini Player';
    } else {
        videoContainer.classList.remove('mini-player');
        miniPlayerBtn.classList.remove('active');
        miniPlayerBtn.title = 'Mini Player';
    }
}

miniPlayerBtn.addEventListener('click', toggleMiniPlayer);
miniPlayerClose.addEventListener('click', toggleMiniPlayer);

// Auto mini-player on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (video.paused || isMiniPlayer) return;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const containerRect = videoContainer.getBoundingClientRect();
        
        // If scrolled past video and not already mini
        if (containerRect.bottom < 0 && !isMiniPlayer) {
            toggleMiniPlayer();
        }
        // If scrolled back to video and in mini mode
        else if (containerRect.top > -100 && isMiniPlayer) {
            toggleMiniPlayer();
        }
    }, 100);
});

// Bookmarks/Favorites Functions
function toggleBookmark() {
    const url = video.currentSrc || video.src;
    const title = playlist[currentVideoIndex]?.title || 'Unknown Video';
    const currentTime = video.currentTime;
    
    let bookmarks = JSON.parse(localStorage.getItem('lx4t_bookmarks') || '[]');
    
    // Check if already bookmarked
    const existingIndex = bookmarks.findIndex(b => b.url === url && Math.abs(b.time - currentTime) < 2);
    
    if (existingIndex >= 0) {
        // Remove bookmark
        bookmarks.splice(existingIndex, 1);
        bookmarkBtn.classList.remove('active');
    } else {
        // Add bookmark
        bookmarks.push({
            url: url,
            title: title,
            time: currentTime,
            timestamp: Date.now(),
            date: new Date().toLocaleString(),
            thumbnail: video.poster || ''
        });
        bookmarkBtn.classList.add('active');
    }
    
    localStorage.setItem('lx4t_bookmarks', JSON.stringify(bookmarks));
}

// Check if current moment is bookmarked
function checkBookmarkStatus() {
    const url = video.currentSrc || video.src;
    const currentTime = video.currentTime;
    const bookmarks = JSON.parse(localStorage.getItem('lx4t_bookmarks') || '[]');
    
    const isBookmarked = bookmarks.some(b => b.url === url && Math.abs(b.time - currentTime) < 2);
    
    if (isBookmarked) {
        bookmarkBtn.classList.add('active');
    } else {
        bookmarkBtn.classList.remove('active');
    }
}

bookmarkBtn.addEventListener('click', toggleBookmark);

// Throttled bookmark check for performance
let lastBookmarkCheck = 0;
video.addEventListener('timeupdate', () => {
    const now = Date.now();
    if (now - lastBookmarkCheck > 5000) { // Check every 5 seconds
        checkBookmarkStatus();
        lastBookmarkCheck = now;
    }
});

// Performance Optimizations
// Lazy load analytics chart
let analyticsLoaded = false;
function loadAnalyticsIfNeeded() {
    if (!analyticsLoaded && analyticsToggle.offsetParent !== null) {
        // Analytics is visible, initialize chart
        analyticsLoaded = true;
    }
}

// Debounce progress bar updates
let progressUpdateQueued = false;
video.addEventListener('timeupdate', () => {
    if (!progressUpdateQueued) {
        progressUpdateQueued = true;
        requestAnimationFrame(() => {
            progressUpdateQueued = false;
        });
    }
});

// Optimize thumbnail generation
let thumbnailCache = new Map();
function getCachedThumbnail(time) {
    const key = Math.floor(time / 10) * 10; // Cache every 10 seconds
    return thumbnailCache.get(key);
}

function cacheThumbnail(time, dataUrl) {
    const key = Math.floor(time / 10) * 10;
    thumbnailCache.set(key, dataUrl);
    
    // Limit cache size
    if (thumbnailCache.size > 50) {
        const firstKey = thumbnailCache.keys().next().value;
        thumbnailCache.delete(firstKey);
    }
}

// Clean up on video change
function cleanupVideoResources() {
    thumbnailCache.clear();
    URL.revokeObjectURL(video.src);
}

video.addEventListener('loadstart', cleanupVideoResources);

// Preload next video in playlist
function preloadNextVideo() {
    if (currentVideoIndex < playlist.length - 1) {
        const nextVideo = playlist[currentVideoIndex + 1];
        if (nextVideo && nextVideo.url) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = nextVideo.url;
            document.head.appendChild(link);
        }
    }
}

video.addEventListener('playing', () => {
    // Preload next video after 30 seconds of playback
    setTimeout(preloadNextVideo, 30000);
});

// Seasonal Theme Detection and Application
function detectCurrentTheme() {
    const now = new Date();
    const month = now.getMonth();
    const day = now.getDate();
    
    // Special date checks (higher priority)
    if (month === 11 && day >= 24 && day <= 26) return 'christmas'; // Christmas
    if (month === 0 && day === 1) return 'newyear'; // New Year's Day
    if (month === 9 && day >= 25 && day <= 31) return 'halloween'; // Halloween week
    if (month === 1 && day >= 13 && day <= 15) return 'valentines'; // Valentine's
    if (month === 2 && day === 17) return 'stpatricks'; // St. Patrick's
    if (month === 6 && day === 4) return 'independence'; // 4th of July
    
    // Month-based themes
    if (month === 11) return 'christmas'; // December
    if (month === 9 || month === 10) return 'halloween'; // Oct-Nov
    if (month === 1) return 'valentines'; // February
    if (month === 2 || month === 3 || month === 4) return 'spring'; // Mar-May
    if (month === 5 || month === 6 || month === 7) return 'summer'; // Jun-Aug
    if (month === 8) return 'autumn'; // September
    if (month === 0) return 'winter'; // January
    
    return 'normal';
}

function applyTheme(themeName) {
    const theme = themes[themeName] || themes.normal;
    
    // Apply CSS variables
    document.documentElement.style.setProperty('--theme-primary', theme.colors.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.colors.secondary);
    document.documentElement.style.setProperty('--theme-accent', theme.colors.accent);
    document.documentElement.style.setProperty('--theme-gradient', theme.gradient);
    
    // Update body class
    document.body.className = `theme-${themeName}`;
    
    // Update particles
    updateParticles(theme);
    
    // Update header with theme emoji
    const header = document.querySelector('.header');
    if (header) {
        const emojis = theme.emojis;
        header.textContent = `${emojis[0]} LX4T Video Player ${emojis[1]}`;
    }
    
    // Update theme button
    if (themeBtn) {
        themeIcon.textContent = theme.emojis[0];
        themeText.textContent = `${theme.name} Theme`;
    }
    
    currentTheme = themeName;
    savePreferences();
}

function updateParticles(theme) {
    // Remove old particles
    document.querySelectorAll('.ghost, .bat, .pumpkin, .particle').forEach(el => el.remove());
    
    // Add new themed particles
    const container = document.querySelector('.container');
    if (!container) return;
    
    const particleTypes = theme.particles || ['circle'];
    
    // Create 20 particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        particle.className = `themed-particle ${type}`;
        particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 2 + 1}rem;
            opacity: ${Math.random() * 0.5 + 0.3};
            animation: float${Math.floor(Math.random() * 3) + 1} ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Set emoji based on particle type
        particle.textContent = theme.emojis[i % theme.emojis.length];
        
        container.insertBefore(particle, container.firstChild);
    }
}

// Initialize theme on load
function initializeTheme() {
    const saved = localStorage.getItem('lx4t_manual_theme');
    
    if (saved && saved !== 'auto') {
        // User has manually selected a theme
        applyTheme(saved);
    } else {
        // Auto-detect theme
        const detectedTheme = detectCurrentTheme();
        applyTheme(detectedTheme);
    }
}

// Re-check theme daily
setInterval(() => {
    if (localStorage.getItem('lx4t_manual_theme') === 'auto' || !localStorage.getItem('lx4t_manual_theme')) {
        const detectedTheme = detectCurrentTheme();
        if (detectedTheme !== currentTheme) {
            applyTheme(detectedTheme);
        }
    }
}, 3600000); // Check every hour

// Update theme switcher to cycle through all themes
const originalToggleTheme = toggleTheme;
function toggleTheme() {
    const themeOrder = ['auto', 'halloween', 'christmas', 'valentines', 'spring', 'summer', 'autumn', 'winter', 'newyear', 'easter', 'stpatricks', 'independence', 'normal'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    
    if (nextTheme === 'auto') {
        localStorage.setItem('lx4t_manual_theme', 'auto');
        const detectedTheme = detectCurrentTheme();
        applyTheme(detectedTheme);
        themeText.textContent = `Auto (${themes[detectedTheme].name})`;
    } else {
        localStorage.setItem('lx4t_manual_theme', nextTheme);
        applyTheme(nextTheme);
    }
}

// Initialize theme
initializeTheme();

// ============================================
// WATCH PARTY / MOVIE NIGHT SYSTEM (WebSocket)
// ============================================

// Initialize Socket.io
function initializeSocket() {
    if (socket) return socket;
    
    socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
    });
    
    // Connection events
    socket.on('connect', () => {
        console.log('✅ Connected to server:', socket.id);
        document.getElementById('partyStatus').textContent = '🟢 Connected';
    });
    
    socket.on('disconnect', () => {
        console.log('❌ Disconnected from server');
        document.getElementById('partyStatus').textContent = '🔴 Disconnected';
    });
    
    socket.on('error', (data) => {
        alert(data.message);
    });
    
    // Party events
    socket.on('party-created', (party) => {
        watchParty = {
            active: true,
            isHost: true,
            partyId: party.id,
            partyName: party.name,
            userName: party.host,
            users: party.users,
            lastSync: Date.now()
        };
        showPartyRoom();
        startHostSync();
    });
    
    socket.on('party-joined', (party) => {
        watchParty = {
            active: true,
            isHost: false,
            partyId: party.id,
            partyName: party.name,
            userName: socket.userName,
            users: party.users,
            lastSync: Date.now()
        };
        
        // Sync to party video
        video.src = party.videoUrl;
        video.currentTime = party.currentTime;
        if (!party.paused) {
            video.play();
        }
        
        showPartyRoom();
    });
    
    socket.on('user-joined', (data) => {
        watchParty.users = data.users;
        renderUsers();
        updatePartyStatus({ users: data.users });
        
        // Show notification
        showChatNotification(`${data.userName} joined the party!`);
    });
    
    socket.on('user-left', (data) => {
        watchParty.users = data.users;
        renderUsers();
        updatePartyStatus({ users: data.users });
        
        showChatNotification(`${data.userName} left the party`);
    });
    
    socket.on('promoted-to-host', () => {
        watchParty.isHost = true;
        hostControls.classList.remove('hidden');
        guestNotice.classList.add('hidden');
        startHostSync();
        
        showChatNotification('👑 You are now the host!');
    });
    
    socket.on('new-host', (data) => {
        watchParty.users = data.users;
        renderUsers();
        
        showChatNotification(`👑 ${data.hostName} is now the host`);
    });
    
    socket.on('sync-state', (data) => {
        if (watchParty.isHost) return; // Host doesn't sync to others
        
        const timeDiff = Math.abs(video.currentTime - data.currentTime);
        
        // Sync video URL if different
        if (video.src !== data.videoUrl) {
            video.src = data.videoUrl;
        }
        
        // Sync time if off by >2 seconds
        if (timeDiff > 2) {
            video.currentTime = data.currentTime;
        }
        
        // Sync play/pause
        if (data.paused && !video.paused) {
            video.pause();
        } else if (!data.paused && video.paused) {
            video.play();
        }
    });
    
    socket.on('chat-message', (message) => {
        addChatMessage(message);
    });
    
    socket.on('reaction', (data) => {
        showFloatingReaction(data.emoji, data.x, data.y);
    });
    
    socket.on('active-parties', (parties) => {
        renderActivePartiesWebSocket(parties);
    });
    
    socket.on('party-closed', (data) => {
        alert(data.reason);
        leaveParty();
    });
    
    return socket;
}

// Get all party elements
const partyToggle = document.getElementById('partyToggle');
const partyContainer = document.getElementById('partyContainer');
const partyCreate = document.getElementById('partyCreate');
const partyRoom = document.getElementById('partyRoom');
const createPartyBtn = document.getElementById('createPartyBtn');
const joinPartyBtn = document.getElementById('joinPartyBtn');
const leavePartyBtn = document.getElementById('leavePartyBtn');
const copyIdBtn = document.getElementById('copyIdBtn');
const activePartiesList = document.getElementById('activePartiesList');
const partyChatMessages = document.getElementById('partyChatMessages');
const partyChatInput = document.getElementById('partyChatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const usersList = document.getElementById('usersList');
const currentPartyId = document.getElementById('currentPartyId');
const hostControls = document.getElementById('hostControls');
const guestNotice = document.getElementById('guestNotice');

// Toggle party container
partyToggle.addEventListener('click', () => {
    partyContainer.classList.toggle('hidden');
    renderActiveParties();
});

// Create Party
createPartyBtn.addEventListener('click', () => {
    const name = document.getElementById('partyName').value.trim();
    const hostName = document.getElementById('hostName').value.trim() || 'Anonymous';
    const password = document.getElementById('partyPassword').value;
    
    if (!name) {
        alert('Please enter a party name!');
        return;
    }
    
    const partyId = generatePartyId();
    const party = {
        id: partyId,
        name: name,
        host: hostName,
        password: password,
        created: Date.now(),
        videoUrl: video.src,
        currentTime: video.currentTime,
        paused: video.paused,
        users: [{ name: hostName, isHost: true, joined: Date.now() }],
        messages: []
    };
    
    // Save to localStorage (in production, use real backend)
    saveParty(party);
    
    // Join as host
    joinPartyAsHost(party, hostName);
});

// Join Party
joinPartyBtn.addEventListener('click', () => {
    const partyId = document.getElementById('joinPartyId').value.trim();
    const userName = document.getElementById('joinName').value.trim() || 'Anonymous';
    const password = document.getElementById('joinPassword').value;
    
    if (!partyId) {
        alert('Please enter a Party ID!');
        return;
    }
    
    const party = getParty(partyId);
    
    if (!party) {
        alert('Party not found!');
        return;
    }
    
    if (party.password && party.password !== password) {
        alert('Incorrect password!');
        return;
    }
    
    // Add user to party
    party.users.push({ name: userName, isHost: false, joined: Date.now() });
    saveParty(party);
    
    // Join as guest
    joinPartyAsGuest(party, userName);
});

// Leave Party
leavePartyBtn.addEventListener('click', () => {
    leaveParty();
});

// Copy Party ID
copyIdBtn.addEventListener('click', () => {
    if (watchParty.partyId) {
        navigator.clipboard.writeText(watchParty.partyId);
        copyIdBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyIdBtn.textContent = '📋';
        }, 2000);
    }
});

// Send Chat Message
function sendChatMessage() {
    const message = partyChatInput.value.trim();
    if (!message || !watchParty.active) return;
    
    const chatMessage = {
        author: watchParty.userName,
        text: message,
        time: new Date().toLocaleTimeString(),
        timestamp: Date.now()
    };
    
    // Add to party
    const party = getParty(watchParty.partyId);
    if (party) {
        party.messages.push(chatMessage);
        saveParty(party);
        renderChatMessages();
    }
    
    partyChatInput.value = '';
}

sendChatBtn.addEventListener('click', sendChatMessage);
partyChatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

// Reaction buttons
document.querySelectorAll('.reaction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const emoji = btn.getAttribute('data-emoji');
        sendReaction(emoji);
    });
});

function sendReaction(emoji) {
    // Create floating emoji
    const reaction = document.createElement('div');
    reaction.className = 'floating-reaction';
    reaction.textContent = emoji;
    reaction.style.left = Math.random() * 80 + 10 + '%';
    reaction.style.top = '80%';
    document.body.appendChild(reaction);
    
    setTimeout(() => reaction.remove(), 3000);
    
    // Broadcast to party
    const party = getParty(watchParty.partyId);
    if (party) {
        const chatMessage = {
            author: watchParty.userName,
            text: `reacted with ${emoji}`,
            time: new Date().toLocaleTimeString(),
            timestamp: Date.now(),
            isReaction: true
        };
        party.messages.push(chatMessage);
        saveParty(party);
    }
}

// Party Management Functions
function generatePartyId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function saveParty(party) {
    const parties = getAllParties();
    const index = parties.findIndex(p => p.id === party.id);
    
    if (index >= 0) {
        parties[index] = party;
    } else {
        parties.push(party);
    }
    
    // Clean old parties (> 24 hours)
    const filtered = parties.filter(p => Date.now() - p.created < 86400000);
    localStorage.setItem('lx4t_parties', JSON.stringify(filtered));
}

function getParty(partyId) {
    const parties = getAllParties();
    return parties.find(p => p.id === partyId);
}

function getAllParties() {
    return JSON.parse(localStorage.getItem('lx4t_parties') || '[]');
}

function deleteParty(partyId) {
    const parties = getAllParties().filter(p => p.id !== partyId);
    localStorage.setItem('lx4t_parties', JSON.stringify(parties));
}

function joinPartyAsHost(party, userName) {
    watchParty = {
        active: true,
        isHost: true,
        partyId: party.id,
        partyName: party.name,
        userName: userName,
        users: party.users,
        lastSync: Date.now()
    };
    
    showPartyRoom();
    startSync();
}

function joinPartyAsGuest(party, userName) {
    watchParty = {
        active: true,
        isHost: false,
        partyId: party.id,
        partyName: party.name,
        userName: userName,
        users: party.users,
        lastSync: Date.now()
    };
    
    // Sync to host's video state
    video.src = party.videoUrl;
    video.currentTime = party.currentTime;
    if (!party.paused) {
        video.play();
    }
    
    showPartyRoom();
    startSync();
}

function leaveParty() {
    if (!watchParty.active) return;
    
    // Remove user from party
    const party = getParty(watchParty.partyId);
    if (party) {
        party.users = party.users.filter(u => u.name !== watchParty.userName);
        
        if (party.users.length === 0) {
            // Delete party if no users left
            deleteParty(watchParty.partyId);
        } else {
            // If host left, make first user new host
            if (watchParty.isHost && party.users.length > 0) {
                party.users[0].isHost = true;
            }
            saveParty(party);
        }
    }
    
    // Reset state
    watchParty = {
        active: false,
        isHost: false,
        partyId: null,
        partyName: null,
        userName: null,
        users: [],
        lastSync: 0
    };
    
    stopSync();
    
    partyCreate.classList.remove('hidden');
    partyRoom.classList.add('hidden');
}

function showPartyRoom() {
    partyCreate.classList.add('hidden');
    partyRoom.classList.remove('hidden');
    
    currentPartyId.textContent = watchParty.partyId;
    
    if (watchParty.isHost) {
        hostControls.classList.remove('hidden');
        guestNotice.classList.add('hidden');
    } else {
        hostControls.classList.add('hidden');
        guestNotice.classList.remove('hidden');
    }
    
    renderUsers();
    renderChatMessages();
}

// Sync System
function startSync() {
    stopSync();
    
    // Update party state every 2 seconds
    syncInterval = setInterval(() => {
        if (!watchParty.active) {
            stopSync();
            return;
        }
        
        const party = getParty(watchParty.partyId);
        if (!party) {
            leaveParty();
            return;
        }
        
        if (watchParty.isHost) {
            // Host: Broadcast state to party
            party.videoUrl = video.src;
            party.currentTime = video.currentTime;
            party.paused = video.paused;
            party.users = party.users.map(u => 
                u.name === watchParty.userName ? { ...u, isHost: true } : u
            );
            saveParty(party);
        } else {
            // Guest: Sync to host's state
            const timeDiff = Math.abs(video.currentTime - party.currentTime);
            
            // Sync if off by more than 2 seconds
            if (timeDiff > 2) {
                video.currentTime = party.currentTime;
            }
            
            // Sync play/pause state
            if (party.paused && !video.paused) {
                video.pause();
            } else if (!party.paused && video.paused) {
                video.play();
            }
        }
        
        // Update UI
        renderUsers();
        renderChatMessages();
        updatePartyStatus(party);
        
    }, 2000);
}

function stopSync() {
    if (syncInterval) {
        clearInterval(syncInterval);
        syncInterval = null;
    }
}

function updatePartyStatus(party) {
    const userCount = party.users.length;
    document.getElementById('partyUserCount').textContent = `👥 ${userCount} viewer${userCount !== 1 ? 's' : ''}`;
    document.getElementById('viewerCount').textContent = userCount;
}

function renderUsers() {
    if (!watchParty.active) return;
    
    const party = getParty(watchParty.partyId);
    if (!party) return;
    
    usersList.innerHTML = '';
    
    party.users.forEach(user => {
        const avatar = document.createElement('div');
        avatar.className = `user-avatar ${user.isHost ? 'host' : ''}`;
        avatar.textContent = user.name.charAt(0).toUpperCase();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'user-name-tooltip';
        tooltip.textContent = user.name + (user.isHost ? ' 👑' : '');
        avatar.appendChild(tooltip);
        
        usersList.appendChild(avatar);
    });
}

function renderChatMessages() {
    if (!watchParty.active) return;
    
    const party = getParty(watchParty.partyId);
    if (!party) return;
    
    partyChatMessages.innerHTML = '';
    
    const messages = party.messages.slice(-50); // Last 50 messages
    
    messages.forEach(msg => {
        const messageEl = document.createElement('div');
        messageEl.className = 'chat-message';
        
        if (msg.isReaction) {
            messageEl.innerHTML = `
                <div class="chat-message-text" style="font-style: italic; opacity: 0.8;">
                    ${msg.author} ${msg.text}
                </div>
                <div class="chat-message-time">${msg.time}</div>
            `;
        } else {
            messageEl.innerHTML = `
                <div class="chat-message-author">${msg.author}</div>
                <div class="chat-message-text">${msg.text}</div>
                <div class="chat-message-time">${msg.time}</div>
            `;
        }
        
        partyChatMessages.appendChild(messageEl);
    });
    
    // Scroll to bottom
    partyChatMessages.scrollTop = partyChatMessages.scrollHeight;
}

function renderActiveParties() {
    const parties = getAllParties();
    activePartiesList.innerHTML = '';
    
    if (parties.length === 0) {
        activePartiesList.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center;">No active parties</p>';
        return;
    }
    
    parties.forEach(party => {
        const item = document.createElement('div');
        item.className = 'party-item';
        item.innerHTML = `
            <div class="party-item-info">
                <div class="party-item-name">${party.name}</div>
                <div class="party-item-meta">
                    Host: ${party.host} • ${party.users.length} viewer${party.users.length !== 1 ? 's' : ''}
                    ${party.password ? ' 🔒' : ''}
                </div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            document.getElementById('joinPartyId').value = party.id;
        });
        
        activePartiesList.appendChild(item);
    });
}

// Auto-refresh active parties
setInterval(renderActiveParties, 5000);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (watchParty.active) {
        leaveParty();
    }
});

console.log(`🎃 LX4T Video Player loaded with ${themes[currentTheme]?.name || 'Auto'} theme!`);
console.log(`🎬 Watch Party system ready!`);

// Download event listener
downloadBtn.addEventListener('click', downloadVideo);

// Double-click to fullscreen
video.addEventListener('dblclick', toggleFullscreen);

// Click video to play/pause
video.addEventListener('click', togglePlayPause);

// Initialize on load
init();

