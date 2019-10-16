const express = require('express')

const Users = require('./Routers/user-router')
const Auth = require('./Routers/auth-router')
const server = express();
const cors = require('cors')

server.use(express.json());
server.use('/api/users', Users)
server.use('/api/auth', Auth)

server.get('/', (req, res) => {
    res.send("hello")
})


const port = 7000;
server.listen(port, console.log(`listening on port ${port}`))