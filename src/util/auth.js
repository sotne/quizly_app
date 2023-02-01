const jwt = require('jsonwebtoken');

const createJwtToken = user => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.nextTick.JWT_EXPIRY
    })
}

module.exports = { createJwtToken }

