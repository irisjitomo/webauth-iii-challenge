const express = require('express')
const router = express.Router();
const db = require('./users-model')

router.get('/', (req, res) => {
    db.find()
    .then(user => {
        res.json(user)
    })
})



module.exports = router