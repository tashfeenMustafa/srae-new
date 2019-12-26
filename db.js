const mysql = require('mysql');

//local mysql db connection (Pooling)
const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'sell4vets.com',
    user: 'sell4vetsbd_orders_api',
    password: '_buF2T-x%s(D',
    database: 'sell4vetsbd_op_new',
    insecureAuth: true,
    bigNumberStrings: true,
    dateStrings: true,
    debug: true,
    trace: true
});

module.exports = pool;