// Sample video data
const sampleVideos = [
    {
        id: 1,
        title: "Big Buck Bunny - Blender Open Movie",
        channel: "Blender Foundation",
        views: "1.2M views",
        duration: "9:56",
        thumbnail: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        category: "movies"
    },
    {
        id: 2,
        title: "Elephant's Dream - First Blender Film",
        channel: "Blender Foundation",
        views: "856K views",
        duration: "10:53",
        thumbnail: "https://download.blender.org/demo/movies/ToS/ToS-4k-1920.jpg",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        category: "movies"
    },
    {
        id: 3,
        title: "Sintel - Third Open Movie by Blender",
        channel: "Blender Foundation",
        views: "2.3M views",
        duration: "14:48",
        thumbnail: "https://durian.blender.org/wp-content/uploads/2010/06/05.8b_comp_000800.jpg",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        category: "movies"
    },
    {
        id: 4,
        title: "Tears of Steel - Blender VFX Film",
        channel: "Blender Foundation",
        views: "1.8M views",
        duration: "12:14",
        thumbnail: "https://mango.blender.org/wp-content/uploads/2012/08/01_thom_celia.jpg",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        category: "movies"
    },
    {
        id: 5,
        title: "For Bigger Blazes - Demo Video",
        channel: "Android",
        views: "3.5M views",
        duration: "0:15",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        category: "trending"
    },
    {
        id: 6,
        title: "For Bigger Escape - Travel Adventure",
        channel: "Android",
        views: "987K views",
        duration: "0:15",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        category: "trending"
    },
    {
        id: 7,
        title: "For Bigger Fun - Entertainment",
        channel: "Android",
        views: "654K views",
        duration: "0:15",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        category: "music"
    },
    {
        id: 8,
        title: "For Bigger Joyrides - Automotive",
        channel: "Android",
        views: "432K views",
        duration: "0:15",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        category: "trending"
    },
    {
        id: 9,
        title: "For Bigger Meltdowns - Action Packed",
        channel: "Android",
        views: "1.1M views",
        duration: "0:15",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        category: "trending"
    },
    {
        id: 10,
        title: "Subaru Outback On Street And Dirt",
        channel: "Garage419",
        views: "567K views",
        duration: "0:48",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
        category: "trending"
    },
    {
        id: 11,
        title: "Volkswagen GTI Review",
        channel: "Garage419",
        views: "234K views",
        duration: "0:31",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
        category: "movies"
    },
    {
        id: 12,
        title: "What care can you get for a grand?",
        channel: "Garage419",
        views: "189K views",
        duration: "3:46",
        thumbnail: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
        category: "movies"
    }
];

// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const themeBtn = document.getElementById('themeBtn');
const trendingGrid = document.getElementById('trendingGrid');
const moviesGrid = document.getElementById('moviesGrid');
const musicGrid = document.getElementById('musicGrid');
const recentGrid = document.getElementById('recentGrid');
const videoCardTemplate = document.getElementById('videoCardTemplate');
const sidebarItems = document.querySelectorAll('.sidebar-item[data-category], .sidebar-item[data-filter]');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateVideoGrids();
    setupEventListeners();
    checkMobileView();
    setupAuth();
});

// Populate video grids
function populateVideoGrids() {
    // Trending videos
    const trendingVideos = sampleVideos.filter(v => v.category === 'trending').slice(0, 4);
    populateGrid(trendingGrid, trendingVideos.length > 0 ? trendingVideos : sampleVideos.slice(0, 4));
    
    // Movies
    const movieVideos = sampleVideos.filter(v => v.category === 'movies');
    populateGrid(moviesGrid, movieVideos.length > 0 ? movieVideos : sampleVideos.slice(0, 4));
    
    // Music
    const musicVideos = sampleVideos.filter(v => v.category === 'music');
    populateGrid(musicGrid, musicVideos.length > 0 ? musicVideos : sampleVideos.slice(4, 8));
    
    // Recent
    populateGrid(recentGrid, sampleVideos.slice(0, 4));
}

// Populate a specific grid
function populateGrid(grid, videos) {
    grid.innerHTML = '';
    videos.forEach(video => {
        const card = createVideoCard(video);
        grid.appendChild(card);
    });
}

// Create video card
function createVideoCard(video) {
    const template = videoCardTemplate.content.cloneNode(true);
    const card = template.querySelector('.video-card');
    const thumbnail = template.querySelector('.video-thumbnail');
    const img = template.querySelector('.video-thumbnail img');
    const duration = template.querySelector('.video-duration');
    const title = template.querySelector('.video-title');
    const channel = template.querySelector('.video-channel');
    const stats = template.querySelector('.video-stats');
    
    // Set video URL in data attribute and href
    card.dataset.videoId = video.id;
    thumbnail.href = `watch.html?v=${video.id}`;
    title.href = `watch.html?v=${video.id}`;
    
    // Set thumbnail with error handling
    img.src = video.thumbnail;
    img.alt = video.title;
    img.onerror = function() {
        this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><rect fill="%23181818" width="1920" height="1080"/><text x="50%" y="50%" fill="%23aaa" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="48">No Thumbnail</text></svg>';
    };
    
    duration.textContent = video.duration;
    title.textContent = video.title;
    channel.textContent = video.channel;
    stats.textContent = video.views;
    
    return template;
}

// Setup event listeners
function setupEventListeners() {
    // Menu button (toggle sidebar)
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar on outside click (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Theme toggle
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
    
    // Sidebar category/filter clicks
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const category = item.dataset.category;
            const filter = item.dataset.filter;
            
            // Update active state
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Filter videos
            if (category) {
                filterByCategory(category);
            } else if (filter) {
                filterByType(filter);
            }
        });
    });
}

// Search functionality
function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;
    
    const filteredVideos = sampleVideos.filter(video => 
        video.title.toLowerCase().includes(query) ||
        video.channel.toLowerCase().includes(query)
    );
    
    // Hide all sections except first
    document.querySelectorAll('.video-section').forEach((section, index) => {
        if (index === 0) {
            section.style.display = 'block';
            const header = section.querySelector('.section-header h2');
            header.textContent = `Search Results for "${query}"`;
            const grid = section.querySelector('.video-grid');
            if (filteredVideos.length > 0) {
                populateGrid(grid, filteredVideos);
            } else {
                grid.innerHTML = '<p style="color: var(--text-secondary); padding: 40px; text-align: center; grid-column: 1 / -1;">No videos found</p>';
            }
        } else {
            section.style.display = 'none';
        }
    });
}

// Filter by category
function filterByCategory(category) {
    const filteredVideos = sampleVideos.filter(v => v.category === category);
    
    document.querySelectorAll('.video-section').forEach((section, index) => {
        if (index === 0) {
            section.style.display = 'block';
            const header = section.querySelector('.section-header h2');
            header.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            const grid = section.querySelector('.video-grid');
            populateGrid(grid, filteredVideos.length > 0 ? filteredVideos : sampleVideos);
        } else {
            section.style.display = 'none';
        }
    });
}

// Filter by type
function filterByType(type) {
    // Reset all sections visibility
    document.querySelectorAll('.video-section').forEach(section => {
        section.style.display = 'block';
    });
    
    // Reset headers
    document.querySelectorAll('.section-header h2').forEach((header, index) => {
        const defaultTitles = ['Trending Now', 'Popular Movies', 'Music Videos', 'Recently Added'];
        header.textContent = defaultTitles[index] || 'Videos';
    });
    
    if (type === 'trending') {
        populateVideoGrids();
    } else if (type === 'library') {
        // Show user's saved videos (placeholder)
        const libraryVideos = sampleVideos.slice(0, 8);
        document.querySelectorAll('.video-section').forEach((section, index) => {
            if (index === 0) {
                const header = section.querySelector('.section-header h2');
                header.textContent = 'Your Library';
                const grid = section.querySelector('.video-grid');
                populateGrid(grid, libraryVideos);
            } else {
                section.style.display = 'none';
            }
        });
    } else if (type === 'history') {
        // Show recently watched videos (placeholder)
        const historyVideos = sampleVideos.slice(0, 6);
        document.querySelectorAll('.video-section').forEach((section, index) => {
            if (index === 0) {
                const header = section.querySelector('.section-header h2');
                header.textContent = 'Watch History';
                const grid = section.querySelector('.video-grid');
                populateGrid(grid, historyVideos);
            } else {
                section.style.display = 'none';
            }
        });
    }
}

// Check mobile view on resize
function checkMobileView() {
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add video to URL params (for watch page)
window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.video-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Store video data in sessionStorage for watch page
            const videoId = card.dataset.videoId;
            const video = sampleVideos.find(v => v.id == videoId);
            if (video) {
                sessionStorage.setItem('currentVideo', JSON.stringify(video));
            }
        });
    });
});

// Handle logo click to reset view
document.querySelector('.brand').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'index.html';
    window.location.reload();
});

// Setup authentication UI
function setupAuth() {
    const loginBtn = document.getElementById('loginNavBtn');
    const userMenu = document.getElementById('userMenu');
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Check if user is logged in
    const user = window.auth ? window.auth.getCurrentUser() : null;
    
    if (user) {
        // User is logged in - show user menu
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userMenu) userMenu.classList.remove('hidden');
        
        // Set user avatar
        const userAvatar = document.getElementById('userAvatar');
        const dropdownAvatar = document.getElementById('dropdownAvatar');
        const dropdownUsername = document.getElementById('dropdownUsername');
        const dropdownEmail = document.getElementById('dropdownEmail');
        
        const avatarUrl = user.avatar || '/assets/default-avatar.png';
        if (userAvatar) userAvatar.src = avatarUrl;
        if (dropdownAvatar) dropdownAvatar.src = avatarUrl;
        if (dropdownUsername) dropdownUsername.textContent = user.username;
        if (dropdownEmail) dropdownEmail.textContent = user.email;
        
        // Toggle dropdown
        if (userBtn && userDropdown) {
            userBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('hidden');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!userMenu.contains(e.target)) {
                    userDropdown.classList.add('hidden');
                }
            });
        }
        
        // Logout handler
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                if (window.auth) {
                    window.auth.logout();
                }
            });
        }
    } else {
        // User is not logged in - show login button
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
    }
    
    // Handle upload button
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            if (user) {
                window.location.href = 'studio.html';
            } else {
                // Redirect to login with return URL
                window.location.href = 'login.html?redirect=studio.html';
            }
        });
    }
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images
    setTimeout(() => {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }, 100);
}

