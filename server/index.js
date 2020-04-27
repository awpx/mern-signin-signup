const express = require('express')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const morgan = require('morgan')
require('dotenv').config({path: './server/config/config.env'})

//load express
const app = express()

// connect to db
connectDB()

//body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// cookie Parser
app.use(cookieParser())

//Route Middleware
app.use('/api/v1/users', require('./routes/users'));


app.get('/', (req, res) => res.send('hello'))

//morgan
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
console.log(process.env.NODE_ENV)

const PORT = process.env.PORT || 5000


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`))