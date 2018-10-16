import conn from '../database/connection';

export const create = (req, res) => {
    switch (req.userInfo.role) {
        case 'company':
            let date = new Date();

            let Coupon = {
                id_company: req.body.id_company,
                name: req.body.name,
                description: req.body.description,
                qr_code: `${req.body.name.replace(/ /g, '-').toLowerCase()}-${date.getTime()}`,
                photograph: req.body.photograph,
                check_quantity: req.body.check_quantity
            };

            let sql = 'INSERT INTO coupons SET ?';

            conn.query(sql, Coupon, (err, result) => {
                if (err) {
                    res.status(500).send({
                        error: {
                            message: 'Error, no se pudo procesar la petición',
                            trace: err
                        }
                    });
                }

                else if (result.affectedRows === 0) {
                    res.status(400).send({
                        error: {
                            message: 'Error al insertar, compruebe los datos',
                            data: Coupon
                        }
                    });
                }

                res.status(201).send({
                    message: 'Cupon insertado con éxito',
                    data: Coupon
                });
            });
            break;
        default:
            return res.status(401).send({
                error: {
                    message: 'Acceso denegado'
                }
            })
    }
}
