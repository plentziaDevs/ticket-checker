import conn from './connection';

async function hola(){
    let sql = 'SELECT * FROM customers';
    await conn.query(sql, (err, result) => {
        if (err) return err;
        else if (result.length !== 0) return 'Sin resultados';
        return result;
    });
}

export { hola }
