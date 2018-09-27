'use strict';

const mysql = require('mysql');
const config = require(`${__dirname}/../helpers/config`);

const db = mysql.createConnection({
    host:        config.db.host,
    user:        config.db.user,
    password:    config.db.password,
    database:    config.db.database,
    charset:     config.db.charset,
    dateStrings: config.db.dateStrings,
    debug:       config.db.debug
});

db.connect(err => {
    if(err){
        throw err;
    }
    console.log('Base de datos conectada.');
});

module.exports = db;
