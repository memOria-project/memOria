import { useSelector, useDispatch } from 'react-redux'
import Deck from '../Deck';
import { FETCH_CARDS, SET_CURRENT_DECK_ID } from '../../actions'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './DeckEditor.scss'

const DeckEditor = () => {

  // const personalizedDecks = useSelector((state)=>(state.user.decks));
  // console.log(personalizedDecks);
  const dispatch = useDispatch();

  //temporary: access to common deck for testing purpose
  const deckId = 1;
  
  let commonDecks = useSelector(state => state.currentDeck).currentDeckContent.cards

  useEffect(() => {
    dispatch({ type: SET_CURRENT_DECK_ID, currentDeckId: deckId});
    dispatch({ type: FETCH_CARDS });
  }, [])
  
  
  
  console.log("commonDecks", commonDecks);



  // if (commonDecks) {
  //   // firstCommonDeck = commonDecks[0]["cards"];
  //   //;

  //   firstCommonDeck = commonDecks["currentDeckContent"]["cards"];


  //   console.log("commonDecks['currentDeckContent']['cards']",commonDecks["currentDeckContent"]["cards"]);
  //   console.log("firstCommonDeck", firstCommonDeck);
  // }
    
  

  //counter for cards
  let count = 1;

  return (
    <div>
      <p>Liste des cartes du deck :</p>
      {commonDecks? 
        (commonDecks.map((card) => {return (
          <p className="rectoVersoView">
            <div className="cardContainer">
              <p>Carte n°{count++}/{commonDecks.length}</p>
              <p>Recto</p>
              <p className="card">{card.recto}</p>
              <NavLink to={`/profile/${deckId}/${card.id}`}>Éditer la carte</NavLink>
            </div>
            <div className="cardContainer">
              <p>Verso</p>
              <p className="card">{card.verso}</p>
              <NavLink to={`/profile/${deckId}/${card.id}`}>Éditer la carte</NavLink>
            </div>
          </p>)}))
        : <p>Loading...</p>}
    </div>
    )

}

export default DeckEditor