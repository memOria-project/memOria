const db= require("../database");

class Card {
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async cardsByUserId(userId) {
        try {
            const {rows} = await db.query('SELECT * FROM cards_of_user($1)',[userId]);
            return rows.map(row => new Card(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error
            }
        }
    }

}
module.exports = Card;
