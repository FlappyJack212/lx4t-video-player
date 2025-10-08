// Comments Routes - LX4T Platform
const express = require('express');
const Comment = require('./models/Comment');
const { authenticateToken } = require('./auth');

const router = express.Router();

// POST /api/comments - Create comment
router.post('/', authenticateToken, (req, res) => {
    try {
        const { videoId, text, parentId } = req.body;
        
        if (!videoId || !text) {
            return res.status(400).json({ error: 'Video ID and text required' });
        }
        
        if (text.length > 500) {
            return res.status(400).json({ error: 'Comment too long (max 500 chars)' });
        }
        
        const comment = Comment.create({
            videoId,
            userId: req.user.id,
            text,
            parentId
        });
        
        res.json({ success: true, comment });
    } catch (error) {
        console.error('Create comment error:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
});

// GET /api/comments/:videoId - Get comments
router.get('/:videoId', (req, res) => {
    try {
        const comments = Comment.getByVideo(req.params.videoId);
        res.json({ comments });
    } catch (error) {
        console.error('Get comments error:', error);
        res.status(500).json({ error: 'Failed to get comments' });
    }
});

// DELETE /api/comments/:id - Delete comment
router.delete('/:id', authenticateToken, (req, res) => {
    try {
        Comment.delete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.error('Delete comment error:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

// POST /api/comments/:id/like - Like comment
router.post('/:id/like', authenticateToken, (req, res) => {
    try {
        Comment.like(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.error('Like comment error:', error);
        res.status(500).json({ error: 'Failed to like comment' });
    }
});

module.exports = router;

