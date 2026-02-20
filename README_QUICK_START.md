# 🚀 QUICK START GUIDE

## Your application is ready! Here's how to run it:

### ✅ METHOD 1: Using the Startup Script (RECOMMENDED)

1. **Navigate to your project folder:**
   ```
   C:\Users\kamal\OneDrive\Desktop\hussain s6
   ```

2. **Double-click the file:** `START_HERE.bat`

3. **Wait for the message:** "Started SaaeApplication"
   - This may take 30-60 seconds on first run
   - Maven will download dependencies if needed

4. **Open your web browser** and go to:
   ```
   http://localhost:8081/
   ```

5. **Login with:**
   - Username: `admin`
   - Password: `admin123`

---

### ✅ METHOD 2: Using Eclipse

1. **Right-click** on `SaaeApplication.java`
2. Select **Run As** → **Java Application**
3. Check the **Console tab** at the bottom for output
4. Once you see "Started SaaeApplication", go to: `http://localhost:8081/`

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Port 8081 is already in use"
**Solution:** Change the port number in `application.properties`:
```properties
server.port=8082
```
Then access the app at `http://localhost:8082/`

### Issue 2: "Cannot connect to database"
**Solution:** Make sure MySQL is running:
1. Open **Services** (Win + R, type `services.msc`)
2. Find **MySQL80** (or your MySQL version)
3. Right-click → **Start** if it's stopped

### Issue 3: "Failed to fetch" error in login
**Solution:** You're probably opening the HTML file directly
- ❌ Wrong: `file:///C:/Users/...`
- ✅ Correct: `http://localhost:8081/`

---

## 🌐 Deploy to Web (Cloud)

See `DEPLOYMENT_GUIDE.md` for instructions on deploying to:
- Railway.app (Free & Easy)
- Render.com (Free tier)
- Heroku (Paid)

---

## 🎓 Default User Accounts

The system creates 3 default accounts on first run:

| Username | Password    | Role    |
|----------|-------------|---------|
| admin    | admin123    | ADMIN   |
| faculty  | faculty123  | FACULTY |
| student  | student123  | STUDENT |

---

## 📝 Notes

- Your app runs on **port 8081** (not 8080) to avoid conflicts
- First startup may take longer (downloading dependencies)
- Keep the command window open while using the app
- Press Ctrl+C in the command window to stop the app

---

## 🆘 Still Having Issues?

Check the command window for error messages. Common errors:
- **"mvn is not recognized"** → Maven not installed or not in PATH
- **"Connection refused"** → MySQL not running
- **Blank console in Eclipse** → Try Method 1 (batch file) instead

Good luck! 🚀
