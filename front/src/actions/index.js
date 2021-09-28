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
export const getAllDecks = (decks) => {
  return {
    type: GET_DECKS,
    decks
  }
}


export const ADMIN = 'ADMIN'
export const DISCONNECT = 'DISCONNECT'

export const SET_CURRENT_DECK_ID = 'SET_CURRENT_DECK_ID'
export const GET_CURRENT_DECK_CONTENT = 'GET_CURRENT_DECK_CONTENT'
export const getCurrentDeckContent = (currentDeckContent) => {
  return {
   type: GET_CURRENT_DECK_CONTENT,
    currentDeckContent
  }
}

export const FETCH_CARDS = "FETCH_CARDS"