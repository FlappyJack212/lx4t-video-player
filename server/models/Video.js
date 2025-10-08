// Video Model - LX4T Platform
const db = require('../database');
const crypto = require('crypto');

class Video {
    // Create new video
    static create({ title, description, creatorId, magnetUri, infoHash, thumbnail, duration, category, tags, fileSize }) {
        const id = crypto.randomUUID();
        const uploadedAt = Date.now();
        
        const stmt = db.prepare(`
            INSERT INTO videos (
                id, title, description, creatorId, magnetUri, infoHash,
                thumbnail, duration, category, tags, uploadedAt, fileSize
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        stmt.run(
            id, title, description, creatorId, magnetUri, infoHash,
            thumbnail, duration, category, tags, uploadedAt, fileSize
        );
        
        return { id, title, creatorId, uploadedAt };
    }
    
    // Find video by ID
    static findById(id) {
        const stmt = db.prepare('SELECT * FROM videos WHERE id = ?');
        return stmt.get(id);
    }
    
    // Get all videos (for browse)
    static getAll(limit = 50, offset = 0) {
        const stmt = db.prepare(`
            SELECT v.*, u.username as creatorName, u.avatar as creatorAvatar
            FROM videos v
            JOIN users u ON v.creatorId = u.id
            WHERE v.isPublic = 1
            ORDER BY v.uploadedAt DESC
            LIMIT ? OFFSET ?
        `);
        return stmt.all(limit, offset);
    }
    
    // Get videos by category
    static getByCategory(category, limit = 20) {
        const stmt = db.prepare(`
            SELECT v.*, u.username as creatorName
            FROM videos v
            JOIN users u ON v.creatorId = u.id
            WHERE v.category = ? AND v.isPublic = 1
            ORDER BY v.views DESC
            LIMIT ?
        `);
        return stmt.all(category, limit);
    }
    
    // Get videos by creator
    static getByCreator(creatorId, limit = 50) {
        const stmt = db.prepare(`
            SELECT * FROM videos
            WHERE creatorId = ?
            ORDER BY uploadedAt DESC
            LIMIT ?
        `);
        return stmt.all(creatorId, limit);
    }
    
    // Search videos
    static search(query, limit = 20) {
        const stmt = db.prepare(`
            SELECT v.*, u.username as creatorName
            FROM videos v
            JOIN users u ON v.creatorId = u.id
            WHERE (v.title LIKE ? OR v.description LIKE ? OR v.tags LIKE ?)
            AND v.isPublic = 1
            ORDER BY v.views DESC
            LIMIT ?
        `);
        return stmt.all(`%${query}%`, `%${query}%`, `%${query}%`, limit);
    }
    
    // Increment view count
    static incrementViews(videoId) {
        const stmt = db.prepare('UPDATE videos SET views = views + 1 WHERE id = ?');
        stmt.run(videoId);
    }
    
    // Update video
    static update(videoId, { title, description, thumbnail, category, tags }) {
        const updates = [];
        const values = [];
        
        if (title !== undefined) {
            updates.push('title = ?');
            values.push(title);
        }
        if (description !== undefined) {
            updates.push('description = ?');
            values.push(description);
        }
        if (thumbnail !== undefined) {
            updates.push('thumbnail = ?');
            values.push(thumbnail);
        }
        if (category !== undefined) {
            updates.push('category = ?');
            values.push(category);
        }
        if (tags !== undefined) {
            updates.push('tags = ?');
            values.push(tags);
        }
        
        if (updates.length === 0) return;
        
        values.push(videoId);
        const stmt = db.prepare(`UPDATE videos SET ${updates.join(', ')} WHERE id = ?`);
        stmt.run(...values);
    }
    
    // Delete video
    static delete(videoId) {
        const stmt = db.prepare('DELETE FROM videos WHERE id = ?');
        stmt.run(videoId);
    }
    
    // Get trending videos
    static getTrending(limit = 10) {
        const stmt = db.prepare(`
            SELECT v.*, u.username as creatorName
            FROM videos v
            JOIN users u ON v.creatorId = u.id
            WHERE v.isPublic = 1
            ORDER BY v.views DESC, v.uploadedAt DESC
            LIMIT ?
        `);
        return stmt.all(limit);
    }
}

module.exports = Video;

