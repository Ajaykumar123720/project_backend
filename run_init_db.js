const fs = require('fs');
const mysql = require('mysql2/promise');

(async () => {
  try {
    const sql = fs.readFileSync('./sql/init_mutualfund_db.sql', 'utf8');
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Jashuajay@123',
      multipleStatements: true,
    });

    console.log('Connected to MySQL, running init script...');
    await conn.query(sql);
    console.log('Database initialization completed successfully.');
    await conn.end();
  } catch (err) {
    console.error('Error initializing DB:', err.message || err);
    process.exit(1);
  }
})();
