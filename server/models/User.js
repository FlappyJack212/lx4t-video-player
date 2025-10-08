// User Model - LX4T Platform
const db = require('../database');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

class User {
    // Create new user
    static create({ username, email, password }) {
        const id = crypto.randomUUID();
        const hashedPassword = bcrypt.hashSync(password, 10);
        const createdAt = Date.now();
        
        const stmt = db.prepare(`
            INSERT INTO users (id, username, email, password, createdAt)
            VALUES (?, ?, ?, ?, ?)
        `);
        
        try {
            stmt.run(id, username, email, hashedPassword, createdAt);
            return { id, username, email, createdAt };
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed: users.username')) {
                throw new Error('Username already taken');
            }
            if (error.message.includes('UNIQUE constraint failed: users.email')) {
                throw new Error('Email already registered');
            }
            throw error;
        }
    }
    
    // Find user by ID
    static findById(id) {
        const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
        return stmt.get(id);
    }
    
    // Find user by email
    static findByEmail(email) {
        const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
        return stmt.get(email);
    }
    
    // Find user by username
    static findByUsername(username) {
        const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
        return stmt.get(username);
    }
    
    // Verify password
    static verifyPassword(plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
    
    // Update last login
    static updateLastLogin(userId) {
        const stmt = db.prepare('UPDATE users SET lastLogin = ? WHERE id = ?');
        stmt.run(Date.now(), userId);
    }
    
    // Update profile
    static updateProfile(userId, { avatar, banner, bio }) {
        const updates = [];
        const values = [];
        
        if (avatar !== undefined) {
            updates.push('avatar = ?');
            values.push(avatar);
        }
        if (banner !== undefined) {
            updates.push('banner = ?');
            values.push(banner);
        }
        if (bio !== undefined) {
            updates.push('bio = ?');
            values.push(bio);
        }
        
        if (updates.length === 0) return;
        
        values.push(userId);
        const stmt = db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`);
        stmt.run(...values);
    }
    
    // Get user profile (public info only)
    static getProfile(userId) {
        const stmt = db.prepare(`
            SELECT id, username, avatar, banner, bio, role, createdAt, subscriberCount
            FROM users WHERE id = ?
        `);
        return stmt.get(userId);
    }
    
    // Search users
    static search(query, limit = 20) {
        const stmt = db.prepare(`
            SELECT id, username, avatar, subscriberCount
            FROM users
            WHERE username LIKE ?
            ORDER BY subscriberCount DESC
            LIMIT ?
        `);
        return stmt.all(`%${query}%`, limit);
    }
    
    // Delete user
    static delete(userId) {
        const stmt = db.prepare('DELETE FROM users WHERE id = ?');
        stmt.run(userId);
    }
}

module.exports = User;

