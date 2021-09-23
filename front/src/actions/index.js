export const GET_DECKS = "GET_DECKS";

export const GetAllDecks = (decks) => {
    return {
    type: GET_DECKS,
    decks,
    }
}
