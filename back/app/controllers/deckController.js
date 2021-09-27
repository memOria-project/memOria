
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

    getCardsFromDeck: async function (request, response) {
        try {
            const data = await Deck.findAllcardsFromDeck(request.params.id);
            response.status(200).json(data);
    
        } catch(error) {
            console.log(error);
            response.status(500).json(error.message)
        }
    }




}

module.exports= deckController;

