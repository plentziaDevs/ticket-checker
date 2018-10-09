'use strict';

import conn from '../database/connection';

export const login = (req, res) => {
    let username = req.body.username;
    let sql = "SELECT u.id_user, r.name AS 'roles', u.password FROM users u LEFT JOIN roles r ON u.id_role = r.id_role WHERE u.email = ? OR u.username = ?";

    conn.query(sql, [username, username], (err, result) => {
        if (err) {
            return res.status(401).send({
                error: {
                    message: 'Error, usuario y/o contraseña desconocidos'
                }
            });
        }

        else if (result.length === 0) {
            return res.status(401).send({
                error: {
                    message: 'Error, usuario y/o contraseña desconocidos'
                }
            });
        }

        else {
            console.log('Contraseñas y tal');
        }
    });
};
