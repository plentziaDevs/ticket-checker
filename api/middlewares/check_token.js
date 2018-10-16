import jwt from 'jsonwebtoken';
import { jsonwebtoken } from '../helpers/config';

const verification = (req, res, next) => {
    try{
        jwt.verify(req.headers.authorization.split(' ')[1], jsonwebtoken.key, (err, result) => {
            req.userInfo = result;
        });

        next();
    }

    catch(err){
        return res.status(401).send({
            error: {
                message: 'Verificación de usuario fallida'
            }
        })
    }
}

export default verification;
