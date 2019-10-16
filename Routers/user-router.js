const express = require('express')
const router = express.Router();
const db = require('./users-model')
const protected = require('./middlewares/restricted')

router.get('/', protected, (req, res) => {
    db.find()
    .then(user => {
        res.json({user})
    })
    .catch(err => res.send(err))
})



module.exports = router