# 🧵 Threads — A Lightweight Social Network (React + Node.js)

A simple, full-stack social media web app built with **React** and **Node.js**. Users can create posts, comment, add friends, chat privately, and search for others — all without a database, just using local JSON files.

---

## ✨ Features

- 🧑 View users and their profile pages
- 📝 Create, delete and view posts
- 💬 Add comments to posts
- 🧑‍🤝‍🧑 Add and remove friends (mutual friendship)
- 💌 Start private conversations with other users
- 🔍 Search for users/posts by name in the feed
- 🖼️ Unique avatar images per user
- 🎨 Clean UI with left-aligned layout and mobile-friendly design

---

## 🛠 Tech Stack

**Frontend:** React (with React Router)  
**Backend:** Node.js + Express  
**Data storage:** JSON files (mock DB) — no database required

---

## 📂 Project Structure
```
lb2_spa_project/
├── backend/           # Express server with API routes
│   ├── models/        # JSON files: users, posts, comments, messages, friends
│   └── app.js         # Main server
├── frontend/          # React app
│   ├── components/    # PostCard, CommentSection, ChatPage etc.
│   ├── pages/         # Feed, Profile, ChatList
│   ├── assets/        # Logo, icons (optional)
│   └── App.jsx        # App entry point
```

---

## 🚀 Running the project

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/threads-social-app.git
cd threads-social-app
```

### 2. Start the backend
```bash
cd backend
npm install
node app.js
```
Runs on: `http://localhost:3001`

### 3. Start the frontend
```bash
cd ../frontend
npm install
npm run dev
```
Runs on: `http://localhost:5173`

---

## 🧪 Sample Users
```json
[
  { "id": 1, "name": "Artem" },
  { "id": 2, "name": "Alexey" },
  { "id": 3, "name": "Sophie" }
]
```

You can switch active users in the chat dropdown. Each has unique avatars and posts.

---

## 📸 Screenshots

| Feed | Profile | Chat |
|------|---------|------|
| ✅ Posts, search bar, create dialog | ✅ Friends, start chat | ✅ Message thread + switch user |

---

## 💡 Ideas for future
- Google/Facebook login
- Realtime chat with WebSocket
- MongoDB or SQLite integration
- Notifications, likes, reposts

---

## 👨‍💻 Author
**Filatov Artem** — built as a university project at KhNURE (2025)

---

## 📄 License
MIT

