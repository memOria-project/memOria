export const GET_DECKS = "GET_DECKS";
export const FETCH_DECKS = "FETCH_DECKS";


export const getAllDecks = (decks) => {
    return {
    type: GET_DECKS,
    decks,
    }
}

export const AUTHENTIFY = "AUTHENTIFY";
