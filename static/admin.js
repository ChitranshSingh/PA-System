// WebSocket Connection
const socket = io();

// DOM Elements
const announcementText = document.getElementById('announcementText');
const charCount = document.getElementById('charCount');
const langCount = document.getElementById('langCount');
const broadcastBtn = document.getElementById('broadcastBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const statusBar = document.getElementById('statusBar');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const totalBroadcasts = document.getElementById('totalBroadcasts');
const lastBroadcast = document.getElementById('lastBroadcast');

// Stats
let broadcastCount = 0;

// Connection Status
socket.on('connect', () => {
    console.log('✅ Connected to PA System');
    statusBar.classList.add('connected');
    statusIndicator.textContent = '🟢';
    statusText.textContent = 'Connected';
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from PA System');
    statusBar.classList.remove('connected');
    statusBar.classList.add('disconnected');
    statusIndicator.textContent = '🔴';
    statusText.textContent = 'Disconnected';
});

socket.on('connection_status', (data) => {
    console.log('Connection status:', data);
});

// Character Counter
announcementText.addEventListener('input', () => {
    const count = announcementText.value.length;
    charCount.textContent = count;
    
    if (count > 500) {
        charCount.style.color = '#dc3545';
    } else {
        charCount.style.color = '#666';
    }
});

// Language Counter
document.querySelectorAll('input[name="language"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateLanguageCount);
});

function updateLanguageCount() {
    const checked = document.querySelectorAll('input[name="language"]:checked').length;
    langCount.textContent = checked;
}

// Broadcast Announcement
broadcastBtn.addEventListener('click', () => {
    const text = announcementText.value.trim();
    
    if (!text) {
        showError('Please enter an announcement text');
        return;
    }
    
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const languages = Array.from(document.querySelectorAll('input[name="language"]:checked'))
        .map(cb => cb.value);
    
    if (languages.length === 0) {
        showError('Please select at least one language');
        return;
    }
    
    // Disable button during broadcast
    broadcastBtn.disabled = true;
    broadcastBtn.innerHTML = '<span class="btn-icon">⏳</span><span>Broadcasting...</span>';
    
    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Emit broadcast event
    socket.emit('broadcast_announcement', {
        text: text,
        priority: priority,
        languages: languages
    });
    
    console.log('📢 Broadcasting:', { text, priority, languages });
});

// Broadcast Success
socket.on('broadcast_success', (data) => {
    console.log('✅ Broadcast successful:', data);
    
    // Show success message
    successMessage.style.display = 'block';
    
    // Update stats
    broadcastCount++;
    totalBroadcasts.textContent = broadcastCount;
    lastBroadcast.textContent = new Date().toLocaleTimeString();
    
    // Clear form
    announcementText.value = '';
    charCount.textContent = '0';
    
    // Re-enable button
    broadcastBtn.disabled = false;
    broadcastBtn.innerHTML = '<span class="btn-icon">📢</span><span>Broadcast Announcement</span>';
    
    // Hide success message after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
});

// Error Handling
socket.on('error', (data) => {
    console.error('❌ Error:', data);
    showError(data.message);
    
    // Re-enable button
    broadcastBtn.disabled = false;
    broadcastBtn.innerHTML = '<span class="btn-icon">📢</span><span>Broadcast Announcement</span>';
});

function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'block';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Copy URL Function
function copyUrl() {
    const url = document.getElementById('clientUrl').textContent;
    navigator.clipboard.writeText(url).then(() => {
        alert('✅ URL copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('❌ Failed to copy URL');
    });
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter to broadcast
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        broadcastBtn.click();
    }
});

// Auto-save draft to localStorage
announcementText.addEventListener('input', () => {
    localStorage.setItem('draft_announcement', announcementText.value);
});

// Load draft on page load
window.addEventListener('load', () => {
    const draft = localStorage.getItem('draft_announcement');
    if (draft) {
        announcementText.value = draft;
        charCount.textContent = draft.length;
    }
});

console.log('📡 Admin Dashboard Loaded');
