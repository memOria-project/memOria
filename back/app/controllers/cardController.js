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
      const card = new Card(request.body) // on contruit la carte avec le Json envoyé par le Front
      card.userId = request.userId // on récupère le userId qu'on a extrait du Payload depuis checkJwt.js
      const data = await card.save() // on crée la carte ou, si elle existe déjà, on la met à jour
      response.status(request.body.id ? 204 : 201).json(data) // 201 => created ; 204 => ok !
    } catch (error) {
      console.log('Card controller error message:', error.message)
      response.status(500).json(error.message)
    }
  }
}

module.exports = cardController
