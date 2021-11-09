const JWT = require('jsonwebtoken')

module.exports = {
  makeToken: userId => {
    try {
      return JWT.sign(
        // payload
        {
          userId
        },
        // le mot de passe de chiffrement
        process.env.JWT_SECRET,
        // header
        {
          algorithm: 'HS256',
          expiresIn: '12h'
        }
      )
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  validateToken: token => {
    try {
      return JWT.verify(
        token,
        process.env.JWT_SECRET,
        {
          algorithms: ['HS256']
        }
      )
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
