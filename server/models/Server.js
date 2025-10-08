// Server (Community) Model - LX4T Platform
const db = require('../database');
const crypto = require('crypto');

class Server {
    static create({ name, description, ownerId }) {
        const id = crypto.randomUUID();
        const createdAt = Date.now();
        
        const stmt = db.prepare(`
            INSERT INTO servers (id, name, description, ownerId, createdAt)
            VALUES (?, ?, ?, ?, ?)
        `);
        stmt.run(id, name, description, ownerId, createdAt);
        
        // Add owner as member
        const memberStmt = db.prepare(`
            INSERT INTO server_members (id, serverId, userId, joinedAt, roles)
            VALUES (?, ?, ?, ?, ?)
        `);
        memberStmt.run(crypto.randomUUID(), id, ownerId, createdAt, 'owner');
        
        return { id, name, description, ownerId, createdAt };
    }
    
    static findById(id) {
        const stmt = db.prepare('SELECT * FROM servers WHERE id = ?');
        return stmt.get(id);
    }
    
    static getAll(limit = 50) {
        const stmt = db.prepare('SELECT * FROM servers WHERE isPublic = 1 ORDER BY memberCount DESC LIMIT ?');
        return stmt.all(limit);
    }
    
    static joinServer(serverId, userId) {
        const id = crypto.randomUUID();
        const stmt = db.prepare(`
            INSERT INTO server_members (id, serverId, userId, joinedAt)
            VALUES (?, ?, ?, ?)
        `);
        stmt.run(id, serverId, userId, Date.now());
        
        db.prepare('UPDATE servers SET memberCount = memberCount + 1 WHERE id = ?').run(serverId);
    }
    
    static leaveServer(serverId, userId) {
        db.prepare('DELETE FROM server_members WHERE serverId = ? AND userId = ?').run(serverId, userId);
        db.prepare('UPDATE servers SET memberCount = memberCount - 1 WHERE id = ?').run(serverId);
    }
}

module.exports = Server;

