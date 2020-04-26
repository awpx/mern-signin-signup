const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 8
  },
  lastName: {
    type: String,
    maxlength: 30,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  }
}, { timestamps: true } )

userSchema.pre('save', async function(next) {
  var user = this
  
  if(user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(saltRounds)
      const hash = await bcrypt.hash(user.password, salt)

      user.password = hash
      next()

    } catch (error) {
      console.log(error)
      next(error)
    }
  }
})

module.exports = mongoose.model('user', userSchema)