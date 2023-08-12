import sqlite3 from 'sqlite3';

// Specify the file path for the SQLite database
const databasePath = './db/database.sqlite';

// Create a new SQLite database connection
const db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
