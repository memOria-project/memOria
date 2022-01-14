import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { NavLink, useParams, useLocation, Redirect, useHistory } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faPlus } from '@fortawesome/free-solid-svg-icons'

import Loading from '../Loading'
import ExportDeck from './ExportDeck'
import Delete from './Delete'
import DeleteModal from './DeleteModal'
import Edit from './Edit'
import NoMatch from '../NoMatch'
import NewDeckForm from '../Profile/NewDeckForm'
import { DELETE_DECK, FETCH_USER_DECKS, SET_CURRENT_DECK_CONTENT, SET_LAST_ACTION } from '../../actions'

import './DeckEditor.scss'
import './DeckEditor_desktop.scss'

const DeckEditor = () => {
  const deckIdFromParams = parseInt(useParams().deckId, 10)
  const location = useLocation()
  const editedCardId = location.state?.editedCardId

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showDeckModal, setShowDeckModal] = useState(false)
  const { id } = useSelector((state) => state.currentDeck)
  const { currentDeck } = useSelector((state) => state)
  const { cards } = currentDeck
  const history = useHistory()
  const dispatch = useDispatch()

  const toView = `/deck/${id}/0`
  const { decks, isConnected, lastAction } = useSelector((state) => state.user)
  const cardRef = useRef([])
  console.log(cardRef)
  const resetDeck = {
    id: '', title: '', tags: '', cards: ''
  }

  useEffect(() => {
    dispatch({ type: FETCH_USER_DECKS })
    dispatch({ type: SET_CURRENT_DECK_CONTENT, currentDeckContent: resetDeck })
    dispatch({ type: SET_LAST_ACTION, lastAction: '' })
    // set focus if the card has been deleted or edited.
    const myCard = document.getElementById(editedCardId)
    if (myCard) {
      myCard.focus()
    }
  }
  , [])

  useEffect(() => {
    let deckToBeDisplayed

    if (decks?.length > 0) {
      deckToBeDisplayed = decks.find((deck) => deckIdFromParams === deck.id)
      if (deckToBeDisplayed) {
        dispatch(
          {
            type: SET_CURRENT_DECK_CONTENT,
            currentDeckContent: deckToBeDisplayed
          })
      }
    }
  }, [decks])

  // redirection si paquet supprimé
  useEffect(() => {
    console.log('last action modifié')
    if (lastAction === DELETE_DECK) {
      history.push('/profile')
    }
  }, [lastAction])

  // classement des cartes par id croissant
  if (cards) {
    cards.sort(function (a, b) { return a.id - b.id })
  }

  // pour le loading spinner
  useEffect(() => {
    if (cards) {
      setTimeout(() => setLoading(false), 500)
    } else {
      setTimeout(() => setLoading(false), 3000)
    }
  }, [id])

  return (
    isConnected && currentDeck.id
      ? <div>
      <div className="cardEditor__header">
        <div className="header__titleBlock">
          <div className="header__deckTitleBlock">
            <h2 className="header__title">{currentDeck.title}</h2>
            <div className="header__icon">
              <FontAwesomeIcon icon={faEdit} onClick={() => setShowDeckModal(true)} style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div className="header__undertitleBlock">
            <NavLink to={toView}>
              <FontAwesomeIcon icon={faEye} size="2x"/>
            </NavLink>
            <ExportDeck cards={cards} title={currentDeck.title} />
            <Delete isDeck={true} size="1x" showModal={showDeleteModal} setShowModal={setShowDeleteModal} />
          </div>
        </div>
        <div className="header__newCard header__newCard__recto">
          <NavLink to={`/cardEditor/${id}/new`}>
              <FontAwesomeIcon icon={faPlus} size="3x" style={{ color: '#16a085' }} />
          </NavLink>
        </div>

      </div>
      {cards &&
          (cards.map((card) => {
            return (
            <p key={card.id} tabIndex="0" id={card.id} className="rectoVersoView">
              <div className="card card__recto">
                <MDEditor.Markdown source={card.recto} />
              </div>
              <div className="card card__verso">
                  <MDEditor.Markdown source={card.verso} />
              </div>
              <div className="card__title">
                <p ><strong>Carte n°{cards.indexOf(card) + 1}/{cards.length}</strong></p>
                <Edit card={card} deckId={id} />
                <Delete card={card} />
              </div>
            </p>)
          }
          ))}
        {!cards?.length && !loading && <div style={{ marginTop: '2em', fontSize: '2em' }}> Ce paquet est vide! Vite, <NavLink to={`/cardEditor/${id}/new`}> ajoutez une carte!</NavLink> </div>}
        {loading && <Loading />}
        {showDeleteModal && <DeleteModal isDeck={true} setShowModal={setShowDeleteModal}/>}
        {showDeckModal && <NewDeckForm handleClick={() => setShowDeckModal((state) => !state)} setShowNewDeck={setShowDeckModal} isEdit={true} />}
    </div>
      : loading ? <Loading /> : <NoMatch reason="deck" />
  )
}

export default DeckEditor
