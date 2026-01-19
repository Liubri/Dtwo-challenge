# Settings Management System

A full-stack application for managing arbitrary JSON configuration data. Built with a Node.js/Express backend, a React frontend, and Supabase for database persistence.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete JSON settings.
- **Pagination**: Efficiently browse through large numbers of settings.
- **JSON Validation**: Intelligent editor to ensure your configurations are valid.
- **Dockerized**: Entire stack orchestrates with a single command.
- **Modern UI**: Styled with Tailwind CSS and Lucide icons.

---

## Getting Started

### 1. Build and Run with Docker
In the root directory of the project, run:

```bash
docker-compose up --build
```

- **Frontend**: Available at [http://localhost:8080](http://localhost:8080)
- **Backend API**: Available at [http://localhost:3000](http://localhost:3000)

---

## Testing

### Backend Unit Tests
These tests use the built-in Node.js test runner to verify API logic directly.

```bash
cd backend

# Run server
node src/server.js

# Run all tests
node --test 
```

### Frontend UI Tests (E2E)
We use [Playwright](https://playwright.dev/) for end-to-end testing of the frontend.

```bash
cd frontend

# Using pnpm
pnpm test:ui

# Or using npm
npm run test:ui
```

### Manual UI Testing
1. Open [http://localhost:8080](http://localhost:8080).
2. Click **"Create New"** to add a JSON object.
3. Use the **"Edit"** button on the list to modify existing data.
4. Use the **"Delete"** button to remove settings (includes a confirmation prompt).
5. Navigate through pages using the **Next/Previous** controls at the bottom.

---

## Tech Stack

- **Backend**: Node.js, Express, Supabase JS Client.
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Axios, React Router.
- **Database**: PostgreSQL (via Supabase).
- **Deployment**: Docker, Docker Compose.
