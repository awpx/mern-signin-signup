const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config({path: './server/config/config.env'})

const app = express()

app.get('/', (req, res) => res.send('hello'))

const PORT = process.env.PORT 


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`))