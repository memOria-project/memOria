const db= require("../database");
 
class Deck {
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }
 
    static async allDecks() {
        try {
            const queryString = {
                text: `
                SELECT
                    deck.id,
                    title,
                    deck.created_at, 
                    tag, count(card.id) as card_number
                FROM deck
                LEFT JOIN card ON deck.id = deck_id
                GROUP BY deck.id
                ORDER BY deck.id
                `
            }
            const {rows} = await db.query(queryString);
            return rows.map(row => new Deck(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error
            }
        }
    }

     static async findAllcardsFromDeck(id) {
         try {
             const {rows} = await db.query('SELECT * FROM allcardsFromDeck($1)', [id]);
            //  console.log(rows[0])
             const deckWithItsCards = rows[0]
             return deckWithItsCards;
     
         } catch(error) {
             console.log(error);
             if (error.detail) {
             throw new Error(error.detail);
             }
             throw error;
         }
     }

 

    static async decksByUserId(userId) {
        try {
            const {rows} = await db.query('SELECT id, title, tag FROM deck WHERE user_id=$1', [userId]);
            return rows.map(row => new Deck(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error
            }
        }
    }
}
module.exports = Deck;
