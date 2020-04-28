const jwt = require('jsonwebtoken')

let auth = (req, res, next) => {
  //get token from cookies
  let token = req.cookies.x_auth
  if(!token) 
  return res.status(400).send('Access Denied')

  //verify user token
  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET)

    req.user = verifiedUser

    next()
  } catch (error) {
    return res.status(400).json({
      isAuth: false,
      error: true
    })
  }
}

module.exports = {auth}