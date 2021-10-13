import { useSelector, useDispatch } from 'react-redux'
import { FETCH_CARDS, SET_CURRENT_DECK_ID, EDIT_CARD, DELETE_CARD } from '../../actions'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import './DeckEditor.scss'
import Loading from '../Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const DeckEditor = () => {
  const [loading, setLoading] = useState(true);
  const { deckEditorDeckId } = useParams();

  const deckId = deckEditorDeckId
  const {currentDeckId} = useSelector((state)=> state.currentDeck.currentDeckContent)


  useEffect(() => {
    dispatch({ type: SET_CURRENT_DECK_ID, currentDeckId: deckId })
  }, [])




  const dispatch = useDispatch()
  const {currentDeckContent} = useSelector(state => state.currentDeck)
  const currentDeckInEditor = useSelector(state => state.currentDeck).currentDeckContent.cards
  const nameOfDeck = useSelector((state) => state.currentDeck.currentDeckContent.title)

  useEffect(()=> {
    dispatch({ type: FETCH_CARDS })
    if(!currentDeckContent&&!currentDeckInEditor||currentDeckInEditor){
      setLoading(false);
    }
  }, [currentDeckId])

  if(currentDeckInEditor){
    currentDeckInEditor.sort(function (a, b) { return a.id - b.id})
  }
  console.log('currentDeckInEditor', currentDeckInEditor);

  const handleClick = (event) => {
    if(event.target.parentNode.id){
    const clickedCard = event.target.parentNode.id
    const cardContent = currentDeckInEditor.find((card) => clickedCard == card.id)
    dispatch({type:EDIT_CARD, field:[{"field":"recto",
      "value": cardContent.recto}, {"field":"verso", "value":cardContent.verso}]})
    }
    else{
      console.log(event)
      const cardId = parseInt(event.target.id, 10)
      dispatch({type:DELETE_CARD, cardId});
    }
    }
  
  // const handleClickDelete = (event) => {
  //   console.log(event)
  //   const cardId = event.target.id
  //   dispatch({type:DELETE_CARD, cardId});

  // }
  //counter for cards
  let count = 1
  // 
  return (
    <div>
      <div className="cardEditor__header">
        <div> 
        <h2 className="header__title">{nameOfDeck}</h2>
        {/* <h3>{currentDeckInEditor.length} cartes</h3> */}
        <button>Editer le nom</button>
        </div>
        <div className="header__newCard">
          <NavLink to={`/cardEditor/${deckId}/new`}>
            <p>+ <br /> Nouvelle <br /> Carte</p>
          </NavLink>
        </div>
      </div>
       {/* <h2 className="header__undertitle">Cartes du paquet</h2>  */}
      {currentDeckInEditor&&
          (currentDeckInEditor.map((card) => {return (
            <p key={card.id} className="rectoVersoView">
              <div className="card card__recto">
              <pre className="card__content">
                <MDEditor.Markdown source={card.recto} />
                </pre>
              </div>
              <div className="card card__verso">
              <pre className="card__content">
                  <MDEditor.Markdown source={card.verso} />
                  </pre>
              </div>
              <div className="card__title">
                <p><strong>Carte n°{count++}/{currentDeckInEditor.length}</strong></p> 
                <button className="information" id={card.id} onClick={handleClick}> <NavLink to={`/cardEditor/${deckId}/${card.id}`}><FontAwesomeIcon icon={faEdit} size="2x"/></NavLink> </button>
                <button className="critic" id={card.id} onClick={handleClick}><FontAwesomeIcon icon={faTrash} size="2x"/></button> 
              </div>
            </p>)
          }
        ))}
        {!currentDeckContent&& <div> Ce paquet est vide! Vite, ajoutez une carte! </div>}
        {loading&&<Loading />}
    </div>
  )
}

export default DeckEditor

// if (currentDeckInEditor) {
//   // firstCommonDeck = currentDeckInEditor[0]["cards"];
//   //;

//   firstCommonDeck = currentDeckInEditor["currentDeckContent"]["cards"];

//   console.log("currentDeckInEditor['currentDeckContent']['cards']",currentDeckInEditor["currentDeckContent"]["cards"]);
//   console.log("firstCommonDeck", firstCommonDeck);
// }
