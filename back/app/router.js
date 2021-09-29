const {Router} = require("express");
const deckController= require("./controllers/deckController")
const checkJwt = require('./middlewares/checkJwt');
const userController= require("./controllers/userController")

const router = Router()


//Routes protégés (SPRINT 1)
/**
 * Respond with all decks in database
 * @route GET /decks
 * @param{}
 * @returns {Array<Deck>} 200 - An array of all decks
 * @returns {string} 500 - Server error
 */
router.get("/decks", deckController.getAllDecks); // Afficher tous les paquet
// Displays cards of a deck
router.get("/deck/:id/cards", deckController.getCardsFromDeck);


router.post("/login", userController.login); // Connection de l’utilisateur
router.get("/user/infos", checkJwt, userController.getOneUser);

// router.post("/signup", userController.subscribe); // Création ou modification de compte utilisateur
// router.delete("/user/:id", userController.remove); // Suppression d’un compte utilisateur
// router.get("/logout", userController.disconnecte); // Déconnection de l’utilisateur


module.exports= router;