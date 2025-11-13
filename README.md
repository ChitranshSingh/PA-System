# 🔊 Multi-Language PA System

An innovative Public Announcement System that broadcasts messages in multiple languages simultaneously with real-time text-to-speech audio generation.

## ✨ Features

### Core Features
- 🌍 **Multi-Language Support** - Broadcast in 5 languages (English, Hindi, Spanish, French, Tamil)
- 🔊 **Text-to-Speech** - Automatic audio generation using Google TTS
- ⚡ **Real-Time Broadcasting** - WebSocket-based instant delivery to all clients
- 🚨 **Priority Levels** - Normal, Warning, and Emergency modes with visual alerts
- 📱 **Mobile Responsive** - Works on all devices (desktop, tablet, mobile)

### Innovative Features
- 📷 **QR Code Access** - Generate QR code for instant client access
- 📜 **Announcement History** - View and replay past announcements
- 🔄 **Replay Functionality** - Re-broadcast previous announcements
- 🎨 **Visual Emergency Alerts** - Blinking animations for emergency broadcasts
- 💾 **Auto-Save Drafts** - Automatically saves admin drafts in browser
- ⌨️ **Keyboard Shortcuts** - Ctrl+Enter to broadcast quickly

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Clone or Download the Project**
```bash
cd pa-system
```

2. **Create Virtual Environment** (Recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Install Dependencies**
```bash
pip install -r requirements.txt
```

### Running the Application

```bash
python app.py
```

The server will start at `http://localhost:5000`

### Access Points

- **Home Page**: http://localhost:5000
- **Admin Dashboard**: http://localhost:5000/admin
- **Client Display**: http://localhost:5000/client
- **History**: http://localhost:5000/history

## 📖 How to Use

### For Administrators

1. Open the **Admin Dashboard** at `/admin`
2. Type your announcement in the text box
3. Select priority level (Normal/Warning/Emergency)
4. Choose target languages
5. Click "Broadcast Announcement"
6. Share the QR code or URL with clients

### For Clients

1. Open the **Client Display** at `/client` or scan QR code
2. Select your preferred language
3. Wait for announcements
4. Audio will play automatically (ensure sound is enabled)

### Managing History

1. Visit the **History** page at `/history`
2. View all past announcements
3. Click "Replay" to re-broadcast any announcement
4. Click "Play" to listen to specific language audio

## 🏗️ Project Structure

```
pa-system/
├── app.py                      # Main Flask application
├── requirements.txt            # Python dependencies
├── README.md                   # This file
│
├── templates/                  # HTML templates
│   ├── index.html             # Home page
│   ├── admin.html             # Admin dashboard
│   ├── client.html            # Client display
│   └── history.html           # Announcement history
│
├── static/                     # Static files
│   ├── style.css              # Main stylesheet
│   ├── admin.js               # Admin functionality
│   ├── client.js              # Client functionality
│   ├── history.js             # History functionality
│   ├── audio/                 # Generated audio files (auto-created)
│   └── qr/                    # QR code images (auto-created)
```

## 🛠️ Technology Stack

### Backend
- **Flask** - Web framework
- **Flask-SocketIO** - WebSocket support for real-time communication
- **googletrans** - Translation API
- **gTTS** - Google Text-to-Speech
- **qrcode** - QR code generation
- **Pillow** - Image processing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **JavaScript** - Client-side logic
- **Socket.IO Client** - WebSocket client

## 🎯 Use Cases

### 1. Festivals & Events
- Broadcast announcements to diverse linguistic audiences
- Emergency evacuation instructions
- Schedule updates and announcements

### 2. Transportation Hubs
- Train/bus station announcements
- Flight information
- Safety instructions

### 3. Educational Institutions
- Campus-wide announcements
- Emergency alerts
- Event notifications

### 4. Shopping Malls
- Promotional announcements
- Emergency alerts
- Lost and found notifications

### 5. Emergency Situations
- Disaster management
- Evacuation instructions
- Safety guidelines

## 🔧 Configuration

### Adding More Languages

Edit `app.py` and add to `LANGUAGES` dictionary:

```python
LANGUAGES = {
    'en': {'name': 'English', 'flag': '🇬🇧'},
    'hi': {'name': 'हिन्दी (Hindi)', 'flag': '🇮🇳'},
    # Add more languages here
}
```

### Changing Port

Edit `app.py`, last line:

```python
socketio.run(app, debug=True, host='0.0.0.0', port=5000)
```

## 📱 Mobile Access

1. Ensure your device is on the same network
2. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
3. Access via `http://[YOUR-IP]:5000/client`
4. Or scan the QR code from Admin Dashboard

## 🐛 Troubleshooting

### Audio Not Playing
- **Cause**: Browser autoplay policy
- **Solution**: Click anywhere on the page first, or use the sound toggle

### Translation Fails
- **Cause**: Internet connection or API rate limits
- **Solution**: Check internet connection, wait a moment and retry

### WebSocket Connection Failed
- **Cause**: Firewall or port blocking
- **Solution**: Check firewall settings, ensure port 5000 is open

### Import Errors
- **Cause**: Missing dependencies
- **Solution**: Run `pip install -r requirements.txt`

## 🚧 Future Enhancements

- [ ] Voice input for announcements
- [ ] Image/video announcements
- [ ] SMS/Email notifications
- [ ] Analytics dashboard
- [ ] User authentication
- [ ] Database storage (currently in-memory)
- [ ] Docker containerization
- [ ] Cloud deployment guides

## 🤝 Contributing

This is a hackathon project. Feel free to fork and enhance!

## 📄 License

This project is open source and available for educational purposes.

## 👥 Authors

Developed for Hackathon 2025

## 🙏 Acknowledgments

- Google Translate API for translations
- Google Text-to-Speech for audio generation
- Socket.IO for real-time communication
- Flask community for excellent documentation

---

## 💡 Tips for Success

1. **Keep messages concise** - Shorter messages translate better
2. **Test audio** - Always test audio playback before important broadcasts
3. **Use priority wisely** - Reserve Emergency for critical situations only
4. **Share QR code** - Print and display QR code at venue for easy access
5. **Check history** - Review past announcements for consistency

---

**🎯 Perfect for festivals, events, emergencies, and any situation requiring inclusive multi-language communication!**

For questions or issues, please create an issue in the repository.

**Happy Broadcasting! 📢**
