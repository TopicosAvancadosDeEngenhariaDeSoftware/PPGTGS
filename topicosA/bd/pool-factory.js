const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost', //mysql995.umbler.com
    user: 'root', //cleberppgtgs
    password: '', //clebersant100 1234 ppgtgs2018
    database: 'discente', // ppgtgs
    port: 3306, // 41890
    connectionLimit: 200,
    connectTimeout: 2000,
    queueLimit: 0,
    debug: false,
    waitForConnection: true,
    compression: true
});


console.log('pool => criado');

pool.on('release', () => console.log('pool => conexão retornada'));



try {
    process.on('SIGINT', () => 
    pool.end(err => {
        if(err) return console.log(err);
        console.log('pool => fechado');
        process.exit(0);
    })
); 


} catch(e) {
    console.log(e);
}

module.exports = pool;

// exemplo!
// const pool = require('./pool-factory');