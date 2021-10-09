
const Deck = require('../models/deck')

const deckController = {
  getAllDecks: async function (request, response) {
    try {
      const decks = await Deck.allDecks()
      response.status(200).json(decks)
    } catch (error) {
      console.log(error)
      response.status(500).json(error.message)
    }
  },

  getCardsFromDeck: async function (request, response) {
    try {
      const data = await Deck.findAllCardsFromDeck(parseInt(request.params.id, 10))
      response.status(200).json(data)
    } catch (error) {
      console.log(error)
      response.status(500).json(error.message)
    }
  },

  getDecksFromUser: async (request, response) => {
    try {
      const decks = await Deck.decksByUserId(request.userId)
      response.status(200).json(decks)
    } catch (error) {
      console.log('Dans le contrôleur', error.message)
      response.status(500).json(error.message)
    }
  },

  // --------------------------------------------------------------------------

  save: async (request, response) => {
    try {
      request.body.userId = request.userId // on récupère le userId qu'on a extrait du Payload depuis checkJwt.js
      const data = await new Deck(request.body).save()
      response.status(request.body.id ? 200 : 201).json(data) // 201 => created ; 204 => ok !
    } catch (error) {
      console.log('deck controller error message:', error.message)
      response.status(500).json(error.message)
    }
  }

}

module.exports = deckController
