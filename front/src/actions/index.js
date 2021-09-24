export const GET_DECKS = "GET_DECKS";
export const FETCH_DECKS = "FETCH_DECKS";
export const LOG_IN = "LOG_IN";

export const getAllDecks = (decks) => {
    return {
    type: GET_DECKS,
    decks,
    }
}

export const ADMIN = "ADMIN";
export const DISCONNECT = "DISCONNECT";
