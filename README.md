
---

## 📘   MERN Blog Platform 

```md
# 🔄 CivicHub – Fullstack MERN Blog Platform

CivicHub is a full-stack blog application built with the MERN stack: **MongoDB**, **Express.js**, **React.js**, and **Node.js**. It features secure authentication, post creation/editing, real-time commenting, image uploads, and an admin dashboard — all optimized for rapid development using **pnpm**.

---

## 🚀 Features

- 🔐 User authentication with protected routes
- 📝 CRUD operations for blog posts
- 🗂 Categories and tags for organization
- 💬 Real-time comments with refresh triggers
- 🎨 Responsive UI using Tailwind v4 and ShadCN components
- 🛠 Admin tools with role-based access
- 📸 Image uploads (Cloudinary/local)
- 🔍 Pagination and search filtering

---

## 🧰 Tech Stack

| Layer      | Tools                                       |
|-----------|----------------------------------------------|
| Frontend   | React + Vite + TailwindCSS + ShadCN UI       |
| Backend    | Express.js + MongoDB + Mongoose              |
| Auth       | JWT, cookie-parser, bcrypt, helmet           |
| Dev Tools  | pnpm, Axios, React Router, custom hooks      |

---

## 📁 Project Structure

```
civichub/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Route-based views
│   │   ├── context/         # Auth, Toast, Theme
│   │   ├── hooks/           # Custom React hooks
│   │   ├── layouts/         # Page layout wrappers
│   │   └── App.jsx          # Main entry point
│   └── package.json         # Frontend deps (pnpm)
├── server/                  # Express backend
│   ├── routes/              # API routes
│   ├── models/              # Mongoose schemas
│   ├── middleware/          # Auth, validation
│   ├── controllers/         # Route logic
│   ├── server.js            # Server bootstrap
│   └── package.json         # Backend deps (pnpm)
└── README.md                # Project documentation
```

---

## 🛠️ Setup Instructions

### 1. Install pnpm globally

```bash
npm install -g pnpm
```

### 2. Install dependencies

```bash
cd client && pnpm install
cd ../server && pnpm install
```

### 3. Configure Environment Variables

Create `.env` files in both `client` and `server` directories:

```env
# server/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/civichub
JWT_SECRET=your-secret-key

# client/.env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Running Locally

```bash
# Start backend
cd server
pnpm dev

# Start frontend
cd ../client
pnpm dev
```

The app runs at [`http://localhost:5173`](http://localhost:5173), with API served from `http://localhost:5000`.

---

## 🔗 Key API Endpoints

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| GET    | /api/posts           | List all blog posts       |
| POST   | /api/posts           | Create new post           |
| GET    | /api/posts/:id       | Get single post by ID     |
| PUT    | /api/posts/:id       | Update post               |
| DELETE | /api/posts/:id       | Delete post               |
| GET    | /api/categories      | List all categories       |
| GET    | /api/comments/:id    | Get comments for post     |
| POST   | /api/comments        | Add a comment             |

---

## 📌 Development Highlights

- ✅ Modular architecture for long-term scalability
- ✅ Custom hooks for form state, pagination, modals
- ✅ Role-based access control
- ✅ Image and file uploads (dropzone-compatible)
- ✅ Secure session handling via cookies

---

## 📷 Screenshots

> Include screenshots for:
> - Homepage
> - Single post with comments
> - Admin dashboard
> - Post editor
> - Dark mode toggle

---

## 📚 Resources

- [React Docs](https://react.dev/)
- [Express Docs](https://expressjs.com/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [pnpm Docs](https://pnpm.io/)

---

## 🛡 License

MIT © 2025 Jim Hope
```
