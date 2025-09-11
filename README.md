# Simple Node.js + PostgreSQL CRUD App

## Backend
- Express server (`backend/index.js`)
- PostgreSQL connection via `pg`
- Basic CRUD API: `/items` (POST, GET, PUT, DELETE)
- Table schema in `backend/init.sql`

## Frontend
- Minimal HTML/JS (`frontend/index.html`, `frontend/app.js`)
- Interacts with backend API

## Setup
1. **Postgres:**
   - Create a database named `crud_db`.
   - Run the SQL in `backend/init.sql` to create the table.
   - Default user/password: `postgres`/`postgres` (edit in `index.js` if needed).
2. **Backend:**
   - Run `npm install` in `backend`.
   - Start server: `npm start` (runs on port 3001).
3. **Frontend:**
   - Open `frontend/index.html` in your browser.

## Usage
- Add, update, and delete items from the list.
- All changes are reflected in the database.
