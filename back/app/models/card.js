const db = require('../database')

class Card {
  constructor (obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName]
    }
  }

  /**
     * Get all cards owned by user (through deck possession)
     */
  static async cardsByUserId (userId) {
    try {
      const { rows } = await db.query('SELECT * FROM cards_of_user($1)', [userId])
      return rows.map(row => new Card(row))
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail)
      } else {
        throw error
      }
    }
  }

  /**
     * Add a card to the database
     */
  async save () {
    try {
      if (this.id) {
        // il faudra mettre à jour l'enregistrement
        // TODO : coder la mise à jour d'une carte existante
        throw new Error('La fonction de mise à jour d\'une carte existante n\'est pas encore accessible')
      } else {
        const { rows } = await db.query('INSERT INTO card (recto, verso, deck_id) VALUES($1, $2, $3) RETURNING id', [
          this.recto,
          this.verso,
          this.deckId
        ])
        this.id = rows[0].id
      }
    } catch (error) {
      console.log('Erreur SQL: ', error.detail)
      // on relance l'erreur pour le contrôleur puisse l'attraper et la retransférer au front
      throw new Error(error.detail ? error.detail : error.message)
    }
  }
}
module.exports = Card
