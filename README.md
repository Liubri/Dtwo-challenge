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

### 1. Environment Configuration
The backend requires connection strings for Supabase. Although defaults are provided in the `docker-compose.yml`, you can customize them in `backend/.env`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

### 2. Build and Run with Docker
In the root directory of the project, run:

```bash
docker-compose up --build
```

- **Frontend**: Available at [http://localhost:8080](http://localhost:8080)
- **Backend API**: Available at [http://localhost:3000](http://localhost:3000)

---

## Testing

### Automated API Testing
You can verify the backend CRUD operations using the provided test script. Ensure the containers are running, then execute:

```bash
# Make the script executable
chmod +x test_api.sh

# Run the tests
./test_api.sh
```
This script will:
1. Create a setting.
2. Retrieve the list (checking pagination).
3. Retrieve the specific setting by UID.
4. Update the setting.
5. Delete the setting.

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
