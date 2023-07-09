// Required packages
const mysql = require('mysql2')
require('dotenv').config()

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'test',
})

module.exports = connection
