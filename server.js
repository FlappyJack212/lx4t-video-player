// LX4T Video Player - WebSocket Server
// Run with: node server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Legacy support - serve root files
app.use(express.static(__dirname));

// API Routes
const { router: authRouter } = require('./server/auth');
const uploadRouter = require('./server/upload');

app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);

// Store active parties in memory
const parties = new Map();

// Clean up old parties every hour
setInterval(() => {
    const now = Date.now();
    parties.forEach((party, partyId) => {
        if (now - party.created > 86400000) { // 24 hours
            parties.delete(partyId);
            io.to(partyId).emit('party-closed', { reason: 'Party expired (24h)' });
        }
    });
}, 3600000);

io.on('connection', (socket) => {
    console.log('🎬 User connected:', socket.id);

    // Create Party
    socket.on('create-party', (data) => {
        const { partyId, partyName, hostName, password, videoUrl, currentTime, paused } = data;
        
        if (parties.has(partyId)) {
            socket.emit('error', { message: 'Party ID already exists' });
            return;
        }

        const party = {
            id: partyId,
            name: partyName,
            host: hostName,
            hostSocketId: socket.id,
            password: password,
            created: Date.now(),
            videoUrl: videoUrl,
            currentTime: currentTime,
            paused: paused,
            users: [{ name: hostName, socketId: socket.id, isHost: true, joined: Date.now() }],
            messages: []
        };

        parties.set(partyId, party);
        socket.join(partyId);
        socket.partyId = partyId;
        socket.userName = hostName;
        socket.isHost = true;

        socket.emit('party-created', party);
        console.log(`🎉 Party created: ${partyId} by ${hostName}`);
    });

    // Join Party
    socket.on('join-party', (data) => {
        const { partyId, userName, password } = data;
        
        const party = parties.get(partyId);
        
        if (!party) {
            socket.emit('error', { message: 'Party not found' });
            return;
        }

        if (party.password && party.password !== password) {
            socket.emit('error', { message: 'Incorrect password' });
            return;
        }

        // Add user to party
        party.users.push({ name: userName, socketId: socket.id, isHost: false, joined: Date.now() });
        
        socket.join(partyId);
        socket.partyId = partyId;
        socket.userName = userName;
        socket.isHost = false;

        // Send party state to new user
        socket.emit('party-joined', party);

        // Notify others
        socket.to(partyId).emit('user-joined', { 
            userName: userName,
            users: party.users,
            userCount: party.users.length
        });

        console.log(`👤 ${userName} joined party: ${partyId}`);
    });

    // Leave Party
    socket.on('leave-party', () => {
        if (!socket.partyId) return;

        const party = parties.get(socket.partyId);
        if (!party) return;

        // Remove user
        party.users = party.users.filter(u => u.socketId !== socket.id);

        // Notify others
        socket.to(socket.partyId).emit('user-left', { 
            userName: socket.userName,
            users: party.users,
            userCount: party.users.length
        });

        // If no users left, delete party
        if (party.users.length === 0) {
            parties.delete(socket.partyId);
            console.log(`🗑️  Party deleted: ${socket.partyId} (no users)`);
        }
        // If host left, transfer to next user
        else if (socket.isHost && party.users.length > 0) {
            party.users[0].isHost = true;
            party.hostSocketId = party.users[0].socketId;
            party.host = party.users[0].name;
            
            io.to(party.users[0].socketId).emit('promoted-to-host');
            socket.to(socket.partyId).emit('new-host', { 
                hostName: party.host,
                users: party.users
            });
            
            console.log(`👑 ${party.host} is now host of ${socket.partyId}`);
        }

        socket.leave(socket.partyId);
        console.log(`👋 ${socket.userName} left party: ${socket.partyId}`);
    });

    // Host Sync (Host broadcasts video state)
    socket.on('host-sync', (data) => {
        if (!socket.partyId || !socket.isHost) return;

        const party = parties.get(socket.partyId);
        if (!party) return;

        // Update party state
        party.videoUrl = data.videoUrl;
        party.currentTime = data.currentTime;
        party.paused = data.paused;

        // Broadcast to all guests
        socket.to(socket.partyId).emit('sync-state', {
            videoUrl: data.videoUrl,
            currentTime: data.currentTime,
            paused: data.paused
        });
    });

    // Request sync (Guest requests current state)
    socket.on('request-sync', () => {
        if (!socket.partyId) return;

        const party = parties.get(socket.partyId);
        if (!party) return;

        socket.emit('sync-state', {
            videoUrl: party.videoUrl,
            currentTime: party.currentTime,
            paused: party.paused
        });
    });

    // Chat Message
    socket.on('chat-message', (data) => {
        if (!socket.partyId) return;

        const party = parties.get(socket.partyId);
        if (!party) return;

        const message = {
            author: socket.userName,
            text: data.text,
            time: new Date().toLocaleTimeString(),
            timestamp: Date.now(),
            isReaction: data.isReaction || false
        };

        party.messages.push(message);

        // Broadcast to all in party
        io.to(socket.partyId).emit('chat-message', message);
    });

    // Reaction
    socket.on('reaction', (data) => {
        if (!socket.partyId) return;

        // Broadcast reaction to all in party
        io.to(socket.partyId).emit('reaction', {
            userName: socket.userName,
            emoji: data.emoji,
            x: data.x,
            y: data.y
        });
    });

    // Get Active Parties
    socket.on('get-active-parties', () => {
        const activeParties = Array.from(parties.values()).map(party => ({
            id: party.id,
            name: party.name,
            host: party.host,
            userCount: party.users.length,
            hasPassword: !!party.password,
            created: party.created
        }));

        socket.emit('active-parties', activeParties);
    });

    // Voice Chat Events
    socket.on('voice-join', (data) => {
        console.log(`🎙️ ${data.userName} joined voice in party: ${data.partyId}`);
        
        // Notify all users in the party
        socket.to(data.partyId).emit('voice-user-joined', {
            userName: data.userName,
            socketId: socket.id
        });
    });

    socket.on('voice-leave', (data) => {
        console.log(`🎙️ ${data.userName} left voice in party: ${data.partyId}`);
        
        socket.to(data.partyId).emit('voice-user-left', {
            userName: data.userName
        });
    });

    socket.on('voice-speaking', (data) => {
        // Broadcast speaking indicator to all in party
        socket.to(data.partyId).emit('voice-speaking', {
            userName: data.userName,
            speaking: data.speaking
        });
    });

    // WebRTC Signaling
    socket.on('webrtc-offer', (data) => {
        console.log(`🔗 WebRTC offer from ${socket.userName} to ${data.to}`);
        
        // Find the target user's socket in the party
        const party = parties.get(data.partyId);
        if (party) {
            const targetUser = party.users.find(u => u.name === data.to);
            if (targetUser) {
                io.to(targetUser.socketId).emit('webrtc-offer', {
                    from: socket.userName,
                    offer: data.offer
                });
            }
        }
    });

    socket.on('webrtc-answer', (data) => {
        console.log(`🔗 WebRTC answer from ${socket.userName} to ${data.to}`);
        
        const party = parties.get(data.partyId);
        if (party) {
            const targetUser = party.users.find(u => u.name === data.to);
            if (targetUser) {
                io.to(targetUser.socketId).emit('webrtc-answer', {
                    from: socket.userName,
                    answer: data.answer
                });
            }
        }
    });

    socket.on('webrtc-ice-candidate', (data) => {
        const party = parties.get(data.partyId);
        if (party) {
            const targetUser = party.users.find(u => u.name === data.to);
            if (targetUser) {
                io.to(targetUser.socketId).emit('webrtc-ice-candidate', {
                    from: socket.userName,
                    candidate: data.candidate
                });
            }
        }
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log('👋 User disconnected:', socket.id);

        if (socket.partyId) {
            const party = parties.get(socket.partyId);
            if (party) {
                // Remove user
                party.users = party.users.filter(u => u.socketId !== socket.id);

                // Notify others
                socket.to(socket.partyId).emit('user-left', { 
                    userName: socket.userName,
                    users: party.users,
                    userCount: party.users.length
                });

                // If no users left, delete party
                if (party.users.length === 0) {
                    parties.delete(socket.partyId);
                    console.log(`🗑️  Party deleted: ${socket.partyId} (no users)`);
                }
                // If host left, transfer to next user
                else if (socket.isHost && party.users.length > 0) {
                    party.users[0].isHost = true;
                    party.hostSocketId = party.users[0].socketId;
                    party.host = party.users[0].name;
                    
                    io.to(party.users[0].socketId).emit('promoted-to-host');
                    socket.to(socket.partyId).emit('new-host', { 
                        hostName: party.host,
                        users: party.users
                    });
                    
                    console.log(`👑 ${party.host} is now host of ${socket.partyId}`);
                }
            }
        }
    });
});

server.listen(PORT, () => {
    console.log('');
    console.log('🎃========================================🎃');
    console.log('🎬  LX4T Video Player WebSocket Server  🎬');
    console.log('🎃========================================🎃');
    console.log('');
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🔌 WebSocket ready for connections`);
    console.log('');
    console.log('📊 Features:');
    console.log('  • Real-time video sync');
    console.log('  • Live chat');
    console.log('  • User presence');
    console.log('  • Emoji reactions');
    console.log('  • Auto party cleanup (24h)');
    console.log('');
    console.log('🎯 Ready for movie nights!');
    console.log('');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

