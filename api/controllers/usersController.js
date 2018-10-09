'use strict';

import jwt from 'jsonwebtoken';
import conn from '../database/connection';
import { encrypt, decrypt } from '../helpers/functions';
import { jsonwebtoken } from '../helpers/config';

export const login = (req, res) => {
    let email = req.body.email;
    let sql = 'SELECT id_company, password FROM companies WHERE email = ?';

    conn.query(sql, email, (err, result) => {
        if (err) {
            return res.status(401).send({
                error: {
                    message: 'Error, usuario y/o contraseña desconocidos'
                }
            });
        }

        else if (result.length === 0) {
            let sql2 = 'SELECT id_customer, password FROM customers WHERE email = ?';

            conn.query(sql2, email, (err2, result2) => {
                if (err2) {
                    return res.status(401).send({
                        error: {
                            message: 'Error, usuario y/o contraseña desconocidos'
                        }
                    });
                }

                else if (result2.length === 0) {
                    return res.status(401).send({
                        error: {
                            message: 'Error, usuario y/o contraseña desconocidos'
                        }
                    });
                }

                else {
                    let password = req.body.password;

                    if(decrypt(result2[0].password) !== password){
                        return res.status(401).send({
                            error: {
                                message: 'Error, usuario y/o contraseña desconocidos'
                            }
                        });
                    }

                    const token = jwt.sign({
                    userId: result2[0].id_customer,
                    role: 'customer'
                },  jsonwebtoken.key, {
                        expiresIn: '12h'
                    });

                    res.status(200).send({
                        token: token
                    });
                }
            });
        }

        else {
            let password = req.body.password;

            if(decrypt(result[0].password) !== password){
                return res.status(401).send({
                    error: {
                        message: 'Error, usuario y/o contraseña desconocidos'
                    }
                });
            }

            const token = jwt.sign({
            userId: result[0].id_company,
            role: 'company'
            },  jsonwebtoken.key, {
                expiresIn: '12h'
            });

            res.status(200).send({
                token: token
            });
        }
    });
};
