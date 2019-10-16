const jwt = require('jsonwebtoken');
const secretForToken = require('../secrets')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secretForToken.secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: 'Nope'})
            } else {
                req.user = {
                    username: decodedToken.username,
                    department: decodedToken.department
                };
                next();
            }
        })
    } else {
        res.status(400).json({ message: 'no token' })
    }
}