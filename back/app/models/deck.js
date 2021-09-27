const db= require("../database");
 
 class Deck {
     constructor(obj = {}) {
         for (const propName in obj) {
             this[propName] = obj[propName];
         }
     }
 
     static async allDecks() {
         try {
             const {rows} = await db.query('SELECT * FROM deck');
             return rows.map(row => new Deck(row));
         } catch (error) {
             if (error.detail) {
                 throw new Error(error.detail)
             } else {
                 throw error
             }
         }
     };

     static async findAllcardsFromDeck(deckId) {
         try {
             const {row} = await db.query('SELECT AllcardsFromDeck(deckId=$1)', [deckId]);
             return rows.map(row => new Deck(row));
     
         } catch(error) {
             console.log(error);
             if (error.detail) {
             // Erreur venant de postgresql
             throw new Error(error.detail);
             }
             throw error;
         }
     }


 }
 module.exports = Deck;
