export const GET_DECKS = 'GET_DECKS'
export const FETCH_DECKS = 'FETCH_DECKS'
export const LOG_IN = 'LOG_IN'
export const UPDATE_LOGIN = 'UPDATE_LOGIN'
export const UPDATE_USER = 'UPDATE_USER'
export const GET_USER = 'GET_USER'
export const DELETE_TOKEN = 'DELETE_TOKEN'
export const PICK_DEFAULT_CARD_SIDE = 'PICK_DEFAULT_CARD_SIDE'
export const RETURN_CARD = 'RETURN_CARD'
export const RESET_CARD = 'RESET_CARD'
export const CHECK_TOKEN = 'CHECK_TOKEN'
export const UPDATE_SESSION = 'UPDATE_SESSION'
export const GET_CARD = 'GET_CARD'
export const POST_CARD = 'POST_CARD'
export const SUBSCRIBE = 'SUBSCRIBE'
export const SET_AS_MODIFIED = 'EDIT CURRENT DECK'
export const PICK_NEW_GAME = 'PICK_NEW_GAME'
export const DELETE_CARD = 'DELETE_CARD'
export const DELAY_CARD = 'DELAY_CARD'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const CREATE_DECK = 'CREATE_DECK'
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS'
export const FETCH_USER_DECKS = 'FETCH_USER_DECKS'
export const UPDATE_USER_DECKS = 'UPDATE_USER_DECKS'
export const SET_CURRENT_DECK_CONTENT = 'SET_CURRENT_DECK_CONTENT'
export const PICK_ORDER = 'PICK_ORDER'
export const DELETE_DECK = 'DELETE_DECK'
export const getAllDecks = (decks) => {
  return {
    type: GET_DECKS,
    decks
  }
}
export const ADMIN = 'ADMIN'
export const DISCONNECT = 'DISCONNECT'

export const SET_CURRENT_DECK_ID = 'SET_CURRENT_DECK_ID'

export const FETCH_CARDS = 'FETCH_CARDS'
