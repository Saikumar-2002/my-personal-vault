# Knowledge Vault

A personal knowledge management system migrated from Python to Node.js. Built with Express.js, MongoDB, and Vanilla JavaScript.

## 🚀 Features

- **📝 Notes**: Store and organize text notes with Markdown support.
- **🖼️ Images**: Upload and manage images (stored directly in MongoDB as Base64 strings).
- **🎥 Videos**: Save video links from YouTube, Coursera, etc.
- **🏷️ Tags & Categories**: Organise your content with custom tags and colored categories.
- **🔍 Search**: Powerful global search across all your saved knowledge.
- **🔐 Security**: Secure JWT-based authentication with bcrypt password hashing.

## 🛠️ Tech Stack

- **Backend**: Node.js and  Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Authentication**: JSON Web Tokens (JWT)
- **File Handling**: Multer (temporary) & Base64 storage

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Running locally or via Atlas)

## ⚙️ Setup

### 1. Installation
Navigate to the project directory and install dependencies:
```bash
cd knowledge_vault
npm install
```

### 2. Configuration
Create a `.env` file in the root directory:
```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/knowledge_vault
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### 3. Running the App
Start the development server with Nodemon:
```bash
npm run dev
```
The server will start at **http://localhost:5000**. Open this link in your browser to see the UI.

## 📂 Project Structure

```
knowledge_vault/
├── frontend/             # Vanilla JS Frontend (served statically)
│   ├── index.html        # Main UI
│   ├── app.js            # Frontend logic
│   └── styles.css        # UI Styling
├── src/                  # Backend Source
│   ├── config/           # DB Connection
│   ├── controllers/      # Route logic (MVC)
│   ├── middleware/       # Auth & Upload filters
│   ├── models/           # Mongoose Schemas
│   ├── routes/           # API Endpoints
│   ├── utils/            # JWT & Helper functions
│   └── app.js            # Express application setup
├── .env                  # Environment Variables
├── package.json          # Node dependencies
└── README.md             # This file
```

## 🔌 API Summary

| Resource | Endpoints |
|----------|-----------|
| **Auth** | `/api/v1/auth/register`, `/api/v1/auth/login` |
| **Notes** | `/api/v1/notes` (CRUD) |
| **Images** | `/api/v1/images/upload`, `/api/v1/images` |
| **Videos** | `/api/v1/videos` (CRUD) |
| **Categories** | `/api/v1/categories` (CRUD) |
| **Tags** | `/api/v1/tags` (CRUD) |
| **Search** | `/api/v1/search` |

## 📜 License
MIT
