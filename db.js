const mysql = require('mysql');

//local mysql db connection (Pooling)
const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'sell4vets.com',
    user: 'sell4vetsbd_adminapi',
    password: 'Vbav(%1tl15)',
    database: 'sell4vetsbd_ocdb',
    insecureAuth: true,
    bigNumberStrings: true,
    dateStrings: true,
    debug: true,
    trace: true
});

module.exports = pool;