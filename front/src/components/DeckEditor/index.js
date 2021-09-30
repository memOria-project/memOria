import { useSelector, useDispatch } from 'react-redux'
import { FETCH_CARDS, SET_CURRENT_DECK_ID } from '../../actions'
import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import './DeckEditor.scss'

const DeckEditor = () => {

  //params from the URL
  let { deckEditorDeckId } = useParams();
  let deckId = deckEditorDeckId;

  const dispatch = useDispatch();

  
  let currentDeckInEditor = useSelector(state => state.currentDeck).currentDeckContent.cards

  useEffect(() => {
    dispatch({ type: SET_CURRENT_DECK_ID, currentDeckId: deckId});
    dispatch({ type: FETCH_CARDS });
  }, [])
  
  
  
  console.log("currentDeckInEditor", currentDeckInEditor);



  // if (currentDeckInEditor) {
  //   // firstCommonDeck = currentDeckInEditor[0]["cards"];
  //   //;

  //   firstCommonDeck = currentDeckInEditor["currentDeckContent"]["cards"];


  //   console.log("currentDeckInEditor['currentDeckContent']['cards']",currentDeckInEditor["currentDeckContent"]["cards"]);
  //   console.log("firstCommonDeck", firstCommonDeck);
  // }
    
  

  //counter for cards
  let count = 1;

  return (
    <div>
      <p>Liste des cartes du deck :</p>
      <p className="rectoVersoView">
            <NavLink className="cardContainer" to={`/cardEditor/${deckId}/new`}>
              <p>Créez une nouvelle carte dans ce paquet</p>
              <p>Recto</p>
              <p className="card">+</p>
              <NavLink to={`/cardEditor/${deckId}/new`}>Nouvelle carte</NavLink>
            </NavLink>
            <NavLink className="cardContainer" to={`/cardEditor/${deckId}/new`}>
              <p>Verso</p>
              <p className="card">+</p>
              <NavLink to={`/cardEditor/${deckId}/new}`}>Nouvelle Carte</NavLink>
            </NavLink>
          </p>
      {currentDeckInEditor? 
        (currentDeckInEditor.map((card) => {return (
          <p className="rectoVersoView">
            <div className="cardContainer">
              <p>Carte n°{count++}/{currentDeckInEditor.length}</p>
              <p>Recto</p>
              <p className="card">{card.recto}</p>
              <NavLink to={`/cardEditor/${deckId}/${card.id}`}>Éditer la carte</NavLink>
            </div>
            <div className="cardContainer">
              <p>Verso</p>
              <p className="card">{card.verso}</p>
              <NavLink to={`/cardEditor/${deckId}/${card.id}`}>Éditer la carte</NavLink>
            </div>
          </p>)}))
        : <p>Loading...</p>}
    </div>
    )

}

export default DeckEditor