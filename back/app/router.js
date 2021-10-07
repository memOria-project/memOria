const { Router } = require('express')
const checkJwt = require('./middlewares/checkJwt')
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
router.get('/decks', deckController.getAllDecks); // Afficher tous les paquet
router.get('/deck/:id/cards', deckController.getCardsFromDeck); // Displays cards of a deck

router.post('/deck', checkJwt, deckController.save);
router.delete('/deck', checkJwt, deckController.delete);
//router.get('/user/decks', checkJwt, deckController.getdecksFromUser);

 
/** Création  de compte utilisateur
 * Respond with all cards of the connected user
 * @route POST /signup
 * @returns {integer<id>} 201 - An integer of user id
 * @returns {string} 500 - Server error
 */
router.post('/signup', userController.subscribe);

router.post('/login', userController.login); // Connection de l’utilisateur
router.get('/user/infos', checkJwt, userController.getOneUser);
router.post('/user/update', checkJwt, userController.update); //  modification de compte utilisateur
router.delete("/user/:id", userController.remove); // Suppression d’un compte utilisateur
//router.get("/logout", userController.disconnecte); // Déconnection de l’utilisateur

// Displays cards of a user
/**
 * Respond with all cards of the connected user
 * @route GET /user/cards
 * @returns {Array<Deck>} 200 - An array of all cards
 * @returns {string} 500 - Server error
 */
router.get('/user/cards', checkJwt, cardController.getCardsFromUser);

// Save or update card of a user
/**
 * Respond with all cards of the connected user
 * @route POST /cards
 * @returns {integer<id>} 201 - An integer of card id
 * @returns {} 204 - Empty response
 * @returns {string} 500 - Server error
 */
router.post('/card', checkJwt, cardController.save)

// Delete a card of a user
/**
 * Respond with all cards of the connected user
 * @route DELETE /card
 * @returns {} 204 - Empty response
 * @returns {string} 500 - Server error
 */
router.delete('/card', checkJwt, cardController.delete)


module.exports = router
