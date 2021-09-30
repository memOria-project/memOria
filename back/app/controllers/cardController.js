const Card = require('../models/card')

const cardController = {
  getCardsFromUser: async (request, response) => {
    try {
      const cards = await Card.cardsByUserId(request.userId)
      response.status(200).json(cards)
    } catch (error) {
      console.log('Dans le contrôleur', error.message)
      response.status(500).json(error.message)
    }
  },

  save: async (request, response) => {
    try {
      const card = new Card(request.body)
      await card.save()
      // 201 : created ; 204 updated
      response.status(request.body.id ? 204 : 201).json(card)
    } catch (error) {
      console.log('Dans le contrôleur', error.message)
      response.status(500).json(error.message)
    }
  }
}

module.exports = cardController
