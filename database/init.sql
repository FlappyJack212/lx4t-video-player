-- LX4T Platform Database Schema
-- SQLite Database

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT DEFAULT '/assets/default-avatar.png',
    banner TEXT,
    bio TEXT,
    role TEXT DEFAULT 'user',
    isVerified INTEGER DEFAULT 0,
    createdAt INTEGER NOT NULL,
    lastLogin INTEGER,
    subscriberCount INTEGER DEFAULT 0,
    watchTime INTEGER DEFAULT 0
);

-- Videos Table
CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    creatorId TEXT NOT NULL,
    magnetUri TEXT NOT NULL,
    infoHash TEXT,
    thumbnail TEXT,
    duration INTEGER,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    dislikes INTEGER DEFAULT 0,
    category TEXT,
    tags TEXT,
    uploadedAt INTEGER NOT NULL,
    fileSize INTEGER,
    isLive INTEGER DEFAULT 0,
    isPublic INTEGER DEFAULT 1,
    FOREIGN KEY (creatorId) REFERENCES users(id) ON DELETE CASCADE
);

-- Comments Table
CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    videoId TEXT NOT NULL,
    userId TEXT NOT NULL,
    text TEXT NOT NULL,
    parentId TEXT,
    likes INTEGER DEFAULT 0,
    createdAt INTEGER NOT NULL,
    editedAt INTEGER,
    FOREIGN KEY (videoId) REFERENCES videos(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parentId) REFERENCES comments(id) ON DELETE CASCADE
);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    subscriberId TEXT NOT NULL,
    creatorId TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    notifications INTEGER DEFAULT 1,
    FOREIGN KEY (subscriberId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (creatorId) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(subscriberId, creatorId)
);

-- Watch History Table
CREATE TABLE IF NOT EXISTS watch_history (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    videoId TEXT NOT NULL,
    watchTime INTEGER DEFAULT 0,
    completed INTEGER DEFAULT 0,
    lastWatched INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (videoId) REFERENCES videos(id) ON DELETE CASCADE
);

-- Likes Table
CREATE TABLE IF NOT EXISTS likes (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    videoId TEXT NOT NULL,
    type TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (videoId) REFERENCES videos(id) ON DELETE CASCADE,
    UNIQUE(userId, videoId)
);

-- Servers (Communities) Table
CREATE TABLE IF NOT EXISTS servers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    ownerId TEXT NOT NULL,
    icon TEXT,
    banner TEXT,
    createdAt INTEGER NOT NULL,
    memberCount INTEGER DEFAULT 1,
    isPublic INTEGER DEFAULT 1,
    FOREIGN KEY (ownerId) REFERENCES users(id) ON DELETE CASCADE
);

-- Server Members Table
CREATE TABLE IF NOT EXISTS server_members (
    id TEXT PRIMARY KEY,
    serverId TEXT NOT NULL,
    userId TEXT NOT NULL,
    joinedAt INTEGER NOT NULL,
    roles TEXT,
    FOREIGN KEY (serverId) REFERENCES servers(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(serverId, userId)
);

-- Channels Table
CREATE TABLE IF NOT EXISTS channels (
    id TEXT PRIMARY KEY,
    serverId TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    position INTEGER DEFAULT 0,
    permissions TEXT,
    FOREIGN KEY (serverId) REFERENCES servers(id) ON DELETE CASCADE
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    serverId TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    startTime INTEGER NOT NULL,
    videoId TEXT,
    createdBy TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    FOREIGN KEY (serverId) REFERENCES servers(id) ON DELETE CASCADE,
    FOREIGN KEY (videoId) REFERENCES videos(id) ON DELETE SET NULL,
    FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE CASCADE
);

-- Transactions Table (Monetization)
CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    fromUserId TEXT NOT NULL,
    toUserId TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    createdAt INTEGER NOT NULL,
    FOREIGN KEY (fromUserId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (toUserId) REFERENCES users(id) ON DELETE CASCADE
);

-- Sessions Table
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    token TEXT NOT NULL,
    expiresAt INTEGER NOT NULL,
    createdAt INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_videos_creator ON videos(creatorId);
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_videos_uploaded ON videos(uploadedAt);
CREATE INDEX IF NOT EXISTS idx_comments_video ON comments(videoId);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(userId);
CREATE INDEX IF NOT EXISTS idx_subscriptions_creator ON subscriptions(creatorId);
CREATE INDEX IF NOT EXISTS idx_watch_history_user ON watch_history(userId);
CREATE INDEX IF NOT EXISTS idx_server_members_server ON server_members(serverId);

