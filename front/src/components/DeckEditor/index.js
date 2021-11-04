import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faPlus } from '@fortawesome/free-solid-svg-icons'

import Loading from '../Loading'
import { FETCH_USER_DECKS, getCurrentDeckContent } from '../../actions'

import './DeckEditor.scss'
import './DeckEditor_desktop.scss'

import ExportDeck from './ExportDeck'
import Delete from './Delete'
import Edit from './Edit'
import NoMatch from '../NoMatch'

const DeckEditor = () => {
  const deckIdFromParams = parseInt(useParams().deckId, 10)

  const [loading, setLoading] = useState(true)
  const { id } = useSelector((state) => state.currentDeck)
  const { currentDeck } = useSelector((state) => state)
  const { cards } = currentDeck

  const dispatch = useDispatch()

  const toView = `/deck/${id}/0`
  const { decks, isConnected } = useSelector((state) => state.user)

  useEffect(() => {
    console.log('I fire once')
    dispatch({ type: FETCH_USER_DECKS })
    dispatch(getCurrentDeckContent({ id: '', title: '', tags: '', cards: '' }))
  }
  , [])

  useEffect(() => {
    let deckToBeDisplayed

    if (decks?.length > 0) {
      deckToBeDisplayed = decks.find((deck) => deckIdFromParams === deck.id)
      if (deckToBeDisplayed) {
        dispatch(getCurrentDeckContent(deckToBeDisplayed))
      }
    }
  }, [decks])

  // classement des cartes par id croissant
  if (cards) {
    cards.sort(function (a, b) { return a.id - b.id })
  }

  // pour le loading spinner
  useEffect(() => {
    if (cards) {
      setTimeout(() => setLoading(false), 500)
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
              <FontAwesomeIcon icon={faEdit} />
            </div>
          </div>
          <div className="header__undertitleBlock">
            <NavLink to={toView}>
              <FontAwesomeIcon icon={faEye} size="2x"/>
            </NavLink>
            <ExportDeck cards={cards} title={currentDeck.title} />
          </div>
        </div>
        <div className="header__newCard header__newCard__recto">
          <NavLink to={`/cardEditor/${id}/new`}>
              <FontAwesomeIcon icon={faPlus} size="3x" style={{ color: '#16a085' }} />
          </NavLink>
        </div>

      </div>
      {cards && cards[0] &&
          (cards.map((card) => {
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
                <p ><strong>Carte n°{cards.indexOf(card) + 1}/{cards.length}</strong></p>
                <Edit card={card} deckId={id} />
                <Delete card={card} />
              </div>
            </p>)
          }
          ))}
        {cards && !cards[0] && !loading && <div style={{ marginTop: '2em', fontSize: '2em' }}> Ce paquet est vide! Vite, <NavLink to={`/cardEditor/${id}/new`}> ajoutez une carte!</NavLink> </div>}
        {loading && <Loading />}
    </div>
      : loading ? <Loading /> : <NoMatch reason="deck" />
  )
}

export default DeckEditor
