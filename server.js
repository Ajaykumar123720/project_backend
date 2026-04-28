const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Debug: print DB env presence
console.log('ENV DB_USER:', process.env.DB_USER, 'DB_PASS set:', !!process.env.DB_PASS);

app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.method === 'POST') console.log('Body:', req.body);
  next();
});

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper to check connection
async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database');
    connection.release();
  } catch (err) {
    if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('Database does not exist. Please run /api/init-db to create it.');
    } else {
      console.error('MySQL Connection Error:', err);
    }
  }
}

checkConnection();

// Initial database setup and seeding
app.get('/api/init-db', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.query(`USE ${process.env.DB_NAME}`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS funds (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(50),
        subcategory VARCHAR(100),
        nav DECIMAL(15, 2),
        aum DECIMAL(15, 2),
        expense_ratio DECIMAL(5, 2),
        risk_level VARCHAR(50),
        rating INT,
        returns_1y DECIMAL(5, 2),
        returns_3y DECIMAL(5, 2),
        returns_5y DECIMAL(5, 2),
        fund_manager VARCHAR(255),
        fund_house VARCHAR(255),
        min_investment DECIMAL(15, 2),
        sip_min DECIMAL(15, 2),
        launched DATE,
        benchmark VARCHAR(255),
        nav_history JSON
      )
    `);

    // Mock data from the frontend (hardcoded here for the init script)
    const mockFunds = [
      { id: '1', name: 'BlueChip Growth Fund', category: 'Equity', subcategory: 'Large Cap', nav: 58.34, aum: 32500, expense_ratio: 0.89, risk_level: 'High', rating: 5, returns_1y: 18.5, returns_3y: 15.2, returns_5y: 14.8, fund_manager: 'Rajesh Kumar', fund_house: 'Axis Mutual Fund', min_investment: 5000, sip_min: 500, launched: '2013-01-15', benchmark: 'Nifty 50', nav_history: JSON.stringify([{ date: '2024-01-01', value: 50 }]) },
      // I'll add more in the real execution or fetch from a script
    ];

    for (const fund of mockFunds) {
      await connection.query(
        `INSERT INTO funds (id, name, category, subcategory, nav, aum, expense_ratio, risk_level, rating, returns_1y, returns_3y, returns_5y, fund_manager, fund_house, min_investment, sip_min, launched, benchmark, nav_history) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE name=VALUES(name)`,
        [fund.id, fund.name, fund.category, fund.subcategory, fund.nav, fund.aum, fund.expense_ratio, fund.risk_level, fund.rating, fund.returns_1y, fund.returns_3y, fund.returns_5y, fund.fund_manager, fund.fund_house, fund.min_investment, fund.sip_min, fund.launched, fund.benchmark, fund.nav_history]
      );
    }

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('investor', 'advisor', 'analyst', 'admin') DEFAULT 'investor',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed default users
    const defaultUsers = [
      { full_name: 'Admin User', email: 'admin@mutualfund.pro', password: 'password123', role: 'admin' },
      { full_name: 'Investor Sample', email: 'user@mutualfund.pro', password: 'password123', role: 'investor' }
    ];

    for (const user of defaultUsers) {
      await connection.query(
        `INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE full_name=VALUES(full_name)`,
        [user.full_name, user.email, user.password, user.role]
      );
    }

    await connection.end();
    res.json({ message: 'Database initialized (Funds & Users) successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Auth Routes
app.post('/api/register', async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
      [fullName, email, password, role || 'investor']
    );
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const user = rows[0];
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Routes
app.get('/api/funds', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM funds');
    const mapped = rows.map(f => ({
      id: f.id,
      name: f.name,
      category: f.category,
      subcategory: f.subcategory,
      nav: Number(f.nav),
      aum: Number(f.aum),
      expenseRatio: Number(f.expense_ratio),
      riskLevel: f.risk_level,
      rating: f.rating,
      returns1Y: Number(f.returns_1y),
      returns3Y: Number(f.returns_3y),
      returns5Y: Number(f.returns_5y),
      fundManager: f.fund_manager,
      fundHouse: f.fund_house,
      minInvestment: Number(f.min_investment),
      sipMin: Number(f.sip_min),
      launched: f.launched,
      benchmark: f.benchmark,
      navHistory: typeof f.nav_history === 'string' ? JSON.parse(f.nav_history) : f.nav_history
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/funds/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM funds WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Fund not found' });
    const f = rows[0];
    const mapped = {
      id: f.id,
      name: f.name,
      category: f.category,
      subcategory: f.subcategory,
      nav: Number(f.nav),
      aum: Number(f.aum),
      expenseRatio: Number(f.expense_ratio),
      riskLevel: f.risk_level,
      rating: f.rating,
      returns1Y: Number(f.returns_1y),
      returns3Y: Number(f.returns_3y),
      returns5Y: Number(f.returns_5y),
      fundManager: f.fund_manager,
      fundHouse: f.fund_house,
      minInvestment: Number(f.min_investment),
      sipMin: Number(f.sip_min),
      launched: f.launched,
      benchmark: f.benchmark,
      navHistory: typeof f.nav_history === 'string' ? JSON.parse(f.nav_history) : f.nav_history
    };
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Root route - helpful for simple GET / checks (Vercel or browser)
app.get('/', (req, res) => {
  res.json({ message: 'Backend running. See /api/status or API endpoints under /api/*' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
