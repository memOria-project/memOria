const { Router } = require('express')
const checkJwt = require('./middlewares/checkJwt')
const deckController = require('./controllers/deckController')
const userController = require('./controllers/userController')
const cardController = require('./controllers/cardController')

const router = Router()

// Routes protégés (SPRINT 1)
/**
 * Respond with all decks in database
 * @route GET /decks
 * @param{}
 * @returns {Array<Deck>} 200 - An array of all decks
 * @returns {string} 500 - Server error
 */
router.get('/decks', deckController.getAllDecks) // Afficher tous les paquet

router.post('/login', userController.login) // Connection de l’utilisateur
router.get('/user/infos', checkJwt, userController.getOneUser)

/**
 * Respond with all cards of the connected user
 * @route GET /user/cards
 * @param{}
 * @returns {Array<Card>} 200 - An array of all cards
 * @returns {string} 500 - Server error
 */
// Displays cards of a user
router.get('/user/cards', checkJwt, cardController.getCardsFromUser)

// Save or update card of a user
router.post('/card', checkJwt, cardController.save)

 router.post("/signup", userController.subscribe); // Création  de compte utilisateur
 router.post("/user/update", checkJwt, userController.update); //  modification de compte utilisateur
// router.delete("/user/:id", userController.remove); // Suppression d’un compte utilisateur
// router.get("/logout", userController.disconnecte); // Déconnection de l’utilisateur

// Displays cards of a deck
router.get('/deck/:id/cards', deckController.getCardsFromDeck)

module.exports = router
