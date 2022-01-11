
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SET_CURRENT_DECK_ID, FETCH_CARDS, CHECK_TOKEN, PICK_NEW_GAME } from '../../actions'

import ShowCards from './ShowCards'
import Loading from '../Loading'
import Options from './Options'
import NextGame from './NextGame'

import './CardDisplay.scss'
import './CardDisplay_desktop.scss'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoMatch from '../NoMatch'
import { pickOrder } from './Options/pickOrder'
import hotkeys from './hotkeys'

const CardDisplay = () => {
  const dispatch = useDispatch()
  // use URl parameters to determine the card to display from deck and card id
  const { deckId, cardId } = useParams()
  const initialFirstCardState = { id: 0, index: 0, recto: 'ce paquet est vide, ou ne vous est pas accessible', verso: 'Vérifiez que vous êtes connectés et que ce paquet a bel et bien un contenu ' }

  const delayedIds = useSelector((state) => state.user.delayedCards)
  const allCards = useSelector(state => state.currentDeck).cards
  const deckTitle = useSelector(state => state.currentDeck).title
  const { databaseSelector, order } = useSelector((state) => state.options)

  const [showError, setShowError] = useState(false)
  const [delayedCards, setDelayedCards] = useState([])
  const [showOptions, setShowOptions] = useState(true)
  const [showHotkeys, setShowHotkeys] = useState(false)

  const [loading, setLoading] = useState(true)
  const [checkIfExist, setCheckIfExist] = useState('no timeout yet')
  // "database" will be passed as props to the MD Editor and contains all the cards to be displayed
  const [database, setDatabase] = useState([initialFirstCardState])
  const [currentCard, setCurrentCard] = useState(initialFirstCardState)
  const [failedCards, setFailedCards] = useState([])
  const myFocus = useRef()
  if (myFocus.current) {
    myFocus.current.focus()
  }
  // * ↓ Initialisation (récup et traitement des données) ↓
  // récupère toutes les cartes du paquet concerné, les infos utilisateurs, et reset le mode de parcours (pour qu'il soit par défaut)
  useEffect(() => {
    dispatch({ type: SET_CURRENT_DECK_ID, deckId: deckId })
    dispatch({ type: FETCH_CARDS })
    dispatch({ type: CHECK_TOKEN })
    dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: '' })
    setTimeout(() => setShowHotkeys(false), 2000)
  }, [])

  // vérifie que le paquet existe / que l'utilisateur a le droit de l'utiliser
  useEffect(() => {
    if (allCards) {
      console.log(`timeout ${checkIfExist} cleared!`)
      clearTimeout(checkIfExist)
      setLoading(false)
    } else {
      if (checkIfExist === 'no timeout yet') {
        setCheckIfExist(setTimeout(() => {
          setLoading(false); setShowError(true)
        }, 6000))
        console.log('timeout créé')
      }
    }
  }, [allCards, checkIfExist])

  // recupère les cartes reportées, met à jour l'array delayedCards
  useEffect(() => {
    if (allCards?.length) {
      setLoading(false)
    }
    if (allCards?.length && delayedIds?.length) {
      const delayedCardsWithNulls = allCards.map((card) => {
        const myCard = delayedIds.indexOf(card.id)
        if (myCard != -1) {
          return card
        } else {
          return null
        }
      })
      const delayedCardsFinal = delayedCardsWithNulls.filter((value) => value != null)
      // delayed cards, version "bonnes cartes reportées"
      const delayedCardsFinalFinal = allCards.filter(item => !delayedCardsFinal.includes(item))
      console.log({ delayedCardsFinal, allCards, delayedCardsFinalFinal, delayedCards })
      if (delayedCardsFinalFinal.length !== allCards.length) {
        setDelayedCards(delayedCardsFinalFinal)
      }

      console.log({ delayedCards })
    }
  }, [allCards, delayedIds])

  // sélectionne le sous ensemble de cartes à parcourir
  useEffect(() => {
    console.log(`database selection ${allCards}`)
    if (allCards) {
      selectDatabase(databaseSelector)
    }
  }, [allCards, databaseSelector, order])

  // * ↓ fonctions utilisées dans l'initalisation (à modulariser à l'avenir) ↓

  const initResponseStatus = () => {
    setDatabase(prevState => prevState.map((card) => ({ ...card, response: 'notPicked' })))
    setDatabase((state) => {
      console.log('statut des réponses initialisé', state)
      return state
    })
  }
  const selectDatabase = (selector) => {
    switch (selector) {
      case 'FAILED_1ST_ROUND': {
        setDatabase(failedCards)
        setDatabase(prevState => (pickOrder(prevState, order)))

        setDatabase((state) => {
          console.log('la database suivante est séléctionnée(1. cartes ratées):', state)
          return state
        })
        initResponseStatus()
        setCurrentCard(prevState => ({ ...prevState, index: 0 }))

        setFailedCards([])
        break
      }

      case 'NOT_MASTERED': {
        setDatabase(delayedCards)
        setDatabase(prevState => (pickOrder(prevState, order)))

        setCurrentCard(prevState => ({ ...prevState, index: 0 }))
        setDatabase((state) => {
          console.log('la database suivante est séléctionnée(2. cartes delayed):', state)
          return state
        })
        initResponseStatus()
        setFailedCards([])

        break
      }
      default: {
        setDatabase(allCards)
        setDatabase(prevState => (pickOrder(prevState, order)))
        setCurrentCard(prevState => ({ ...prevState, index: 0 }))

        setDatabase((state) => {
          console.log(`la database suivante est séléctionnée(3. toutes les cartes, par défaut, ordre ${order}):, state`)
          return state
        })
        initResponseStatus()
      }
    }
  }

  //  Vérifie s'il faut montrer le composant NextGame (modale offrant les options de rejouabilité)
  const checkIfOver = () => {
    if (currentCard?.index === database?.length) {
      console.log('la modale over est montrée')
      return true
    } else {
      return false
    }
  }

  const isOver = checkIfOver()

  /* le return statement se construit avec plusieurs niveau de tertiary operator...
C'est mauvais question visibilité. Piste pour éviter ça
 => intégrer les composants Loading et NoMatch dans App.js, au niveau des routeurs, voir #66

 */

  // ? dans ce return, s'il n'y a pas d'erreur, react render un ARRAY. Si ça marche, c'est notamment car chaque "entrée" renvoie "false" si elles sont non pertinentes (et React n'affiche pas les expression "false")
  // ?  C'est un peu particulier... mais c'est la seule syntaxe qui semble gérer les expressions avec && à l'intérieur des ternary.
  return (<div
  ref={myFocus}
  tabIndex="-1"
            onKeyDown={(event) => hotkeys(event, database, setShowHotkeys, setCurrentCard, currentCard.index, setDatabase, currentCard, failedCards, setFailedCards, dispatch)}
            onKeyUp={() => setShowHotkeys(false)
            }
            >
          {loading
            ? <Loading />
            : showError
              ? <NoMatch reason="deck-display" />
              : [
                  !loading && showOptions &&
            <div className="cardDisplay__modal">
              <div className="cardDisplay__modal__container modal__container__verso">

              <Options firstCard={database[0]} setShowOptions={setShowOptions} delayedCards={delayedCards} />
              </div>
            </div>,

                  currentCard.index <= database.length - 1 &&
            (<>
            <p className="deck__title">{deckTitle} <button className="icon__options"><FontAwesomeIcon icon={faCog} onClick={() => setShowOptions(true)} size="2x"/></button> </p>
            <ShowCards showHotkeys={showHotkeys} setDatabase={setDatabase} currentCard={currentCard} setCurrentCard={setCurrentCard} hideButtons={false} cardId={cardId} database={database} setFailedCards={setFailedCards} failedCards={failedCards} />
            </>),

                  isOver &&
            <NextGame setFailedCards={setFailedCards} failedCards={failedCards} currentCard={currentCard} setCurrentCard={setCurrentCard} database={database} />,

                  loading &&
            <Loading />

                ]}
           </div>)
}

export default CardDisplay
