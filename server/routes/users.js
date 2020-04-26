const router = require('express').Router()
const User = require('../models/User')

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

module.exports = router