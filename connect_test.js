const mysql = require('mysql2/promise');
require('dotenv').config();

const host = process.env.DB_HOST || process.argv[2] || '127.0.0.1';
const user = process.env.DB_USER || process.argv[3] || 'root';
const pass = process.env.DB_PASS || process.argv[4] || '';

console.log('Testing MySQL connection with:', { host, user, passSet: !!pass });

async function test() {
  try {
    const conn = await mysql.createConnection({ host, user, password: pass });
    console.log('Connected OK. Server version:', (await conn.query('SELECT VERSION()'))[0]);
    await conn.end();
  } catch (err) {
    console.error('Connection failed:', err.message || err);
  }
}

test();
