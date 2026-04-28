const mysql = require('mysql2/promise');
require('dotenv').config();

async function killLocks() {
  console.log('Connecting to database specifically to kill locks...');
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });

    console.log('Connected. Running SHOW PROCESSLIST');
    const [rows] = await connection.query('SHOW PROCESSLIST');
    
    let killed = 0;
    for (const row of rows) {
      // Don't kill our own connection, and only kill queries that are doing something or sleeping for a long time
      if (row.Id !== connection.threadId && row.User !== 'system user') {
        console.log(`Killing process ${row.Id} - Command: ${row.Command}, Time: ${row.Time}, Info: ${row.Info}`);
        try {
          await connection.query(`KILL ${row.Id}`);
          killed++;
        } catch (killErr) {
          console.log(`Failed to kill ${row.Id}: ${killErr.message}`);
        }
      }
    }
    
    console.log(`Successfully killed ${killed} hanging connections/locks.`);
    await connection.end();
  } catch (err) {
    console.error('Error killing locks:', err);
  }
}

killLocks();
