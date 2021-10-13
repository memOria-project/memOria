const db = require('../database')

class Deck {
  constructor (obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName]
    }
  }

  static async allDecks () {
    try {
      const queryString = {
        text: `
                SELECT
                    deck.id,
                    title,
                    deck.created_at, 
                    tag, 
                    (count(card.id))::int as card_number
                FROM deck
                LEFT JOIN card ON deck.id = deck_id
                GROUP BY deck.id
                ORDER BY deck.id
                `
      }
      const { rows } = await db.query(queryString)
      return rows.map(row => new Deck(row))
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail)
      } else {
        throw error
      }
    }
  }

  static async findAllCardsFromDeck (deckId) {
    try {
      const { rows } = await db.query('SELECT * FROM allcardsFromDeck($1)', [deckId])
      console.log(rows[0])
      if (rows[0]) {
        const deckWithItsCards = rows[0]
        return deckWithItsCards
      }
      return {
        deckId: deckId,
        status: 'empty'
      }
    } catch (error) {
      console.log(error)
      if (error.detail) {
        throw new Error(error.detail)
      }
      throw error
    }
  }

  // static async decksByUserId (userId) {
  //   try {
  //     const { rows } = await db.query('SELECT id, title, tag FROM deck WHERE user_id=$1', [userId])
  //     return rows.map(row => new Deck(row))
  //   } catch (error) {
  //     if (error.detail) {
  //       throw new Error(error.detail)
  //     } else {
  //       throw error
  //     }
  //   }
  // };

  // ---------------------------------------------------------------

  /**
   * Get all decks owned by user (through deck possession)
   */
  static async decksByUserId (userId) {
    try {
      const queryString = {
        text: `
          SELECT
              deck.id,
              title,
              deck.created_at, 
              tag, 
              (count(card.id))::int as card_number
          FROM deck
          LEFT JOIN card ON deck.id = deck_id
          WHERE user_id = $1
          GROUP BY deck.id
          ORDER BY deck.id
          `,
        values: [userId]
      }
      const { rows } = await db.query(queryString)
      // const { rows } = await db.query('SELECT * FROM decks_of_user($1)', [userId])
      return rows.map(row => new Deck(row))
    } catch (error) {
      if (error.detail) {
        throw new Error(error.detail)
      } else {
        throw error
      }
    }
  }

  /**
   * Add a deck to the database
   */
  async save () {
    try {
      if (this.id) {
        const { rows } = await db.query('SELECT * FROM deck WHERE id=$1', [this.id])
        const deckUserId = rows[0].user_id

        if (this.userId === deckUserId) {
          await db.query('UPDATE "deck" SET title = $1, tag = $2, user_id = $3 WHERE id = $4 ;',
            [this.title, this.tag, this.userId, this.id])
          return {
            deckId: this.id,
            status: 'updated'
          }
        };
        throw new Error('User is not allowed to update this deck')
      } else {
        const { rows } = await db.query('INSERT INTO "deck" (title, tag, user_id) VALUES ($1, $2, $3) RETURNING id;',
          [this.title, this.tag, this.userId])
        this.id = rows[0].id
        return {
          deckId: this.id,
          status: 'saved'
        }
      }
    } catch (error) {
      console.log(error)
      if (error.detail) {
        throw new Error(error.detail)
      } else {
        throw error
      }
    }
  }

  /**
   * Add a deck to the database
   */
  async delete () {
    try {
      const statusdeck = await db.query('SELECT is_deck_owner($1, $2)', [this.id, this.userId])
      if (!statusdeck.rows[0].is_deck_owner) {
        throw new Error('User is not allowed to delete this deck')
      }
      const { rows } = await db.query('DELETE FROM deck WHERE id=$1', [this.id])
      if (rows) {
        return { id: this.id, status: 'deleted' }
      }
    } catch (error) {
      // on relance l'erreur pour que le contrôleur puisse l'attraper et la retransférer au front
      throw new Error(error.detail ? error.detail : error.message)
    }
  }
}
module.exports = Deck
