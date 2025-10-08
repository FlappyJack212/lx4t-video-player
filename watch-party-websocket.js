// WebSocket Watch Party Functions - Replace in script.js
// Copy these functions to replace the old localStorage-based ones

// Toggle party container
partyToggle.addEventListener('click', () => {
    partyContainer.classList.toggle('hidden');
    if (!socket) {
        initializeSocket();
    }
    socket.emit('get-active-parties');
});

// Create Party
createPartyBtn.addEventListener('click', () => {
    const name = document.getElementById('partyName').value.trim();
    const hostName = document.getElementById('hostName').value.trim() || 'Anonymous';
    const password = document.getElementById('partyPassword').value;
    
    if (!name) {
        alert('Please enter a party name!');
        return;
    }
    
    if (!socket) {
        initializeSocket();
    }
    
    const partyId = generatePartyId();
    
    socket.emit('create-party', {
        partyId: partyId,
        partyName: name,
        hostName: hostName,
        password: password,
        videoUrl: video.src,
        currentTime: video.currentTime,
        paused: video.paused
    });
});

// Join Party
joinPartyBtn.addEventListener('click', () => {
    const partyId = document.getElementById('joinPartyId').value.trim();
    const userName = document.getElementById('joinName').value.trim() || 'Anonymous';
    const password = document.getElementById('joinPassword').value;
    
    if (!partyId) {
        alert('Please enter a Party ID!');
        return;
    }
    
    if (!socket) {
        initializeSocket();
    }
    
    socket.userName = userName;
    
    socket.emit('join-party', {
        partyId: partyId,
        userName: userName,
        password: password
    });
});

// Leave Party
leavePartyBtn.addEventListener('click', () => {
    leaveParty();
});

function leaveParty() {
    if (!watchParty.active) return;
    
    if (socket) {
        socket.emit('leave-party');
    }
    
    stopHostSync();
    
    watchParty = {
        active: false,
        isHost: false,
        partyId: null,
        partyName: null,
        userName: null,
        users: [],
        lastSync: 0
    };
    
    partyCreate.classList.remove('hidden');
    partyRoom.classList.add('hidden');
}

// Copy Party ID
copyIdBtn.addEventListener('click', () => {
    if (watchParty.partyId) {
        navigator.clipboard.writeText(watchParty.partyId);
        copyIdBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyIdBtn.textContent = '📋';
        }, 2000);
    }
});

// Send Chat Message
function sendChatMessage() {
    const message = partyChatInput.value.trim();
    if (!message || !watchParty.active) return;
    
    socket.emit('chat-message', {
        text: message,
        isReaction: false
    });
    
    partyChatInput.value = '';
}

sendChatBtn.addEventListener('click', sendChatMessage);
partyChatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

// Reaction buttons
document.querySelectorAll('.reaction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const emoji = btn.getAttribute('data-emoji');
        sendReaction(emoji);
    });
});

function sendReaction(emoji) {
    if (!watchParty.active) return;
    
    const x = Math.random() * 80 + 10;
    const y = 80;
    
    // Show locally
    showFloatingReaction(emoji, x, y);
    
    // Broadcast to others
    socket.emit('reaction', { emoji, x, y });
    
    // Send as chat message
    socket.emit('chat-message', {
        text: `reacted with ${emoji}`,
        isReaction: true
    });
}

function showFloatingReaction(emoji, x, y) {
    const reaction = document.createElement('div');
    reaction.className = 'floating-reaction';
    reaction.textContent = emoji;
    reaction.style.left = x + '%';
    reaction.style.top = y + '%';
    document.body.appendChild(reaction);
    
    setTimeout(() => reaction.remove(), 3000);
}

// Helper Functions
function generatePartyId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function showPartyRoom() {
    partyCreate.classList.add('hidden');
    partyRoom.classList.remove('hidden');
    
    currentPartyId.textContent = watchParty.partyId;
    
    if (watchParty.isHost) {
        hostControls.classList.remove('hidden');
        guestNotice.classList.add('hidden');
    } else {
        hostControls.classList.add('hidden');
        guestNotice.classList.remove('hidden');
    }
    
    renderUsers();
}

// Host Sync - Broadcast video state every 2 seconds
function startHostSync() {
    if (!watchParty.isHost) return;
    
    stopHostSync();
    
    syncInterval = setInterval(() => {
        if (!watchParty.active || !watchParty.isHost) {
            stopHostSync();
            return;
        }
        
        socket.emit('host-sync', {
            videoUrl: video.src,
            currentTime: video.currentTime,
            paused: video.paused
        });
    }, 2000);
}

function stopHostSync() {
    if (syncInterval) {
        clearInterval(syncInterval);
        syncInterval = null;
    }
}

function updatePartyStatus(party) {
    const userCount = party.users.length;
    document.getElementById('partyUserCount').textContent = `👥 ${userCount} viewer${userCount !== 1 ? 's' : ''}`;
    document.getElementById('viewerCount').textContent = userCount;
}

function renderUsers() {
    if (!watchParty.active) return;
    
    usersList.innerHTML = '';
    
    watchParty.users.forEach(user => {
        const avatar = document.createElement('div');
        avatar.className = `user-avatar ${user.isHost ? 'host' : ''}`;
        avatar.textContent = user.name.charAt(0).toUpperCase();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'user-name-tooltip';
        tooltip.textContent = user.name + (user.isHost ? ' 👑' : '');
        avatar.appendChild(tooltip);
        
        usersList.appendChild(avatar);
    });
}

function addChatMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message';
    
    if (message.isReaction) {
        messageEl.innerHTML = `
            <div class="chat-message-text" style="font-style: italic; opacity: 0.8;">
                ${message.author} ${message.text}
            </div>
            <div class="chat-message-time">${message.time}</div>
        `;
    } else {
        messageEl.innerHTML = `
            <div class="chat-message-author">${message.author}</div>
            <div class="chat-message-text">${message.text}</div>
            <div class="chat-message-time">${message.time}</div>
        `;
    }
    
    partyChatMessages.appendChild(messageEl);
    partyChatMessages.scrollTop = partyChatMessages.scrollHeight;
}

function showChatNotification(text) {
    const notification = {
        author: 'System',
        text: text,
        time: new Date().toLocaleTimeString(),
        isReaction: true
    };
    addChatMessage(notification);
}

function renderActivePartiesWebSocket(parties) {
    activePartiesList.innerHTML = '';
    
    if (parties.length === 0) {
        activePartiesList.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center;">No active parties</p>';
        return;
    }
    
    parties.forEach(party => {
        const item = document.createElement('div');
        item.className = 'party-item';
        item.innerHTML = `
            <div class="party-item-info">
                <div class="party-item-name">${party.name}</div>
                <div class="party-item-meta">
                    Host: ${party.host} • ${party.userCount} viewer${party.userCount !== 1 ? 's' : ''}
                    ${party.hasPassword ? ' 🔒' : ''}
                </div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            document.getElementById('joinPartyId').value = party.id;
        });
        
        activePartiesList.appendChild(item);
    });
}

// Auto-refresh active parties
setInterval(() => {
    if (socket && socket.connected && partyContainer && !partyContainer.classList.contains('hidden')) {
        socket.emit('get-active-parties');
    }
}, 5000);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (watchParty.active && socket) {
        socket.emit('leave-party');
    }
});

