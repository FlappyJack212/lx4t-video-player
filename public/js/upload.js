// Video Upload Frontend - LX4T Platform

// Check authentication
const token = localStorage.getItem('lx4t_token');
if (!token) {
    window.location.href = '/auth.html';
}

// Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const formSection = document.getElementById('formSection');
const uploadBtn = document.getElementById('uploadBtn');
const uploadProgress = document.getElementById('uploadProgress');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const successMessage = document.getElementById('successMessage');

let selectedFile = null;

// Drop zone click
dropZone.addEventListener('click', () => {
    fileInput.click();
});

// Drag and drop
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelect(files[0]);
    }
});

// File input change
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
    }
});

// Handle file selection
function handleFileSelect(file) {
    // Validate file type
    if (!file.type.startsWith('video/')) {
        alert('Please select a video file');
        return;
    }
    
    // Validate file size (2GB max)
    const maxSize = 2 * 1024 * 1024 * 1024;
    if (file.size > maxSize) {
        alert('File size must be less than 2GB');
        return;
    }
    
    selectedFile = file;
    
    // Show file info
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = formatFileSize(file.size);
    document.getElementById('fileType').textContent = file.type;
    
    fileInfo.classList.add('show');
    formSection.classList.add('show');
    
    // Auto-fill title from filename
    const titleInput = document.getElementById('videoTitle');
    if (!titleInput.value) {
        titleInput.value = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Upload button
uploadBtn.addEventListener('click', async () => {
    if (!selectedFile) {
        alert('Please select a video file');
        return;
    }
    
    const title = document.getElementById('videoTitle').value.trim();
    if (!title) {
        alert('Please enter a title');
        return;
    }
    
    const description = document.getElementById('videoDescription').value.trim();
    const category = document.getElementById('videoCategory').value;
    const tags = document.getElementById('videoTags').value.trim();
    
    // Create form data
    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('tags', tags);
    
    // Show progress
    uploadBtn.disabled = true;
    formSection.style.display = 'none';
    uploadProgress.classList.add('show');
    progressText.textContent = 'Uploading video...';
    
    try {
        const xhr = new XMLHttpRequest();
        
        // Upload progress
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                progressFill.style.width = percentComplete + '%';
                progressText.textContent = `Uploading... ${Math.round(percentComplete)}%`;
            }
        });
        
        // Upload complete
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                
                progressText.textContent = 'Creating torrent...';
                
                // Show success
                setTimeout(() => {
                    uploadProgress.classList.remove('show');
                    successMessage.classList.add('show');
                    document.getElementById('magnetLink').textContent = response.video.magnetUri;
                }, 1000);
            } else {
                const error = JSON.parse(xhr.responseText);
                throw new Error(error.error || 'Upload failed');
            }
        });
        
        // Error handling
        xhr.addEventListener('error', () => {
            throw new Error('Upload failed');
        });
        
        // Send request
        xhr.open('POST', '/api/upload');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.send(formData);
        
    } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed: ' + error.message);
        
        uploadBtn.disabled = false;
        uploadProgress.classList.remove('show');
        formSection.style.display = 'block';
        progressFill.style.width = '0%';
    }
});

