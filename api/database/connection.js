'use strict';

import mysql from 'mysql';
import { db } from '../helpers/config';

console.log(db);

const database = mysql.createConnection({
    host:        db.host,
    user:        db.user,
    password:    db.password,
    database:    db.database,
    charset:     db.charset,
    dateStrings: db.dateStrings,
    debug:       db.debug
});

database.connect(err => {
    if(err){
        throw err;
    }
    console.log('Base de datos conectada.');
});

export default database;
