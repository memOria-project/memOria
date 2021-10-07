const User = require('../models/user')
const Deck = require('../models/deck')
const jwt = require('../services/jwt')
const userController = {

  getOneUser: async function (request, response) {
    try {
      const user = await User.findOne(request.userId)

      response.setHeader('Access-Control-Expose-Headers', 'Authorization')
      response.setHeader('Authorization', jwt.makeToken(user.id))

      // récupère la liste des deck appartenant à user
      // get decks list owned by user
      if (user.id) {
        user.decks = await Deck.decksByUserId(user.id)
      }

      response.status(200).json(user)
    } catch (error) {
      console.log(error)
      response.status(500).json(error.message)
    }
  },

  subscribe: async function (request, response) {
    try {
      const user = await new User(request.body).save()

      response.setHeader('Access-Control-Expose-Headers', 'Authorization')
      response.setHeader('Authorization', jwt.makeToken(user.id))

      response.status(201).json({ message: `New user ${request.body.name} is registered` })
    } catch (error) {
      console.log(error)
      response.status(500).json(error.message)
    }
  },

  update: async function (request, response) {
    try {
      request.body.id = request.userId
      await new User(request.body).change()
      response.status(200).json({ message: `User ${request.body.name} has been updated` })
    } catch (error) {
      console.log(error)
      response.status(500).json(error.message)
    }
  },

  login: async function (request, response) {
    try {
      const user = await new User(request.body).Login()

      // récupère la liste des deck appartenant à user
      // get decks list owned by user
      /*
      if (user.id) {
        user.decks = await Deck.decksByUserId(user.id)
      }
      */

      // this header gives access to following header Authorization
      response.setHeader('Access-Control-Expose-Headers', 'Authorization')

      // Send token in header
      response.setHeader('Authorization', jwt.makeToken(user.id))
      response.status(200).json(user)
    } catch (error) {
      console.log(error)
      response.status(500).json(error.message)
    }
  },

  remove: async function (request, response) {
    try {
      const data = await User.delete(parseInt(request.params.id, 10))
      response.status(200).json(data)
    } catch (error) {
      console.log(error)
      response.status(500).json(error.message)
    }
  }

}

module.exports = userController
