const db= require("../database");
 const pool = require('../database');
 
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
     }
 }
 module.exports = Deck;