'use strict';

import jwt from 'jsonwebtoken';
import conn from '../database/connection';
import { encrypt, decrypt } from '../helpers/functions';
import { jsonwebtoken } from '../helpers/config';

/**
 * @function login
 * @param {json} req
 * @param {json} res
 * @param {json} err
 * @param {json} result
 */
export const login = (req, res) => {

    let email = req.body.email;
    let sql = 'SELECT id_company, password FROM companies WHERE email = ?';

    conn.query(sql, email, (err, result) => {
        if (err) {
            return res.status(401).send({
                error: {
                    message: 'Error, usuario y/o contraseña desconocidos',
                    trace: err
                }
            });
        }

        else if (result.length === 0) {
            let sql2 = 'SELECT id_customer, password FROM customers WHERE email = ?';

            conn.query(sql2, email, (err2, result2) => {
                if (err2) {
                    return res.status(401).send({
                        error: {
                            message: 'Error, usuario y/o contraseña desconocidos',
                            trace: err2
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
                    }, jsonwebtoken.key, {
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

/**
 * @function registry
 * @param {json} req
 * @param {json} res
 * @param {json} err
 * @param {json} result
 */
export const registry = (req, res) => {

    if (req.body.role === undefined) return res.status(401).send({
        error: {
            message: 'Error, esta acción requiere de un role para ser ejecutada'
        }
    })

    // if customer
    if (req.body.role === 'customer') {

        if (req.body.email === undefined || req.body.password === undefined) {
            return res.status(401).send({
                error: {
                    message: 'Error, faltan los parametros usuario y/o contraseña de la petición'
                }
            });
        }

        let newCustomer = {
            email: req.body.email,
            password: encrypt(req.body.password),
            activated: 1
        }

        let sql = `(SELECT email FROM customers WHERE email = ${conn.escape(newCustomer.email)})
                   UNION
                   (SELECT email FROM companies WHERE email = ${conn.escape(newCustomer.email)})`;

        conn.query(sql, (err, result) => {

            if (err) {
                return res.status(401).send({
                    error: {
                        message: 'Error en la petición',
                        trace: err
                    }
                });
            }

            if (result.length !== 0) {
                return res.status(401).send({
                    error: {
                        message: 'Error, el customer que intentas registrar ya esta registrado'
                    }
                });
            }

            let sql = 'INSERT INTO customers SET ?, created_at=NOW()';

            conn.query(sql, newCustomer, (err, result) => {

                if (err) {
                    return res.status(401).send({
                        error: {
                            message: 'Error al insertar al usuario',
                            trace: err
                        }
                    });
                }

                return res.status(201).send({
                    success: {
                        message: 'Nuevo customer registrado con exito',
                        customer: newCustomer
                    }
                });

            });
        });

    // if companie
    } else if (req.body.role === 'companie') {

        if (req.body.email === undefined || req.body.password === undefined ||
            req.body.telephone === undefined || req.body.name === undefined) {
            return res.status(401).send({
                error: {
                    message: 'Error, faltan los parametros usuario, contraseña, nombre y/o telefono de la petición'
                }
            });
        }

        let newCompanie = {
            email: req.body.email,
            password: encrypt(req.body.password),
            telephone: req.body.telephone,
            name: req.body.name,
            activated: 1
        }

        let sql = `(SELECT email FROM customers WHERE email = ${conn.escape(newCompanie.email)})
                   UNION
                   (SELECT email FROM companies WHERE email = ${conn.escape(newCompanie.email)})`;

        conn.query(sql, (err, result) => {

            if (err) {
                return res.status(401).send({
                    error: {
                        message: 'Error, ...',
                        trace: err
                    }
                });
            }

            if (result.length !== 0) {
                return res.status(401).send({
                    error: {
                        message: 'Error, la compañia que intentas registrar ya esta registrada'
                    }
                });
            }

            let sql = 'INSERT INTO companies SET ?, created_at=NOW()';

            conn.query(sql, newCompanie, (err, result) => {

                if (err) {
                    return res.status(401).send({
                        error: {
                            message: 'Error al insertar la compañia',
                            trace: err
                        }
                    });
                }

                return res.status(201).send({
                    success: {
                        message: 'Nueva compañia registrada con exito',
                        companie: newCompanie
                    }
                });

            });

        });

    } else {

        return res.status(400).send({
            error: {
                message: 'El role introducido no se corresponde con ninguno de los roles existentes'
            }
        });

    }

}
