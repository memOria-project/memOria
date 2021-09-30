import { useSelector, useDispatch } from 'react-redux'
import Deck from '../Deck';
import { FETCH_CARDS, SET_CURRENT_DECK_ID } from '../../actions'
import { useEffect } from 'react'
import './DeckEditor.scss'

const DeckEditor = () => {

  

  // const personalizedDecks = useSelector((state)=>(state.user.decks));
  // console.log(personalizedDecks);


  const dispatch = useDispatch();

  //temporary: access to common deck for testing purpose
  const deckId = 1;
    
  dispatch({ type: SET_CURRENT_DECK_ID, currentDeckId: deckId});
  dispatch({ type: FETCH_CARDS });
  
  
  

  

  let commonDecks = useSelector((state)=>(state.currentDeck))
  console.log("commonDecks", commonDecks);


  let firstCommonDeck;

  // if (commonDecks) {
  //   // firstCommonDeck = commonDecks[0]["cards"];
  //   //;

  //   firstCommonDeck = commonDecks["currentDeckContent"]["cards"];


  //   console.log("commonDecks['currentDeckContent']['cards']",commonDecks["currentDeckContent"]["cards"]);
  //   console.log("firstCommonDeck", firstCommonDeck);
  // }
    
  

  

  return (
    <div>
      <p>Liste des cartes du deck :</p>
      {commonDecks? firstCommonDeck["currentDeckContent"]["cards"].map((card) => {return (
        <p className="rectoVersoView">
          <p className="card">{card.recto}</p>
          <p className="card">{card.verso}</p>
        </p>)})
        : <p>Loading...</p>}
    </div>
    )

}

export default DeckEditor