// Comment Model - LX4T Platform
const db = require('../database');
const crypto = require('crypto');

class Comment {
    // Create comment
    static create({ videoId, userId, text, parentId = null }) {
        const id = crypto.randomUUID();
        const createdAt = Date.now();
        
        const stmt = db.prepare(`
            INSERT INTO comments (id, videoId, userId, text, parentId, createdAt)
            VALUES (?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run(id, videoId, userId, text, parentId, createdAt);
        return { id, videoId, userId, text, createdAt };
    }
    
    // Get comments for video
    static getByVideo(videoId) {
        const stmt = db.prepare(`
            SELECT c.*, u.username, u.avatar
            FROM comments c
            JOIN users u ON c.userId = u.id
            WHERE c.videoId = ?
            ORDER BY c.createdAt DESC
        `);
        return stmt.all(videoId);
    }
    
    // Delete comment
    static delete(commentId) {
        const stmt = db.prepare('DELETE FROM comments WHERE id = ?');
        stmt.run(commentId);
    }
    
    // Like comment
    static like(commentId) {
        const stmt = db.prepare('UPDATE comments SET likes = likes + 1 WHERE id = ?');
        stmt.run(commentId);
    }
}

module.exports = Comment;

