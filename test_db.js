const mysql = require('mysql2/promise');
require('dotenv').config();

async function test() {
  console.log('Testing connection to MySQL...');
  console.log('Host:', process.env.DB_HOST);
  console.log('User:', process.env.DB_USER);
  console.log('DB:', process.env.DB_NAME);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    });
    console.log('SUCCESS: Connected to MySQL server.');
    
    const [rows] = await connection.query(`SHOW DATABASES LIKE '${process.env.DB_NAME}'`);
    if (rows.length > 0) {
      console.log(`SUCCESS: Database "${process.env.DB_NAME}" exists.`);
    } else {
      console.log(`WARNING: Database "${process.env.DB_NAME}" NOT found.`);
    }
    
    await connection.end();
  } catch (err) {
    console.error('FAILURE: Could not connect to MySQL.');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
  }
}

test();
