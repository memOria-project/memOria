import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faPlus } from '@fortawesome/free-solid-svg-icons'

import Loading from '../Loading'
import { FETCH_CARDS, SET_CURRENT_DECK_ID, CHECK_TOKEN } from '../../actions'

import './DeckEditor.scss'
import './DeckEditor_desktop.scss'

import ExportDeck from './ExportDeck'
import Delete from './Delete'
import Edit from './Edit'

const DeckEditor = () => {
  const deckIdFromParams = parseInt(useParams().deckId, 10)

  const [loading, setLoading] = useState(true)
  const [nameOfDeck, setNameOfDeck] = useState()

  const { deckId } = useSelector((state) => state.currentDeck)
  const { currentDeck } = useSelector((state) => state)
  const { cards } = currentDeck

  const dispatch = useDispatch()

  const toView = `/deck/${deckId}/0`
  useEffect(() => {
    dispatch({ type: CHECK_TOKEN })
    dispatch({ type: SET_CURRENT_DECK_ID, deckId: deckIdFromParams })
    dispatch({ type: FETCH_CARDS })
  }, [])
  // classement des cartes par id croissant
  if (cards) {
    cards.sort(function (a, b) { return a.id - b.id })
  }
  //! à supprimer quand #28 est résolu
  const { decks } = useSelector((state) => state.user)
  // ce  useEffect existe pour afficher le titre des paquets vides... pas très propre :( )
  // pour le moment, il n'est pas possible de récupérer les titres des paquets vides, sauf en passant par le user state...

  useEffect(() => {
    if (decks.length) {
      const findDeck = decks.find((deck) => deck.id === deckIdFromParams)
      setNameOfDeck(findDeck.title)
      // const nameOfDeck = useSelector((state) => state.currentDeck.title)
    }
  }, [decks.length])
  //! fin du code à supprimer quand #28 est résolu
  //! ne pas oublier de remplacer nameOfDeck par currentDeck.title
  // ce use effect suffit pour les paquets avec des cartes.
  // il pourra sans doute être améliorer quand #28 sera résolue
  useEffect(() => {
    if ((!cards && !cards) || cards) {
      setTimeout(() => setLoading(false), 500)
    }
  }, [deckId])

  return (
    <div>
      <div className="cardEditor__header">
        <div className="header__titleBlock">
          <div className="header__deckTitleBlock">
            <h2 className="header__title">{nameOfDeck}</h2>
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
          <NavLink to={`/cardEditor/${deckId}/new`}>
              <FontAwesomeIcon icon={faPlus} size="3x" style={{ color: '#16a085' }} />
          </NavLink>
        </div>

      </div>
      {cards &&
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
                <Edit card={card} deckId={deckId} />
                <Delete card={card} />
              </div>
            </p>)
          }
          ))}
        {!cards && !loading && <div style={{ marginTop: '2em', fontSize: '2em' }}> Ce paquet est vide! Vite, <NavLink to={`/cardEditor/${deckId}/new`}> ajoutez une carte!</NavLink> </div>}
        {loading && <Loading />}
    </div>
  )
}

export default DeckEditor
