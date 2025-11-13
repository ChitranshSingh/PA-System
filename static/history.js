// WebSocket Connection
const socket = io();

// DOM Elements
const historyList = document.getElementById('historyList');
const audioPlayer = document.getElementById('audioPlayer');

// Refresh History
function refreshHistory() {
    fetch('/api/history')
        .then(response => response.json())
        .then(data => {
            displayHistory(data);
        })
        .catch(err => {
            console.error('Failed to load history:', err);
            alert('❌ Failed to refresh history');
        });
}

// Display History
function displayHistory(history) {
    if (history.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <h3>No Announcements Yet</h3>
                <p>Broadcast your first announcement from the Admin Dashboard</p>
                <a href="/admin" class="btn btn-primary">Go to Admin</a>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = history.map(item => {
        const priorityClass = item.priority;
        const priorityText = getPriorityText(item.priority);
        
        const announcementsHtml = item.announcements.map(ann => `
            <div class="lang-detail">
                <strong>${ann.flag} ${ann.language_name}:</strong>
                <span>${ann.text}</span>
                ${ann.audio_url ? `
                    <button onclick="playAudio('${ann.audio_url}')" class="btn-play">
                        🔊 Play
                    </button>
                ` : ''}
            </div>
        `).join('');
        
        const languagesHtml = item.languages.map(lang => `
            <span class="lang-tag">${lang.toUpperCase()}</span>
        `).join('');
        
        return `
            <div class="history-item" data-id="${item.id}">
                <div class="history-header">
                    <div class="history-info">
                        <span class="priority-badge ${priorityClass}">${priorityText}</span>
                        <span class="history-time">${item.timestamp}</span>
                    </div>
                    <button onclick="replayAnnouncement(${item.id})" class="btn-replay">
                        ▶️ Replay
                    </button>
                </div>
                <div class="history-text">${item.original_text}</div>
                <div class="history-languages">
                    <strong>Languages:</strong>
                    ${languagesHtml}
                </div>
                <div class="history-details">
                    ${announcementsHtml}
                </div>
            </div>
        `;
    }).join('');
}

// Replay Announcement
function replayAnnouncement(id) {
    console.log('🔄 Replaying announcement:', id);
    
    socket.emit('replay_announcement', { id: id });
    
    // Show confirmation
    const item = document.querySelector(`[data-id="${id}"]`);
    const originalBg = item.style.backgroundColor;
    item.style.backgroundColor = '#d4edda';
    
    setTimeout(() => {
        item.style.backgroundColor = originalBg;
    }, 1000);
    
    alert('✅ Announcement replayed to all connected clients');
}

// Play Audio
function playAudio(audioUrl) {
    console.log('🔊 Playing audio:', audioUrl);
    
    audioPlayer.src = audioUrl;
    audioPlayer.play()
        .then(() => console.log('Audio playing'))
        .catch(err => {
            console.error('Audio playback failed:', err);
            alert('❌ Failed to play audio');
        });
}

// Clear History
function clearHistory() {
    if (confirm('⚠️ Are you sure you want to clear all announcement history? This will delete all records and audio files.')) {
        fetch('/api/clear-history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('✅ ' + data.message);
                location.reload();
            } else {
                alert('❌ Failed to clear history');
            }
        })
        .catch(err => {
            console.error('Failed to clear history:', err);
            alert('❌ Failed to clear history. Please ensure you are logged in as admin.');
        });
    }
}

// Helper Function
function getPriorityText(priority) {
    const priorities = {
        'normal': '🟢 NORMAL',
        'warning': '🟡 WARNING',
        'emergency': '🔴 EMERGENCY'
    };
    return priorities[priority] || '📢 ANNOUNCEMENT';
}

// Listen for new announcements
socket.on('new_announcement', (data) => {
    console.log('📢 New announcement added to history');
    // Auto-refresh history
    setTimeout(refreshHistory, 1000);
});

// Connection Status
socket.on('connect', () => {
    console.log('✅ Connected to PA System');
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from PA System');
});

console.log('📜 History Page Loaded');
