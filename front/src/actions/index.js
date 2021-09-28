export const GET_DECKS = 'GET_DECKS'
export const FETCH_DECKS = 'FETCH_DECKS'
export const LOG_IN = 'LOG_IN'
export const UPDATE_LOGIN = 'UPDATE_LOGIN'
export const UPDATE_USER = 'UPDATE_USER'
export const GET_USER = 'GET_USER'
export const DELETE_TOKEN = 'DELETE_TOKEN'
export const PICK_ORDER = 'PICK_ORDER'
export const RETURN_CARD = 'RETURN_CARD'
export const RESET_CARD= 'RESET_CARD'
export const CHECK_TOKEN = 'CHECK_TOKEN'
export const UPDATE_SESSION = 'UPDATE_SESSION'

export const getAllDecks = (decks) => {
  return {
    type: GET_DECKS,
    decks
  }
}

export const ADMIN = 'ADMIN'
export const DISCONNECT = 'DISCONNECT'
