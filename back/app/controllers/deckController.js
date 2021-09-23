
const Deck= require("../models/deck");

const deckController= {
    getAllDecks: async function (request, response) {
        try {
            const decks= await Deck.allDecks()
            response.json(decks)
        } catch (error) {
            console.log(error)
            response.status(500).json(error.message)
        }

    }
}

module.exports= deckController