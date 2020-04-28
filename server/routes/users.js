const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const { auth } = require('../middleware/auth')

//@desc       Auth user
//@route      POST /api/v1/users/auth
//@access     private
router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    // 0 = admin(true)
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  })
})

//@desc       Register new user
//@route      POST /api/v1/users/register
//@access     private
router.post('/register', async (req, res) => {
  try {  
    const savedUser = await User.create(req.body)

    return res.status(201).json({
      success: true,
      data: {
        name: savedUser.name,
      }
    })

  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message)

      return res.status(400).json({
        success: false,
        error: messages
      })

    } else {
      return res.status(500).json({
        success: false,
        error: 'server error'
      })
    }
  }
})

//@desc       Login user
//@route      POST /api/v1/users/login
//@access     private
router.post('/login', async (req, res) => {
  //check email
  const user = await User.findOne({ email: req.body.email })
  if(!user)
  return res.status(400).json({
    loginSuccess: false,
    message: 'Auth Failed, email not found'
  })
  
  //compare password
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass)
  return res.status(400).json({
    loginSuccess: false,
    message: 'Email or Password is wrong'
  })

  //generate token & expired token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  let oneHour = moment().add(1, 'hour').valueOf()

  user.token = token
  user.tokenExp = oneHour

  //save token &exp date to db
  user.save((err) => {
    if(err) return res.status(400).json({
      loginSuccess: false,
      message: 'failed asign a token'
    })
  })

  //save token &exp date to cookies
  res.cookie("x_authExp", user.tokenExp)

  res.cookie('x_auth', user.token)
    .status(200)
    .json({
      loginSuccess: true,
    })

})

//@desc       Logout user
//@route      GET /api/v1/users/logout
//@access     private
router.get('/logout', auth, async (req, res) => {
  //delete token
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '', tokenExp: '' }
  )
  if(!user)
  return res.status(500).json({
    success: false
  })

  res.cookie("x_authExp", null)
  res.cookie('x_auth', null)

  return res.status(200).send({
    success: true
    })
})

module.exports = router