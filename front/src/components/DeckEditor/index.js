import { useSelector, useDispatch } from 'react-redux'
import { FETCH_CARDS, SET_CURRENT_DECK_ID, GET_CARD, DELETE_CARD, CHECK_TOKEN } from '../../actions'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import './DeckEditor.scss'
import Loading from '../Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { handleClickEdit, handleClickDelete } from './handleClick'
{ /* <FontAwesomeIcon icon="fa-solid fa-rectangle-vertical" /> */ }

const DeckEditor = () => {
  const [loading, setLoading] = useState(true)
  const [nameOfDeck, setNameOfDeck] = useState()
  const { deckEditorDeckId } = useParams()
  const deckIdFromParams = parseInt(deckEditorDeckId, 10)

  useEffect(() => {
    dispatch({ type: CHECK_TOKEN })
    dispatch({ type: SET_CURRENT_DECK_ID, deckId: deckIdFromParams })
  }, [])

  const dispatch = useDispatch()
  const { deckId } = useSelector((state) => state.currentDeck)
  const currentDeckInEditor = useSelector(state => state.currentDeck).cards
  const { decks } = useSelector((state) => state.user)

  // ce  useEffect existe pour afficher le titre des paquets vides... pas très propre :( )
  useEffect(() => {
    if (decks.length) {
      const findDeck = decks.find((deck) => deck.id === parseInt(deckEditorDeckId, 10))
      setNameOfDeck(findDeck.title)
      // const nameOfDeck = useSelector((state) => state.currentDeck.title)
    }
  }, [decks.length])

  // ce use effect suffit pour les paquets avec des cartes.

  useEffect(() => {
    dispatch({ type: FETCH_CARDS })
    if (!currentDeckInEditor && !currentDeckInEditor || currentDeckInEditor) {
      setTimeout(() => setLoading(false), 1000)
    }
  }, [deckId])

  if (currentDeckInEditor) {
    currentDeckInEditor.sort(function (a, b) { return a.id - b.id })
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
        {!currentDeckInEditor && !loading && <div style={{ marginTop: '2em', fontSize: '2em' }}> Ce paquet est vide! Vite, <NavLink to={`/cardEditor/${deckId}/new`}> ajoutez une carte!</NavLink> </div>}
        {loading && <Loading />}
    </div>
  )
}

export default DeckEditor
