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
      response.status(request.body.id ? 200 : 201).json(data) // 201 => created ; 204 => ok !
    } catch (error) {
      console.log('Card controller error message:', error.message)
      response.status(500).json(error.message)
    }
  },

  delay: async (request, response) => {
    try {
      const card = new Card(request.body) // on contruit la carte avec le Json envoyé par le Front
      await card.doesExist
      const delayedCard = await card.addDelay(request.userId) // on reporte la carte pour le user dont on a extrait l'id du Payload depuis checkJwt.js
      response.status(201).json(delayedCard) // 201 => delay created
    } catch (error) {
      console.log('Card controller error message:', error.message)
      response.status(500).json(error.message)
    }
  },

  removeDelay: async (request, response) => {
    try {
      const card = new Card(request.body) // on contruit la carte avec le Json envoyé par le Front
      // await card.doesExist
      const removedDelay = await card.removeDelay(request.userId) // on retire le report de la carte pour le user dont on a extrait l'id du Payload depuis checkJwt.js
      response.status(200).json(removedDelay) // 200 => delay removed
    } catch (error) {
      console.log('Card controller error message:', error.message)
      response.status(500).json(error.message)
    }
  },

  delete: async (request, response) => {
    try {
      request.body.userId = request.userId // on récupère le userId qu'on a extrait du Payload depuis checkJwt.js
      const card = new Card(request.body) // on contruit la carte avec le Json envoyé par le Front
      const data = await card.delete() // on supprime la carte
      console.log('in controller', data)

      response.status(200).json(data) // 200 => ok
      // response.status(200).send(`Card #${card.id} has been deleted`) // 200 => ok
    } catch (error) {
      console.log('Card controller error message:', error.message)
      response.status(500).json(error.message)
    }
  }
}

module.exports = cardController
