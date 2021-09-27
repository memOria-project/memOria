
const Deck= require("../models/deck");

const deckController= {
    getAllDecks: async function (request, response) {
        try {
            const decks= await Deck.allDecks()
            response.status(200).json(decks)
        } catch (error) {
            console.log(error)
            response.status(500).json(error.message)
        }

    },

    getCardsFromDeck: async (request, response) => {
        try {
            const deck = await Deck.oneDeck(request.params.id);
            deck.cards = await Deck.findAllcardsFromDeck(deck.id);
            response.status(200).json(deck);
    
        } catch(error) {
            console.log(error);
            response.status(500).json(error.message)
        }
    }




}

module.exports= deckController;

