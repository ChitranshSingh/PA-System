# 🔊 Multi-Language PA System

An innovative Public Announcement System that broadcasts messages in multiple languages simultaneously with real-time text-to-speech audio generation.

**🌐 Live Demo:** [View Live App](https://pa-system.onrender.com) _(Replace with your actual URL)_

## ✨ Features

### Core Features
- 🌍 **Multi-Language Support** - Broadcast in 5 languages (English, Hindi, Spanish, French, Tamil)
- 🔊 **Text-to-Speech** - Automatic audio generation using Google TTS
- ⚡ **Real-Time Broadcasting** - WebSocket-based instant delivery to all clients
- 🚨 **Priority Levels** - Normal, Warning, and Emergency modes with visual alerts
- 📱 **Mobile Responsive** - Works on all devices (desktop, tablet, mobile)
- 🔐 **Secure Authentication** - Protected admin dashboard with login

### Innovative Features
- 📷 **Smart QR Code** - Auto-generates QR code with deployment URL
- 📜 **Announcement History** - View and replay past announcements
- 🔄 **Replay Functionality** - Re-broadcast previous announcements
- 🗑️ **Clear History** - Admin can clear all history and audio files
- 🎨 **Visual Emergency Alerts** - Blinking animations for emergency broadcasts
- 💾 **Auto-Save Drafts** - Automatically saves admin drafts in browser
- ⌨️ **Keyboard Shortcuts** - Ctrl+Enter to broadcast quickly

## 🌐 Live Deployment

### Deployed Application

**Live URL:** https://pa-system.onrender.com _(Update with your actual Render URL)_

**Access Points:**
- **Home:** https://pa-system.onrender.com
- **Admin Login:** https://pa-system.onrender.com/login
- **Client Display:** https://pa-system.onrender.com/client (No login required)
- **History:** https://pa-system.onrender.com/history

**Admin Credentials:**
- Username: `admin`
- Password: Contact admin for credentials

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Python 3.11+ 
- pip (Python package manager)

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/pa-system.git
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

### Running Locally

```bash
python app.py
```

The server will start at `http://localhost:5000`

### Local Access Points

- **Home Page**: http://localhost:5000
- **Admin Login**: http://localhost:5000/login (Username: `admin`, Password: `admin123`)
- **Client Display**: http://localhost:5000/client
- **History**: http://localhost:5000/history

## 📖 How to Use

### For Administrators

1. **Login to Admin Dashboard**
   - Visit `/login`
   - Enter your credentials
   - Access granted to admin dashboard

2. **Broadcast Announcement**
   - Type your announcement in the text box
   - Select priority level (Normal/Warning/Emergency)
   - Choose target languages
   - Click "Broadcast Announcement"

3. **Share Access**
   - Share the QR code (automatically shows your deployment URL)
   - Or share the client URL directly
   - Clients can access without login

4. **Manage History**
   - View all announcements in History page
   - Replay any previous announcement
   - Clear history when needed (admin only)

### For Clients (No Login Required)

1. **Access Client Display**
   - Visit `/client` URL or scan QR code
   - No login required - instant access

2. **Receive Announcements**
   - Select your preferred language
   - Wait for announcements
   - Audio plays automatically (ensure sound is enabled)

3. **View All Languages**
   - See announcements in all translated languages
   - Switch language anytime

### Managing History (Admin Only)

1. Visit the **History** page at `/history`
2. View all past announcements
3. Click "Replay" to re-broadcast any announcement
4. Click "Play" to listen to specific language audio
5. Click "Clear All" to delete history and free up space (requires admin login)

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
- **Flask 3.0.0** - Web framework
- **Flask-SocketIO 5.3.6** - WebSocket support for real-time communication
- **Flask-Login 0.6.3** - User authentication and session management
- **deep-translator 1.11.4** - Translation API (Google Translate wrapper)
- **gTTS 2.5.3** - Google Text-to-Speech
- **qrcode 7.4.2** - QR code generation
- **Pillow** - Image processing
- **Gunicorn 21.2.0** - Production WSGI server

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript ES6** - Client-side logic
- **Socket.IO Client 4.6.0** - WebSocket client for real-time communication

### Deployment
- **Render.com** - Cloud hosting platform (free tier)
- **GitHub** - Version control and CI/CD
- **Gunicorn + Threading** - Production server configuration

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

## 🚀 Deployment

### Deploy to Render.com (Free)

This project is configured for easy deployment on Render.com:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render auto-detects configuration from `render.yaml`
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment

3. **Configure Environment Variables** (Important!)
   - In Render Dashboard → Environment
   - Add `ADMIN_PASSWORD` = your_secure_password
   - Save changes

4. **Your App is Live!**
   - Access at: `https://your-app.onrender.com`
   - Login at: `https://your-app.onrender.com/login`

### Alternative Deployment Options

- **Railway.app** - Quick deploy with CLI
- **Fly.io** - Global edge deployment
- See `DEPLOYMENT_GUIDE.md` for detailed instructions

---

## 🔧 Configuration

### Changing Admin Credentials

**For Production (Recommended):**

Set environment variables on your deployment platform:
- `ADMIN_USERNAME` - Your admin username
- `ADMIN_PASSWORD` - Your secure password

**For Local Development:**

Edit `app.py` line ~35:
```python
users = {
    'your_username': User('1', 'your_username', generate_password_hash('your_password'))
}
```

### Adding More Languages

Edit `app.py` and add to `LANGUAGES` dictionary:

```python
LANGUAGES = {
    'en': {'name': 'English', 'flag': '🇬🇧'},
    'hi': {'name': 'हिन्दी (Hindi)', 'flag': '🇮🇳'},
    'de': {'name': 'Deutsch (German)', 'flag': '🇩🇪'},
    # Add more languages here
}
```

### Environment Variables

Create `.env` file for local development:
```env
SECRET_KEY=your-random-secret-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_password
```

## 📱 Mobile Access

### For Deployed App:
1. Visit the client URL: `https://your-app.onrender.com/client`
2. Or scan the QR code from Admin Dashboard (automatically shows deployment URL)
3. No login required - instant access
4. Works from anywhere in the world!

### For Local Development:
1. Ensure your device is on the same WiFi network
2. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
3. Access via `http://[YOUR-IP]:5000/client`
4. Or scan the QR code (automatically detects local IP)

## 🔐 Security

### Authentication
- Admin dashboard protected with Flask-Login
- Password hashing using Werkzeug
- Session management with secure cookies
- Client access remains public (no login required)
- Clear history requires admin authentication

### Production Security Checklist
- ✅ Change default admin password via environment variables
- ✅ Set strong SECRET_KEY
- ✅ Use HTTPS (automatic on Render/Railway/Fly.io)
- ✅ Never commit `.env` file to Git
- ✅ Regularly update dependencies

---

## 🐛 Troubleshooting

### Local Development Issues

**Audio Not Playing**
- **Cause**: Browser autoplay policy
- **Solution**: Click anywhere on the page first, or use the sound toggle

**Translation Fails**
- **Cause**: Internet connection required
- **Solution**: Check internet connection, wait a moment and retry

**Port 5000 Already in Use**
- **Cause**: Another application using the port
- **Solution**: Kill the process or change port in `app.py`

**Import Errors**
- **Cause**: Missing dependencies
- **Solution**: Activate venv and run `pip install -r requirements.txt`

### Deployment Issues

**Build Fails on Render**
- **Cause**: Python version incompatibility
- **Solution**: Ensure `runtime.txt` specifies `python-3.11.0`

**WebSocket Not Working After Deploy**
- **Cause**: Incorrect start command
- **Solution**: Update Render start command to: `gunicorn --workers 1 --threads 4 --timeout 120 app:app`

**QR Code Shows Wrong URL**
- **Cause**: RENDER_EXTERNAL_URL not detected
- **Solution**: Already fixed! App auto-detects deployment URL

**Can't Login After Deploy**
- **Cause**: Admin password not set
- **Solution**: Set `ADMIN_PASSWORD` in Render environment variables

For detailed troubleshooting, see `TROUBLESHOOTING.md`

## 🚧 Future Enhancements

### Planned Features
- [ ] Multiple user roles (Admin, Moderator, Broadcaster)
- [ ] Voice input for announcements (speech-to-text)
- [ ] Image/video announcements
- [ ] SMS/Email notifications for critical alerts
- [ ] Analytics dashboard with broadcast statistics
- [ ] Database storage (PostgreSQL/MongoDB) for persistent history
- [ ] Password recovery via email
- [ ] Two-factor authentication
- [ ] API rate limiting for security
- [ ] Docker containerization
- [ ] Custom TTS voice selection
- [ ] Geolocation-based targeting
- [ ] Mobile native apps (iOS/Android)

### Completed Enhancements
- ✅ User authentication with Flask-Login
- ✅ Secure admin dashboard
- ✅ Cloud deployment ready (Render.com)
- ✅ Smart QR code with auto-detection
- ✅ Clear history functionality
- ✅ Production-ready configuration

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution
- Add more language support
- Improve UI/UX design
- Add database integration
- Implement additional security features
- Write tests
- Improve documentation

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👥 Authors

**Developed by:** Chitransh Singh  
**GitHub:** [@ChitranshSingh](https://github.com/ChitranshSingh)  
**Project:** Hackathon 2025

---

## 🙏 Acknowledgments

- Google Translate API for translations
- Google Text-to-Speech for audio generation
- Socket.IO for real-time communication
- Flask community for excellent documentation
- Render.com for free hosting

## 🙏 Acknowledgments

- Google Translate API for translations
- Google Text-to-Speech for audio generation
- Socket.IO for real-time communication
- Flask community for excellent documentation

---

## 💡 Tips for Success

### For Administrators:
1. **Keep messages concise** - Shorter messages translate better and faster
2. **Test audio first** - Always test audio playback before important broadcasts
3. **Use priority wisely** - Reserve Emergency for critical situations only
4. **Change default password** - Update credentials in production immediately
5. **Monitor history** - Review past announcements for consistency
6. **Clear old history** - Free up disk space by clearing old announcements periodically

### For Event Organizers:
1. **Share QR code** - Print and display QR code at venue for easy access
2. **Test before event** - Do a test broadcast 30 minutes before
3. **Have backup** - Keep written announcements as backup
4. **Verify internet** - Ensure stable internet for translation service
5. **Multiple devices** - Test on different devices and browsers

### For Deployment:
1. **Use environment variables** - Never hardcode passwords
2. **Enable HTTPS** - Automatic on Render/Railway/Fly.io
3. **Monitor logs** - Check Render/Railway logs for issues
4. **Set up alerts** - Get notified if service goes down
5. **Regular backups** - Export important announcements from history

---

**🎯 Perfect for festivals, events, emergencies, and any situation requiring inclusive multi-language communication!**

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/ChitranshSingh/PA-System/issues)
- **Documentation:** See `DEPLOYMENT_GUIDE.md`, `AUTHENTICATION.md`, and other guides in the repository
- **Deployment Help:** Check Render documentation or Railway docs

---

## ⭐ Star This Repository

If you find this project useful, please give it a star! ⭐

---

**Happy Broadcasting! 📢 Bringing people together through language-inclusive technology! 🌍**
