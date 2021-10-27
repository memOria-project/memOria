import { useSelector, useDispatch } from 'react-redux'
import { FETCH_CARDS, SET_CURRENT_DECK_ID, GET_CARD, DELETE_CARD, CHECK_TOKEN } from '../../actions'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import './DeckEditor.scss'
import Loading from '../Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
{ /* <FontAwesomeIcon icon="fa-solid fa-rectangle-vertical" /> */ }

const DeckEditor = () => {
  const [loading, setLoading] = useState(true)
  const [nameOfDeck, setNameOfDeck] = useState()
  const { deckEditorDeckId } = useParams()

  const deckId = deckEditorDeckId
  const { currentDeckId } = useSelector((state) => state.currentDeck.currentDeckContent)

  useEffect(() => {
    dispatch({ type: CHECK_TOKEN })
    dispatch({ type: SET_CURRENT_DECK_ID, currentDeckId: deckId })
  }, [])

  const dispatch = useDispatch()
  const { currentDeckContent } = useSelector(state => state.currentDeck)
  const currentDeckInEditor = useSelector(state => state.currentDeck).currentDeckContent.cards
  const { decks } = useSelector((state) => state.user)

  // ce  useEffect existe pour afficher le titre des paquets vides... pas très propre :( )
  useEffect(() => {
    if (decks.length) {
      const findDeck = decks.find((deck) => deck.id === parseInt(deckEditorDeckId, 10))
      setNameOfDeck(findDeck.title)
      // const nameOfDeck = useSelector((state) => state.currentDeck.currentDeckContent.title)
    }
  }, [decks.length])

  // ce use effect suffit pour les paquets avec des cartes.

  useEffect(() => {
    dispatch({ type: FETCH_CARDS })
    if (!currentDeckContent && !currentDeckInEditor || currentDeckInEditor) {
      setTimeout(() => setLoading(false), 1000)
    }
  }, [currentDeckId])

  if (currentDeckInEditor) {
    currentDeckInEditor.sort(function (a, b) { return a.id - b.id })
  }
  console.log('currentDeckInEditor', currentDeckInEditor)

  const handleClickEdit = (event) => {
    // pour clickedCard: si l'utilisateur a cliqué sur l'icone, l'id de la carte est récupéré via event.target.id.
    // pour clickedCard: si l'utilisateur a cliqué sur le bouton (hors icone), l'id de la carte est récupéré via event.current.target.id
    const clickedCard = event.currentTarget.id ? event.currentTarget.id : event.target.id
    const cardContent = currentDeckInEditor.find((card) => clickedCard == card.id)
    // cette conditionnelle est là pour éviter une erreur "cardContent undefined". Elle ne me semblait pas nécessaire initialement, car il ne devrait pas y avoir de cas où cardContent est undefined, mais bon...
    if (cardContent) {
      dispatch({
        type: GET_CARD,
        field: [
          {
            field: 'recto',
            value: cardContent.recto
          },
          {
            field: 'verso',
            value: cardContent.verso
          }
        ]
      })
    }
  }
  const handleClickDelete = (event) => {
    const idTakenFromIcon = event.target?.viewportElement?.parentElement?.id
    const idTakenFromButton = event.target.id
    const cardIdString = idTakenFromButton || idTakenFromIcon
    const cardId = parseInt(cardIdString, 10)
    dispatch({ type: DELETE_CARD, cardId })
  }

  // const handleClickDelete = (event) => {
  //   console.log(event)
  //   const cardId = event.target.id
  //   dispatch({type:DELETE_CARD, cardId});

  // }
  // counter for cards
  let count = 1
  //
  return (
    <div>
      <div className="cardEditor__header">
        <div>
        <h2 className="header__title">{nameOfDeck}</h2>
        {/* <h3>{currentDeckInEditor.length} cartes</h3> */}
        <FontAwesomeIcon icon={faEdit} />
        </div>
        <div className="header__newCard">
          <NavLink to={`/cardEditor/${deckId}/new`}>
            <p>+ <br /> Nouvelle <br /> Carte</p>
          </NavLink>
        </div>
      </div>
       {/* <h2 className="header__undertitle">Cartes du paquet</h2>  */}
      {currentDeckInEditor &&
          (currentDeckInEditor.map((card) => {
            return (
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
                <p ><strong>Carte n°{count++}/{currentDeckInEditor.length}</strong></p>
                <NavLink to={`/cardEditor/${deckId}/${card.id}`}>
                  <button className="information" id={card.id} onClick={handleClickEdit}>
                <FontAwesomeIcon icon={faEdit} size="2x" name={card.id} onClick={handleClickEdit}/>

                </button>
                </NavLink>
                <button className="critic" id={card.id} onClick={handleClickDelete}>
                  <FontAwesomeIcon cardId={card.id} icon={faTrash} size="2x" style={{ cursor: 'pointer' }} />
                </button>
              </div>
            </p>)
          }
          ))}
        {!currentDeckContent && !loading && <div style={{ marginTop: '2em', fontSize: '2em' }}> Ce paquet est vide! Vite, <NavLink to={`/cardEditor/${deckId}/new`}> ajoutez une carte!</NavLink> </div>}
        {loading && <Loading />}
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
