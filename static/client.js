// WebSocket Connection
const socket = io();

// DOM Elements
const statusBar = document.getElementById('statusBar');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const languageSelect = document.getElementById('languageSelect');
const announcementDisplay = document.getElementById('announcementDisplay');
const allLanguages = document.getElementById('allLanguages');
const languagesList = document.getElementById('languagesList');
const recentAnnouncements = document.getElementById('recentAnnouncements');
const recentList = document.getElementById('recentList');
const audioPlayer = document.getElementById('audioPlayer');
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');
const soundText = document.getElementById('soundText');

// State
let soundEnabled = true;
let currentAnnouncements = [];
let recentAnnouncementsList = [];

// Connection Status
socket.on('connect', () => {
    console.log('✅ Connected to PA System');
    statusBar.classList.add('connected');
    statusIndicator.textContent = '🟢';
    statusText.textContent = 'Connected - Waiting for announcements';
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from PA System');
    statusBar.classList.remove('connected');
    statusBar.classList.add('disconnected');
    statusIndicator.textContent = '🔴';
    statusText.textContent = 'Disconnected - Reconnecting...';
});

socket.on('connection_status', (data) => {
    console.log('Connection status:', data);
});

// Receive New Announcement
socket.on('new_announcement', (data) => {
    console.log('📢 New announcement received:', data);
    
    currentAnnouncements = data.announcements;
    
    // Display announcement in preferred language
    displayAnnouncement(data);
    
    // Show all languages
    displayAllLanguages(data.announcements);
    
    // Add to recent list
    addToRecentList(data);
    
    // Play audio
    if (soundEnabled) {
        playAnnouncementAudio(data.announcements);
    }
    
    // Update status
    const replayText = data.is_replay ? ' (Replay)' : '';
    statusText.textContent = `Connected - Last update: ${data.timestamp}${replayText}`;
});

// Display Announcement
function displayAnnouncement(data) {
    const preferredLang = languageSelect.value;
    const announcement = data.announcements.find(a => a.language === preferredLang) 
                        || data.announcements[0];
    
    const priorityClass = data.priority;
    const priorityText = getPriorityText(data.priority);
    
    announcementDisplay.innerHTML = `
        <div class="announcement-box ${priorityClass}">
            <div class="announcement-priority">${priorityText}</div>
            <div class="announcement-text">${announcement.text}</div>
            <div class="announcement-lang">
                ${announcement.flag} ${announcement.language_name}
            </div>
        </div>
    `;
}

// Display All Languages
function displayAllLanguages(announcements) {
    languagesList.innerHTML = announcements.map(ann => `
        <div class="language-item">
            <strong>${ann.flag} ${ann.language_name}:</strong>
            <span>${ann.text}</span>
        </div>
    `).join('');
    
    allLanguages.style.display = 'block';
}

// Add to Recent List
function addToRecentList(data) {
    const announcement = data.announcements[0];
    
    recentAnnouncementsList.unshift({
        timestamp: data.timestamp,
        priority: data.priority,
        text: announcement.text,
        languages: data.announcements.length
    });
    
    // Keep only last 5
    if (recentAnnouncementsList.length > 5) {
        recentAnnouncementsList.pop();
    }
    
    // Update display
    recentList.innerHTML = recentAnnouncementsList.map(item => `
        <div class="language-item">
            <strong>${item.timestamp}:</strong>
            <span>${item.text.substring(0, 50)}...</span>
            <span class="priority-badge ${item.priority}">${getPriorityEmoji(item.priority)}</span>
        </div>
    `).join('');
    
    recentAnnouncements.style.display = 'block';
}

// Play Audio
function playAnnouncementAudio(announcements) {
    const preferredLang = languageSelect.value;
    const announcement = announcements.find(a => a.language === preferredLang) 
                        || announcements[0];
    
    if (announcement.audio_url) {
        audioPlayer.src = announcement.audio_url;
        audioPlayer.play()
            .then(() => console.log('🔊 Playing audio:', announcement.audio_url))
            .catch(err => {
                console.error('❌ Audio playback failed:', err);
                console.log('💡 User interaction may be required to enable audio');
            });
    }
}

// Language Change Handler
languageSelect.addEventListener('change', () => {
    if (currentAnnouncements.length > 0) {
        displayAnnouncement({
            announcements: currentAnnouncements,
            priority: document.querySelector('.announcement-box').classList[1],
            timestamp: new Date().toLocaleTimeString()
        });
    }
});

// Sound Toggle
function toggleSound() {
    soundEnabled = !soundEnabled;
    
    if (soundEnabled) {
        soundIcon.textContent = '🔊';
        soundText.textContent = 'Sound On';
        soundToggle.classList.remove('muted');
    } else {
        soundIcon.textContent = '🔇';
        soundText.textContent = 'Sound Off';
        soundToggle.classList.add('muted');
        audioPlayer.pause();
    }
    
    console.log('Sound', soundEnabled ? 'enabled' : 'disabled');
}

// Helper Functions
function getPriorityText(priority) {
    const priorities = {
        'normal': '🟢 NORMAL ANNOUNCEMENT',
        'warning': '🟡 WARNING',
        'emergency': '🔴 EMERGENCY ALERT'
    };
    return priorities[priority] || '📢 ANNOUNCEMENT';
}

function getPriorityEmoji(priority) {
    const emojis = {
        'normal': '🟢',
        'warning': '🟡',
        'emergency': '🔴'
    };
    return emojis[priority] || '📢';
}

// Enable audio on first user interaction
document.addEventListener('click', () => {
    if (audioPlayer.paused && audioPlayer.src) {
        audioPlayer.play().catch(() => {});
    }
}, { once: true });

// Notification Permission (for future enhancement)
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
    });
}

console.log('📱 Client Display Loaded');
