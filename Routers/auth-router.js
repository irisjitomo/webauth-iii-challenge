const express = require('express')
const router = express.Router();
const db = require('./users-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretForToken = require('./secrets')

router.post('/register', (req, res) => {
    let newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 10)
    newUser.password = hash;

    db.add(newUser)
    .then(registered => {
        res.status(201).json(registered)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body
    db.findBy({username})
    .first()
    .then(logged => {
        if (logged && bcrypt.compareSync(password, logged.password)) {
            const token = Token(logged)

            res.status(200).json({
                message: `Hello Moto ${logged.username}`,
                token
            })
        } else {
            res.status(401).json({ message: `Could not log in ${logged.username}`})   
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})



//// Token
function Token(loggedUser) {
    const payload = {
        username: loggedUser.username,
        subject: loggedUser.subject,
        department: loggedUser.department
    }

    const options = {
        expiresIn: '30 minutes'
    }

    return jwt.sign(payload, secretForToken.secret, options)
}


module.exports = router