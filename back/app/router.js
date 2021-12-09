const { Router } = require('express')
const checkJwt = require('./middlewares/checkJwt')
const sanitizer = require('./middlewares/sanitizer')
const deckController = require('./controllers/deckController')
const userController = require('./controllers/userController')
const cardController = require('./controllers/cardController')

const router = Router()

// LES ROUTES DES DECKS
/**
 * Respond with all decks in database
 * @route GET /decks
 * @returns {Array<Deck>} 200 - An array of all decks
 * @returns {string} 500 - Server error
 */
router.get('/decks', deckController.getAllDecks) // Afficher tous les paquet
router.get('/deck/:id/', deckController.getCardsFromDeck) // Displays cards of a deck

router.post('/deck', checkJwt, deckController.save)
router.delete('/deck/:id', checkJwt, deckController.remove) // supprime un paquet

/** Création  de compte utilisateur
 * Respond with all cards of the connected user
 * @route POST /signup
 * @returns {integer<id>} 201 - An integer of user id
 * @returns {string} 500 - Server error
 */
router.post('/signup', sanitizer, userController.subscribe)

router.post('/login', sanitizer, userController.login) // Connection de l’utilisateur
router.get('/user/infos', checkJwt, userController.getOneUser)
router.post('/user/update', checkJwt, sanitizer, userController.update) //  modification de compte utilisateur

// Displays cards of a user
/**
 * Respond with all cards of the connected user
 * @route GET /user/cards
 * @returns {Array<Deck>} 200 - An array of all cards
 * @returns {string} 500 - Server error
 */
router.get('/user/cards', checkJwt, cardController.getCardsFromUser)

// Save or update card of a user
/**
 * Respond with all cards of the connected user
 * @route POST /cards
 * @returns {integer<id>} 201 - An integer of card id
 * @returns {} 204 - Empty response
 * @returns {string} 500 - Server error
 */
router.post('/card', checkJwt, sanitizer, cardController.save)

// Delay a card for a specific user
/**
 * Respond with the id of the delayed card and the date of the new delay
 * @route POST /card/delay
 * @returns {integer<cardId>, timestamptz<toDate>} 200 - The delayed card id as integer, a delaying date as TIMESTAMPTZ
 * @returns {string} 500 - Server error
 */
router.post('/card/delay', checkJwt, sanitizer, cardController.delay)

// Remove any delay on a specific card for a connected user
/**
 * Respond with the id of the delayed card and the date of the new delay
 * @route DELETE /card/delay
 * @returns {integer<removedDelayId>, integer<cardId>} 200 - The remove delay id as integer, the concerned card id 
 * @returns {string} 500 - Server error
 */
 router.delete('/card/delay', checkJwt, cardController.removeDelay)


// Delete a card of a user
/**
 * Respond with all cards of the connected user
 * @route DELETE /card
 * @returns {} 204 - Empty response
 * @returns {string} 500 - Server error
 */
router.delete('/card', checkJwt, cardController.delete)

module.exports = router
