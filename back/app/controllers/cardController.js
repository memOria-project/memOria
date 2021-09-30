const Card = require('../models/card')

const cardController = {
  getCardsFromUser: async (request, response) => {
    try {
      const cards = await Card.cardsByUserId(request.userId)
      response.status(200).json(cards)
    } catch (error) {
      console.log(error)
      response.status(500).json(error.message)
    }
  }
}

module.exports = cardController
