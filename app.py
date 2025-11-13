from flask import Flask, render_template, request, jsonify, send_from_directory, redirect, url_for, flash, session
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from deep_translator import GoogleTranslator
from gtts import gTTS
import os
import json
from datetime import datetime
import qrcode
import socket

app = Flask(__name__)
app.config['SECRET_KEY'] = 'pa-system-secret-key-2025-change-in-production'
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.login_message = 'Please login to access the admin dashboard.'

# Simple User class (In production, use a database)
class User(UserMixin):
    def __init__(self, id, username, password_hash):
        self.id = id
        self.username = username
        self.password_hash = password_hash

# Default admin credentials (In production, store in database)
# Default username: admin, password: admin123
users = {
    'admin': User('1', 'admin', generate_password_hash('admin123'))
}

@login_manager.user_loader
def load_user(user_id):
    for user in users.values():
        if user.id == user_id:
            return user
    return None

# Ensure directories exist
os.makedirs('static/audio', exist_ok=True)
os.makedirs('static/qr', exist_ok=True)

# Store announcement history
announcement_history = []

# Language configuration
LANGUAGES = {
    'en': {'name': 'English', 'flag': '🇬🇧'},
    'hi': {'name': 'हिन्दी (Hindi)', 'flag': '🇮🇳'},
    'es': {'name': 'Español (Spanish)', 'flag': '🇪🇸'},
    'fr': {'name': 'Français (French)', 'flag': '🇫🇷'},
    'ta': {'name': 'தமிழ் (Tamil)', 'flag': '🇮🇳'}
}

def get_base_url():
    """Get the base URL for the application (detects production vs local)"""
    # Check if running on Render or other cloud platforms
    render_external_url = os.environ.get('RENDER_EXTERNAL_URL')
    if render_external_url:
        return render_external_url
    
    # Check for Railway
    railway_url = os.environ.get('RAILWAY_PUBLIC_DOMAIN')
    if railway_url:
        return f"https://{railway_url}"
    
    # Check for Heroku
    heroku_app_name = os.environ.get('HEROKU_APP_NAME')
    if heroku_app_name:
        return f"https://{heroku_app_name}.herokuapp.com"
    
    # For local development, try to get local IP
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return f"http://{local_ip}:5000"
    except Exception:
        return "http://localhost:5000"

def generate_qr_code():
    """Generate QR code for client access"""
    base_url = get_base_url()
    client_url = f"{base_url}/client"
    
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(client_url)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    qr_path = 'static/qr/client_access.png'
    img.save(qr_path)
    
    return client_url, qr_path

# Authentication Routes
@app.route('/login', methods=['GET', 'POST'])
def login():
    """Login page for admin access"""
    if current_user.is_authenticated:
        return redirect(url_for('admin'))
    
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = users.get(username)
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            next_page = request.args.get('next')
            return redirect(next_page or url_for('admin'))
        else:
            flash('Invalid username or password', 'error')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    """Logout current user"""
    logout_user()
    flash('You have been logged out successfully', 'success')
    return redirect(url_for('index'))

# Routes
@app.route('/')
def index():
    """Home page - redirects to admin"""
    return render_template('index.html')

@app.route('/admin')
@login_required
def admin():
    """Admin dashboard for broadcasting announcements (Protected)"""
    client_url, qr_path = generate_qr_code()
    return render_template('admin.html', 
                         languages=LANGUAGES, 
                         client_url=client_url,
                         qr_path=qr_path,
                         username=current_user.username)

@app.route('/client')
def client():
    """Client display for receiving announcements"""
    return render_template('client.html', languages=LANGUAGES)

@app.route('/history')
def history():
    """View announcement history"""
    return render_template('history.html', history=announcement_history)

@app.route('/api/history')
def api_history():
    """API endpoint for announcement history"""
    return jsonify(announcement_history)

@app.route('/api/clear-history', methods=['POST'])
@login_required
def clear_history():
    """Clear all announcement history (Admin only)"""
    global announcement_history
    announcement_history = []
    
    # Optionally clear audio files to save space
    try:
        audio_dir = 'static/audio'
        for filename in os.listdir(audio_dir):
            if filename.endswith('.mp3'):
                file_path = os.path.join(audio_dir, filename)
                os.remove(file_path)
        print('🗑️ Cleared announcement history and audio files')
    except Exception as e:
        print(f'⚠️ Could not clear audio files: {e}')
    
    return jsonify({'success': True, 'message': 'History cleared successfully'})

# WebSocket Event Handlers
@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    print('✅ Client connected:', request.sid)
    emit('connection_status', {
        'status': 'connected',
        'message': 'Connected to PA System',
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    print('❌ Client disconnected:', request.sid)

@socketio.on('broadcast_announcement')
def handle_broadcast(data):
    """
    Main broadcast handler
    Receives announcement, translates, generates audio, and broadcasts to all clients
    """
    text = data.get('text', '').strip()
    priority = data.get('priority', 'normal')
    target_languages = data.get('languages', ['en'])
    
    if not text:
        emit('error', {'message': 'Announcement text cannot be empty'})
        return
    
    print(f"\n{'='*60}")
    print(f"📢 NEW ANNOUNCEMENT")
    print(f"{'='*60}")
    print(f"Text: {text}")
    print(f"Priority: {priority.upper()}")
    print(f"Languages: {', '.join(target_languages)}")
    print(f"{'='*60}\n")
    
    announcements = []
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    # Process each language
    for lang in target_languages:
        try:
            print(f"Processing {LANGUAGES[lang]['name']}...")
            
            # Step 1: Translate text
            if lang == 'en':
                translated_text = text
            else:
                translator = GoogleTranslator(source='auto', target=lang)
                translated_text = translator.translate(text)
            
            print(f"  ✓ Translated: {translated_text}")
            
            # Step 2: Generate audio
            tts = gTTS(translated_text, lang=lang, slow=False)
            audio_filename = f'audio/announcement_{lang}_{int(datetime.now().timestamp())}.mp3'
            audio_path = os.path.join('static', audio_filename)
            tts.save(audio_path)
            
            print(f"  ✓ Audio saved: {audio_filename}")
            
            # Step 3: Prepare announcement data
            announcements.append({
                'language': lang,
                'language_name': LANGUAGES[lang]['name'],
                'flag': LANGUAGES[lang]['flag'],
                'text': translated_text,
                'original': text,
                'audio_url': f'/static/{audio_filename}',
                'priority': priority
            })
            
        except Exception as e:
            print(f"  ✗ Error processing {lang}: {str(e)}")
            # Add fallback with original text
            announcements.append({
                'language': lang,
                'language_name': LANGUAGES[lang]['name'],
                'flag': LANGUAGES[lang]['flag'],
                'text': text,
                'original': text,
                'audio_url': None,
                'priority': priority,
                'error': str(e)
            })
    
    # Create announcement record for history
    announcement_record = {
        'id': len(announcement_history) + 1,
        'timestamp': timestamp,
        'original_text': text,
        'priority': priority,
        'languages': target_languages,
        'announcements': announcements
    }
    
    # Store in history (keep last 50)
    announcement_history.insert(0, announcement_record)
    if len(announcement_history) > 50:
        announcement_history.pop()
    
    # Step 4: Broadcast to all connected clients
    broadcast_data = {
        'timestamp': timestamp,
        'priority': priority,
        'announcements': announcements
    }
    
    emit('new_announcement', broadcast_data, broadcast=True)
    
    print(f"\n✅ Broadcast complete to all clients\n")
    
    # Send confirmation to admin
    emit('broadcast_success', {
        'message': f'Announcement broadcasted to {len(announcements)} languages',
        'timestamp': timestamp
    })

@socketio.on('replay_announcement')
def handle_replay(data):
    """Replay a specific announcement from history"""
    announcement_id = data.get('id')
    
    for announcement in announcement_history:
        if announcement['id'] == announcement_id:
            emit('new_announcement', {
                'timestamp': announcement['timestamp'],
                'priority': announcement['priority'],
                'announcements': announcement['announcements'],
                'is_replay': True
            }, broadcast=True)
            print(f"🔄 Replayed announcement #{announcement_id}")
            return
    
    emit('error', {'message': 'Announcement not found'})

# Static file serving
@app.route('/static/<path:filename>')
def serve_static(filename):
    """Serve static files (audio, images)"""
    return send_from_directory('static', filename)

if __name__ == '__main__':
    import sys
    import io
    
    # Fix encoding for Windows console
    if sys.platform == 'win32':
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    
    print("\n" + "="*60)
    print("🚀 MULTI-LANGUAGE PA SYSTEM")
    print("="*60)
    print(f"📡 Server: http://localhost:5000")
    print(f"👤 Admin Dashboard: http://localhost:5000/admin")
    print(f"📱 Client Display: http://localhost:5000/client")
    print(f"📜 History: http://localhost:5000/history")
    print("\n🌐 Available Languages:")
    for code, lang in LANGUAGES.items():
        print(f"   {lang['flag']} {code.upper()} - {lang['name']}")
    print("\n⚠️  Priority Levels:")
    print("   🟢 Normal - Standard announcements")
    print("   🟡 Warning - Important notices")
    print("   🔴 Emergency - Critical alerts")
    print("="*60 + "\n")
    
    # Generate QR code on startup
    try:
        client_url, _ = generate_qr_code()
        print(f"📱 Mobile Access: {client_url}")
        print(f"📷 QR Code generated at: static/qr/client_access.png\n")
    except Exception as e:
        print(f"Warning: Could not generate QR code: {e}\n")
    
    print("Starting server... Press Ctrl+C to stop\n")
    socketio.run(app, debug=True, host='0.0.0.0', port=5000, allow_unsafe_werkzeug=True)
