# 🚨 CRITICAL: Update Render Dashboard Settings

## ❌ The Problem

Render is using **manual settings** from the dashboard that override your `render.yaml` and `Procfile`. 

**Error shows:**
```
Running 'gunicorn --worker-class eventlet -w 1 app:app'
```

This is the OLD command! Your files have the new command, but Render dashboard overrides it.

---

## ✅ SOLUTION: Update Render Dashboard (2 Minutes)

### Step 1: Go to Render Dashboard

1. Go to https://render.com
2. Sign in
3. Click on your **"pa-system"** service

---

### Step 2: Update Start Command

1. Click **"Settings"** tab (on the left sidebar)
2. Scroll down to **"Build & Deploy"** section
3. Find **"Start Command"** field
4. You'll see the OLD command:
   ```
   gunicorn --worker-class eventlet -w 1 app:app
   ```

5. **REPLACE IT** with the NEW command:
   ```
   gunicorn --workers 1 --threads 4 --timeout 120 app:app
   ```

6. Click **"Save Changes"** button

---

### Step 3: Manual Deploy (Force Rebuild)

1. Go to **"Manual Deploy"** tab (top right)
2. Click **"Clear build cache & deploy"**
3. Wait 3-5 minutes for deployment

---

### Step 4: Verify Success

Check the logs:
- Should show: `Running 'gunicorn --workers 1 --threads 4 --timeout 120 app:app'`
- Should NOT show eventlet errors
- Should show: `Deploy successful ✅`

---

## 📸 Visual Guide

### What You Should See:

**In Settings:**
```
┌─────────────────────────────────────────────┐
│ Build & Deploy                               │
├─────────────────────────────────────────────┤
│ Build Command:                               │
│ pip install -r requirements.txt              │
│                                              │
│ Start Command:                               │
│ [gunicorn --workers 1 --threads 4...]       │  ← CHANGE THIS!
│                                              │
│ [Save Changes]                               │
└─────────────────────────────────────────────┘
```

**Before (OLD - WRONG):**
```
gunicorn --worker-class eventlet -w 1 app:app
```

**After (NEW - CORRECT):**
```
gunicorn --workers 1 --threads 4 --timeout 120 app:app
```

---

## 🎯 Why This Happens

Render has **2 ways** to configure start command:

1. **From Files** (render.yaml or Procfile) - ✅ Your files are correct
2. **From Dashboard** (manual settings) - ❌ This overrides everything!

When you first created the service, you might have manually typed the old command. Now it's stuck in the dashboard settings.

---

## ✅ Alternative: Delete & Recreate Service

If updating settings doesn't work:

### Step 1: Delete Current Service
1. Render Dashboard → pa-system
2. Settings → Scroll to bottom
3. Click **"Delete Service"**
4. Confirm deletion

### Step 2: Create New Service
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub repository
3. Select **pa-system** repo
4. Render auto-detects `render.yaml`
5. **DO NOT** manually enter start command
6. Click **"Create Web Service"**

This time Render will use your `render.yaml` file!

---

## 🔍 How to Confirm It's Fixed

### Check Logs After Deploy:

**❌ WRONG (Old):**
```
==> Running 'gunicorn --worker-class eventlet -w 1 app:app'
Error: class uri 'eventlet' invalid or not found
```

**✅ CORRECT (New):**
```
==> Running 'gunicorn --workers 1 --threads 4 --timeout 120 app:app'
[INFO] Starting gunicorn 21.2.0
[INFO] Listening at: http://0.0.0.0:10000
[INFO] Using worker: sync
==> Deploy successful ✅
```

---

## 📋 Quick Checklist

Before you leave Render dashboard:

- [ ] Clicked on pa-system service
- [ ] Went to Settings tab
- [ ] Found "Start Command" field
- [ ] Changed to new command (without eventlet)
- [ ] Clicked "Save Changes"
- [ ] Clicked "Clear build cache & deploy"
- [ ] Waited for deployment to complete
- [ ] Checked logs for success

---

## 🎉 After Success

Your app will be live at:
```
https://pa-system-xxxxx.onrender.com
```

Test it:
1. Visit home page
2. Login at /login (admin / admin123)
3. Open /client in another tab
4. Broadcast an announcement
5. Verify real-time delivery works

---

## ⚠️ IMPORTANT

**Render Dashboard settings ALWAYS override file settings!**

So even though your `render.yaml` and `Procfile` are correct, you MUST update the dashboard manually this one time.

After this, any changes to `render.yaml` will be respected.

---

## 🆘 Still Having Issues?

### Issue: Settings won't save
- Try different browser
- Clear cache
- Use incognito mode

### Issue: Can't find Start Command field
- Make sure you're in Settings tab
- Scroll down to "Build & Deploy" section
- It's below "Environment Variables"

### Issue: Deploy still fails
- Delete service and recreate
- This will read from render.yaml fresh

---

## ✅ This WILL Work!

Once you update the dashboard start command:
- ✅ No eventlet errors
- ✅ No gevent errors
- ✅ Clean deployment
- ✅ App goes live
- ✅ WebSocket works
- ✅ Everything works!

**Go to Render dashboard NOW and fix the Start Command! 🚀**
