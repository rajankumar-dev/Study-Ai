# 📚 StudyAI – AI Powered Study Assistant

![](https://github.com/rajankumar-dev/Wanderlust---Rental-Booking-Plateform-/blob/main/frontend/public/tech-stack.png?raw=true)
An AI-powered study management platform that helps students organize notes, generate summaries, create questions, and interact with an intelligent AI assistant for smarter learning.

---

## 🚀 Features

### 📄 Notes Management

- Create Notes
- View Notes
- Update Notes
- Delete Notes
- Favorite Notes
- Organize Study Material

### 🤖 AI Features

- AI-Powered Note Summarization
- Automatic Question Generation
- AI Study Assistant Chat
- Context-Based Question Answering

### 📁 File Upload

- Upload Study Documents
- Store Learning Materials
- Content Processing Support

### 👤 User Management

- User Registration & Login
- JWT Authentication
- Profile Management
- Profile Picture Upload
- Account Settings

### 🔔 Notifications

- AI Activity Notifications
- Note Creation Alerts
- Favorite Note Updates

### 📊 Dashboard

- Total Notes Statistics
- AI Summary Statistics
- Generated Questions Statistics
- Recent Notes Overview

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Icons

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Token)
- bcrypt.js

### AI Integration

- Google Gemini API (Paid)
- Groq API (Free)

### File Upload

- Multer

---

## 📂 Project Structure

```bash
StudyAI/
│
├── backend/
│   │
│   ├── config/
│   │   ├── ai.js
│   │   ├── db.js
│   │   └── multer.js
│   │
│   ├── controllers/
│   │   ├── ai.controller.js
│   │   ├── auth.controller.js
│   │   ├── notes.controller.js
│   │   ├── question.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   ├── chat.model.js
│   │   ├── note.model.js
│   │   ├── notification.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── ai.route.js
│   │   ├── auth.routes.js
│   │   ├── notes.routes.js
│   │   ├── notification.route.js
│   │   ├── question.routes.js
│   │   ├── upload.routes.js
│   │   └── user.routes.js
│   │
│   ├── services/
│   │
│   ├── uploads/
│   │   ├── images/
│   │   └── pdfs/
│   │
│   ├── utils/
│   │   ├── cloudinary.js
│   │   └── createNotification.js
│   │
│   ├── app.js
│   ├── constants.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── public/
│   │   └── _redirects
│   │
│   ├── src/
│   │   │
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   ├── notificationApi.js
│   │   │   └── userApi.js
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── ChatBox.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── UploadBox.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── features/
│   │   │   ├── ai/
│   │   │   ├── auth/
│   │   │   └── notes/
│   │   │       └── notesApi.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── CreateNote.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Notes.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Sign.jsx
│   │   │   └── UploadPage.jsx
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── api-design.md
│   ├── auth-flow.md
│   ├── database-design.md
│   └── SRS-Study-AI.pdf
│
├── screenshots/
│   ├── Dashboard.png
│   ├── Notes.png
│   ├── Upload.png
│   ├── AI Assistant.png
│   ├── Profile.png
│   └── Settings.png
│
├── README.md
└── .gitignore

```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/rajankumar-dev/Study-Ai
cd studyai
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=4000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

<!-- ---

## 📸 Screenshots

Add project screenshots here:

- Dashboard
  ![](https://github.com/rajankumar-dev/Study-Ai/blob/main/screenshoots/Dashboard.png?raw=true)
- Notes Page
  ![](https://github.com/rajankumar-dev/Study-Ai/blob/main/screenshoots/Notes.png?raw=true)
- Upload Page
  ![](https://github.com/rajankumar-dev/Study-Ai/blob/main/screenshoots/Upload.png?raw=true)
- AI Assistant
  ![](https://github.com/rajankumar-dev/Study-Ai/blob/main/screenshoots/Ai%20Assistant.png?raw=true)
- Profile Page
  ![](https://github.com/rajankumar-dev/Study-Ai/blob/main/screenshoots/Profile.png?raw=true)
- Settings Page
  ![](https://github.com/rajankumar-dev/Study-Ai/blob/main/screenshoots/Setting.png?raw=true)

--- -->

## 🔒 Security Features

- JWT Authentication
- Protected Routes
- Password Hashing
- User-Specific Data Access
- Secure API Endpoints

---

## 🎯 Project Objectives

- Simplify note management for students.
- Automate study material summarization.
- Generate revision questions using AI.
- Provide an intelligent study assistant.
- Improve learning productivity through AI integration.

---

## 🔮 Future Enhancements

- OCR-Based PDF Processing
- Voice AI Assistant
- Study Progress Analytics
- Quiz Generation System
- Multi-Language Support
- Mobile Application
- Real-Time Collaboration

---

## 👨‍💻 Author

**Rajan Kumar**

Final Year Project

StudyAI – AI-Powered Smart Learning Assistant

---

## 📜 License

This project is developed for educational and academic purposes.
Feel free to use and modify it for learning and research.
