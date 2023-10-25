const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employees_db'
});

db.connect(function (err, conn) {
    if (err) throw err;
});

module.exports = db;