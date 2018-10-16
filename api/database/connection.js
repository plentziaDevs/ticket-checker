import mysql from 'mysql';
import { db } from '../helpers/config';

const database = mysql.createConnection({
    host:        db.host,
    user:        db.user,
    password:    db.password,
    database:    db.database,
    charset:     db.charset,
    dateStrings: db.dateStrings
});

database.connect(err => {
    if(err){
        throw err;
    }
    console.log('Base de datos conectada.');
});

export default database;
