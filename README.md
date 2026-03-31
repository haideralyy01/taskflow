# TaskFlow

TaskFlow is a full-stack task management application with user authentication, built using the MERN stack (MongoDB, Express.js, React, Node.js) and Vite for the frontend. It allows users to sign up, log in, and manage their personal todo tasks with a modern, responsive UI.

---

## Features

- User authentication (signup, login, JWT-based session)
- Add, edit, complete, and delete todo tasks
- Responsive, modern UI with React and Tailwind CSS
- Persistent storage with MongoDB
- RESTful API backend with Express.js
- Protected routes and API endpoints

---

## Project Structure

```
TaskFlow/
├── backend/         # Node.js + Express API server
│   ├── index.js
│   ├── package.json
│   ├── configurations/
│   ├── database/
│   ├── middlewares/
│   └── routes/
└── frontend/        # React + Vite client app
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
```

---

## Backend (Express.js)

- **Entry Point:** `backend/index.js`
- **API Base URL:** `http://localhost:3000/api`
- **Main Dependencies:** express, mongoose, bcrypt, jsonwebtoken, cors, dotenv, zod
- **Environment Variables:**
  - `PORT` (default: 3000)
  - `MONGO_URI` (MongoDB connection string)
  - `JWT_SECRET` (secret for JWT signing)

### Key API Endpoints

- `POST   /api/signup`   — Register a new user
- `POST   /api/login`    — Authenticate user and return JWT
- `GET    /api/todos`    — Get all todos for authenticated user
- `POST   /api/todo`     — Add a new todo
- `PUT    /api/todo/:id` — Update a todo
- `DELETE /api/todo/:id` — Delete a todo

### Database Models
- **User:** email, password (hashed), name
- **Todo:** userId, todoItem, completed

---

## Frontend (React + Vite)

- **Entry Point:** `frontend/src/main.jsx`
- **Main Dependencies:** react, react-router-dom, axios, tailwindcss, vite
- **Auth Context:** Handles login, signup, logout, and user state
- **Pages:**
  - `/auth` — Login/Signup page
  - `/todo` — Todo list (protected)
- **Styling:** Tailwind CSS, custom animations

### Running the Frontend

```
cd frontend
npm install
npm run dev
```
- App runs at: `http://localhost:8080`

---

## Running the Backend

```
cd backend
npm install
npm run dev   # or: node index.js
```
- API runs at: `http://localhost:3000`

---

## Environment Setup

Create a `.env` file in `backend/` with:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## Development Scripts

- **Frontend:**
  - `npm run dev` — Start Vite dev server
  - `npm run build` — Build for production
- **Backend:**
  - `npm run dev` — Start backend with nodemon (if configured)
  - `node index.js` — Start backend normally

---

## License

MIT
