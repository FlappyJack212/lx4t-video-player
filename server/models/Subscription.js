// Subscription Model - LX4T Platform
const db = require('../database');
const crypto = require('crypto');

class Subscription {
    // Subscribe to creator
    static create(subscriberId, creatorId) {
        const id = crypto.randomUUID();
        const createdAt = Date.now();
        
        try {
            const stmt = db.prepare(`
                INSERT INTO subscriptions (id, subscriberId, creatorId, createdAt)
                VALUES (?, ?, ?, ?)
            `);
            stmt.run(id, subscriberId, creatorId, createdAt);
            
            // Update creator subscriber count
            const updateStmt = db.prepare('UPDATE users SET subscriberCount = subscriberCount + 1 WHERE id = ?');
            updateStmt.run(creatorId);
            
            return { id, subscriberId, creatorId, createdAt };
        } catch (error) {
            if (error.message.includes('UNIQUE constraint')) {
                throw new Error('Already subscribed');
            }
            throw error;
        }
    }
    
    // Unsubscribe
    static delete(subscriberId, creatorId) {
        const stmt = db.prepare('DELETE FROM subscriptions WHERE subscriberId = ? AND creatorId = ?');
        stmt.run(subscriberId, creatorId);
        
        // Update creator subscriber count
        const updateStmt = db.prepare('UPDATE users SET subscriberCount = subscriberCount - 1 WHERE id = ?');
        updateStmt.run(creatorId);
    }
    
    // Check if subscribed
    static isSubscribed(subscriberId, creatorId) {
        const stmt = db.prepare('SELECT id FROM subscriptions WHERE subscriberId = ? AND creatorId = ?');
        return stmt.get(subscriberId, creatorId) !== undefined;
    }
    
    // Get user's subscriptions
    static getByUser(subscriberId) {
        const stmt = db.prepare(`
            SELECT u.id, u.username, u.avatar
            FROM subscriptions s
            JOIN users u ON s.creatorId = u.id
            WHERE s.subscriberId = ?
            ORDER BY s.createdAt DESC
        `);
        return stmt.all(subscriberId);
    }
}

module.exports = Subscription;

