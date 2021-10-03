import { useSelector, useDispatch } from 'react-redux'
import { FETCH_CARDS, SET_CURRENT_DECK_ID, EDIT_CARD } from '../../actions'
import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import './DeckEditor.scss'

const DeckEditor = () => {

  //params from the URL
  let { deckEditorDeckId } = useParams();
  let deckId = deckEditorDeckId;

  const dispatch = useDispatch();

  
  let currentDeckInEditor = useSelector(state => state.currentDeck).currentDeckContent.cards
  const nameOfDeck = useSelector((state)=> state.currentDeck.currentDeckContent.title)

  useEffect(() => {
    dispatch({ type: SET_CURRENT_DECK_ID, currentDeckId: deckId});
    dispatch({ type: FETCH_CARDS });
  }, [])
  
  
  
  console.log("currentDeckInEditor", currentDeckInEditor);

  const handleClick = (event) => {
      const clickedCard = event.target.parentNode.id
      const cardContent = currentDeckInEditor.find((card) => clickedCard == card.id);
      dispatch({type:EDIT_CARD, field:[{"field":"recto",
      "value": cardContent.recto}, {"field":"verso", "value":cardContent.verso}]})
    }

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
      
      <div className="cardEditor__header">
        <div> 
        <h2 className="header__title">{nameOfDeck}</h2>
        {/* <h3>{currentDeckInEditor.length} cartes</h3> */}
        <button>Editer le nom</button>
        </div>
        <div class="header__newCard">
          <NavLink to={`/cardEditor/${deckId}/new`}>
            <p>+ <br /> Nouvelle <br /> Carte</p>
          </NavLink>
        </div>
      </div>
       {/* <h2 className="header__undertitle">Cartes du paquet</h2>  */}
      {currentDeckInEditor? 
        (currentDeckInEditor.map((card) => {return (
          <p className="rectoVersoView">
            <div className="cardContainer">
              <p className="card">{card.recto}</p>
            </div>
            <div className="cardContainer">
              <p className="card">{card.verso}</p>
            </div>
            <div className="card__title">
              <p><strong>Carte n°{count++}/{currentDeckInEditor.length}</strong></p> 
              <button id={card.id} onClick={handleClick}> <NavLink to={`/cardEditor/${deckId}/${card.id}`}>Éditer</NavLink> </button>
              <button id={card.id} onClick={handleClick}> Supprimer </button> 
            </div>
          </p>)}))
        : <p>Loading...</p>}
    </div>
    )

}

export default DeckEditor