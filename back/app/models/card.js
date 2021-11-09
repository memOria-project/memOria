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
  static async doesExist (cardId) {
    try {
      await db.query('SELECT id FROM card WHERE id=$1', [cardId])
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail)
      } else {
        throw error
      }
    }
  }

  /**
   * Get all cards owned by user (through deck possession)
   */
  static async cardsByUserId (userId) {
    try {
      const { rows } = await db.query('SELECT * FROM decks_of_user($1)', [userId])
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
 * Get all delayer cards by user
 */
  static async hasBeenDelayedBy (userId) {
    try {
      const { rows } = await db.query(`
        SELECT array_agg(delay.card_id) as delayed_card
        FROM delay
        WHERE user_id=$1`,
      [userId])
      return [...new Set(rows[0].delayed_card)] // send a filtered arrays removing duplicated elm
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail)
      } else {
        throw error
      }
    }
  }

  /**
   * Add a card to the database or update if it exists yet
   */
  async save () {
    try {
      if (this.id) {
        // DONE : une alternative avec une fonction SQL maison
        // TODO : tester si is_card_owner($1, $2), [this.id, this.userId]
        const statusCard = await db.query('SELECT is_card_owner($1, $2)', [this.id, this.userId])
        if (!statusCard.rows[0].is_card_owner) {
          throw new Error('User is not allowed to update this card')
        }
        if (this.deckId) {
          const statusDeck = await db.query('SELECT is_deck_owner($1, $2)', [this.deckId, this.userId])
          if (!statusDeck.rows[0].is_deck_owner) {
            throw new Error('User is not allowed to add any card in this deck')
          }
        }
        const { rows } = await db.query('SELECT update_card($1)', [this])
        if (rows[0]) {
          return { id: this.id, status: 'updated' }
        }

        // throw new Error('La fonction de mise à jour d\'une carte existante n\'est pas encore accessible')
      } else {
        const status = await db.query('SELECT is_deck_owner($1, $2)', [this.deckId, this.userId])
        if (!status.rows[0].is_deck_owner) {
          throw new Error('User is not allowed to add any card in this deck')
        }
        const { rows } = await db.query('SELECT create_card($1) AS id', [this])
        if (rows) {
          return { id: rows[0].id, status: 'saved' }
        }
      }
    } catch (error) {
      // on relance l'erreur pour le contrôleur puisse l'attraper et la retransférer au front
      throw new Error(error.detail ? error.detail : error.message)
    }
  }

  /**
   * Delete a card from the database
   */
  async delete () {
    try {
      const statusCard = await db.query('SELECT is_card_owner($1, $2)', [this.id, this.userId])
      if (!statusCard.rows[0].is_card_owner) {
        throw new Error(`User #${this.userId} is not allowed to delete card #${this.id}`)
      }
      const { rows } = await db.query('DELETE FROM card WHERE id=$1', [this.id])
      if (rows) {
        return { id: this.id, status: 'deleted' }
      }
    } catch (error) {
      // on relance l'erreur pour que le contrôleur puisse l'attraper et la retransférer au front
      throw new Error(error.detail ? error.detail : error.message)
    }
  }

  /**
 * Delay a card from the database
 */
  async addDelay (userId) {
    try {
      this.purgeDelay()
      const { rows } = await db.query('UPDATE delay SET to_date=(now()+\'1 day\'::interval) WHERE card_id=$1 AND user_id=$2 RETURNING card_id, to_date', [this.id, userId])
      console.log(!rows.length)
      if (!rows.length) {
        const newDelay = await db.query('INSERT INTO delay (card_id, user_id, to_date) VALUES ($1, $2, (now()+\'1 day\'::interval)) RETURNING card_id, to_date', [this.id, userId])
        return { cardId: newDelay.rows[0].card_id, toDate: newDelay.rows[0].to_date }
      }
      return { cardId: rows[0].card_id, toDate: rows[0].to_date }
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message)
    }
  }

  async purgeDelay () {
    try {
      await db.query('DELETE FROM delay WHERE to_date < now()')
    } catch (error) {
      throw new Error(error.detail ? error.detail : error.message)
    }
  }
}
module.exports = Card
