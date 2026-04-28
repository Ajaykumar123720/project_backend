# MutualFundPro - Backend API

This repository contains the backend Express.js server for the MutualFundPro platform. It handles API requests from the React frontend, manages user authentication, and interfaces securely with the MySQL database.

## 🚀 Features

- **RESTful API**: Clean REST architecture to serve mutual fund data and handle user accounts.
- **MySQL Database Integration**: Full relational database setup utilizing `mysql2` connection pooling for performance and reliability.
- **Authentication Routes**: Dedicated `POST /api/login` and `POST /api/register` endpoints.
- **Dynamic Data Seeding**: An initialization endpoint (`/api/init-db`) to automatically create the database tables (`funds`, `users`, `history`) and populate initial Mutual Fund dummy data for testing.
- **CORS Protection**: Integrated `cors` middleware for security boundaries.
- **Request Logging**: Built-in console logger to trace API requests during development.

## 💻 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL (via `mysql2`)
- **Other Utilities**: `dotenv` (Environment Secrets), `cors`

## 📂 Project Structure

```text
backend/
├── .env                # Environment secrets (Port, DB Host, DB Pass, DB Name)
├── .gitignore          # Excludes node_modules/ and .env
├── kill-locks.js       # Utility script to instantly clear deadlocked MySQL connections 
├── package.json        # Node dependencies 
└── server.js           # Core backend server, routing logic, and MySQL connection pool setup
```

## 🛠️ Usage / Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/en/) installed.
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) installed and running locally.

1. **Install Dependencies**
   Run the following terminal command inside this `backend/` directory:
   ```bash
   npm install
   ```

2. **Configure Environment Secrets**
   Create a `.env` file in the root of the backend folder and populate it with your MySQL credentials:
   ```env
   PORT=5001
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASS=YourDatabasePassword
   DB_NAME=mf
   ```

3. **Start the Backend Server**
   ```bash
   node server.js
   ```

4. **Initialize Database Tables (First-Time Setup)**
   If your database is completely empty, you can automatically create the tables and seed mock data by visiting:
   `http://localhost:5001/api/init-db` in your web browser.

## 🐛 Troubleshooting Database Locks
If the application hangs or gets stuck on "Processing...", it means the MySQL connection pool had previous transactions that failed to close properly (deadlocks). You can clear this easily:
```bash
node kill-locks.js
```
This utility script will connect to your MySQL database via standard credentials, find any hanging queries, and forcefully `KILL` them.

## 🤝 Contribution

Contributions, issues, and feature requests are welcome. Feel free to open a ticket or file a pull request to optimize these API endpoints.
