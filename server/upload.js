// Video Upload Routes - LX4T Platform
const express = require('express');
const multer = require('multer');
const createTorrent = require('create-torrent');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Video = require('./models/Video');
const { authenticateToken } = require('./auth');

const router = express.Router();

// Create uploads directory
const UPLOADS_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${crypto.randomUUID()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 // 2GB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept video files
        const videoMimes = [
            'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime',
            'video/x-msvideo', 'video/x-matroska', 'video/x-flv',
            'video/3gpp', 'video/x-m4v'
        ];
        
        if (videoMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed'));
        }
    }
});

// POST /api/upload - Upload video and create torrent
router.post('/', authenticateToken, upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No video file uploaded' });
        }
        
        const { title, description, category, tags } = req.body;
        
        if (!title) {
            // Clean up uploaded file
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: 'Title is required' });
        }
        
        const filePath = req.file.path;
        const fileSize = req.file.size;
        
        console.log(`📤 Creating torrent for: ${req.file.filename}`);
        
        // Create torrent from uploaded file
        createTorrent(filePath, {
            name: req.file.originalname,
            comment: `LX4T Platform - ${title}`,
            createdBy: 'LX4T Platform'
        }, (err, torrent) => {
            if (err) {
                console.error('Torrent creation error:', err);
                fs.unlinkSync(filePath);
                return res.status(500).json({ error: 'Failed to create torrent' });
            }
            
            // Parse torrent to get magnet URI
            const parsedTorrent = require('parse-torrent')(torrent);
            const magnetUri = parsedTorrent.magnetURI;
            const infoHash = parsedTorrent.infoHash;
            
            console.log(`✅ Torrent created: ${infoHash}`);
            
            // Save video to database
            const video = Video.create({
                title,
                description: description || '',
                creatorId: req.user.id,
                magnetUri,
                infoHash,
                thumbnail: null, // Can be generated later
                duration: 0, // Can be extracted from video metadata
                category: category || 'Uncategorized',
                tags: tags || '',
                fileSize
            });
            
            console.log(`💾 Video saved to database: ${video.id}`);
            
            // Note: In production, you'd want to seed this torrent
            // For now, the file stays in uploads/ directory
            
            res.json({
                success: true,
                video: {
                    id: video.id,
                    title,
                    magnetUri,
                    infoHash
                }
            });
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        
        // Clean up file if it exists
        if (req.file) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (e) {
                console.error('Error deleting file:', e);
            }
        }
        
        res.status(500).json({ error: error.message || 'Upload failed' });
    }
});

// GET /api/videos - Get all videos
router.get('/videos', (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;
        const creator = req.query.creator;
        
        let videos;
        if (creator) {
            videos = Video.getByCreator(creator, limit);
        } else {
            videos = Video.getAll(limit, offset);
        }
        
        res.json({ videos });
    } catch (error) {
        console.error('Get videos error:', error);
        res.status(500).json({ error: 'Failed to get videos' });
    }
});

// GET /api/videos/:id - Get single video
router.get('/videos/:id', (req, res) => {
    try {
        const video = Video.findById(req.params.id);
        
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        
        // Increment view count
        Video.incrementViews(video.id);
        
        res.json({ video });
    } catch (error) {
        console.error('Get video error:', error);
        res.status(500).json({ error: 'Failed to get video' });
    }
});

// GET /api/videos/trending - Get trending videos
router.get('/videos/trending', (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const videos = Video.getTrending(limit);
        
        res.json({ videos });
    } catch (error) {
        console.error('Get trending error:', error);
        res.status(500).json({ error: 'Failed to get trending videos' });
    }
});

// DELETE /api/videos/:id - Delete video (creator only)
router.delete('/videos/:id', authenticateToken, (req, res) => {
    try {
        const video = Video.findById(req.params.id);
        
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        
        // Check if user is creator or admin
        if (video.creatorId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to delete this video' });
        }
        
        Video.delete(req.params.id);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Delete video error:', error);
        res.status(500).json({ error: 'Failed to delete video' });
    }
});

module.exports = router;

