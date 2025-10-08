// Database Manager - LX4T Platform
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../database/lx4t.db');
const SCHEMA_PATH = path.join(__dirname, '../database/init.sql');

// Initialize database
function initDatabase() {
    console.log('📦 Initializing database...');
    
    // Ensure database directory exists
    const dbDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }
    
    // Create or open database
    const db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL'); // Better performance
    
    // Read and execute schema
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);
    
    console.log('✅ Database initialized successfully');
    return db;
}

// Get database instance
const db = initDatabase();

module.exports = db;

