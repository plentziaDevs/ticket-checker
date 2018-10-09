'use strict';

module.exports = {
    port: process.env.PORT || 3000,
    db: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ticket_checker',
        charset: 'utf8_general_ci',
        dateString: true,
        debug: true
    },
    encryption: {
      algorithm: 'camellia-128-cbc',
      key: '@W1%a#vZWj!9p*%'
  },
  jsonwebtoken: {
      key: '@W1%a#vZWj!9p*%'
  }
}
