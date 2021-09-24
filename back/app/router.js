const {Router} = require("express");
const deckController= require("./controllers/deckController")

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

/**
 * Respond with one deck with id
 * @route GET /deck/:id
 * @param {number} id.path.required the deck id
 * @returns {deck} 200 - A deck with this id
 * @returns {string} 500 - Server error
 */
router.get("/deck/:id", );	// Afficher un paquet par son id


/**
 * Respond with all cards from a deck specifie by each id
 * @route GET /deck/id/cards
 * @param {number} id.path.required the deck id
 * @returns {Array<Card>} 200 - An array of all cards
 * @returns {string} 500 - Server error
 */
router.get("/deck/:id/cards/", ) ;	// Afficher toutes les cartes d’un  paquet
	





//Routes  protégés (SPRINT 2)

router.post("/deck", );	            // Créer un deck ou mettre à jour un paquet
router.delete("/deck/:id", ); 		// Supprimer un deck particulier
router.post("/card" , );		    // Créer une carte ou mettre à jour une carte
router.delete("/card/:id", );		// Supprimer une carte particulière


//Bonus
router.get("/deck/query", ); 		// Récupérer un deck avec un critère particulier (par tag)
router.get("/deck/:id/carte/:id", )	// Afficher aléatoirement une à une les carte d’un - paquet  par leur id 


//Gestion du user (SPRINT 1 & 2)

router.post("/signup", );		        // Création ou modification de compte utilisateur 
router.get("/login"	, );		        // Connection de l’utilisateur
router.get("/logout" , );		        // Déconnection de l’utilisateur
router.delete("/user/:id", );    // Suppression d’un compte utilisateur


module.exports= router;