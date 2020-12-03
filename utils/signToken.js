const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const response_code = require('../routes/dm/response.code');

module.exports = (payload) => {
    return new Promise((res, rej) => {
        jwt.sign(
            payload,
            config.JWT_SECRET,
            {
                expiresIn: "1h"
            },
            (err, token) => {
                if (err) {
                    rej(err);
                }
                res({
                    status: response_code.HTTP_200,
                    response: {
                        token: token
                    }
                });
            }
        );
    });
};