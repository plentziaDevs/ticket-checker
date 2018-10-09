'use strict';

import crypto from 'crypto';
import { encryption } from './config';

export const encrypt = text => {
    let cipher = crypto.createCipher(encryption.algorithm, encryption.key);
    let crypted = cipher.update(text, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
};

export const decrypt = text => {
    let decipher = crypto.createDecipher(encryption.algorithm, encryption.key);
    let decrypted = decipher.update(text, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
};
