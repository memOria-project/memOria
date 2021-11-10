
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
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

const CardDisplay = () => {
  const dispatch = useDispatch()
  // use URl parameters to determine the card to display from deck and card id
  const { deckId, cardId } = useParams()
  const delayedIds = useSelector((state) => state.user.delayedCards)
  const allCards = useSelector(state => state.currentDeck).cards
  const deckTitle = useSelector(state => state.currentDeck).title
  const { isAlternateRequired, isDelayedReviewOn, databaseSelector } = useSelector((state) => state.options)
  const isFailed = useSelector((state) => state.options.isFailed)

  const [initialFailedCards, setInitialFailedCards] = useState([])
  const [delayedCards, setDelayedCards] = useState([])
  const [alternateFailedCards, setAlternateFailedCards] = useState([])
  const [showOptions, setShowOptions] = useState(true)
  const [loading, setLoading] = useState(true)
  // "database" will be passed as props to the MD Editor and contains all the cards to be displayed
  const [database, setDatabase] = useState([{ id: 0, index: 0, recto: 'recto', verso: 'verso' }])
  const [failedCards, setFailedCards] = useState([])
  const [currentCard, setCurrentCard] = useState({ id: 0, index: 0, recto: 'recto', verso: 'verso' })
  // Fetch all cards from the selected deck
  useEffect(() => {
    dispatch({ type: SET_CURRENT_DECK_ID, deckId: deckId })
    dispatch({ type: FETCH_CARDS })
    dispatch({ type: CHECK_TOKEN })
    dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: '' })
  }, [])

  // filter data based on delayedIds!
  useEffect(() => {
    if (allCards?.length) {
      setLoading(false)
    }
    console.log({ allCards })
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
      if (delayedCardsFinalFinal.length != allCards.length) {
        setDelayedCards(delayedCardsFinalFinal)
        setDelayedCardsLength(delayedCardsFinalFinal.length)
      }

      console.log({ delayedCards })
    }
  }, [allCards, delayedIds])

  useEffect(() => {
    if (allCards) {
      selectDatabase(databaseSelector)
    }

    console.log(currentCard)
  }, [allCards, databaseSelector])

  //

  const selectDatabase = (selector) => {
    switch (selector) {
      case 'FAILED_1ST_ROUND': {
        setDatabase(prevState => failedCards)
        console.log('la database suivante est séléctionnée(1. cartes ratées, rounds impairs):', database)
        setFailedCards([])
        break
      }
      case 'NOT_MASTERED': {
        setDatabase(prevState => delayedCards)
        console.log('la database suivante est séléctionnée(3. cartes delayed):', database)
        break
      }
      default: {
        setDatabase(allCards)
        console.log('la database suivante est séléctionnée(4. toutes les cartes, par défaut):', database)
      }
    }
  }

  //  Triggers the modal offering the "next games" options: start again with all the cards, or check the missed ones
  const checkIfOver = () => {
    if (currentCard?.index === database?.length) {
      console.log('la modale over est montrée')
      return true
    } else {
      return false
    }
  }

  const isOver = checkIfOver()
  // is called when a user clicks on "I missed"
  const addFailedCards = (card) => {
    setFailedCards((state) => [...state, card])
  }
  const [delayedCardsLength, setDelayedCardsLength] = useState(delayedCards.length)
  return (<div>
          {showOptions &&
            <div className="cardDisplay__modal">
              <div className="cardDisplay__modal__container modal__container__verso">

              <Options setDelayedCardsLength={setDelayedCardsLength} setShowOptions={setShowOptions} delayedCards={delayedCards} />
              </div>
            </div>
          }
          {currentCard.index <= database.length &&
            (<>
            <p className="deck__title">{deckTitle} <button className="icon__options"><FontAwesomeIcon icon={faCog} onClick={() => setShowOptions(true)} size="2x"/></button> </p>
            <ShowCards currentCard={currentCard} setCurrentCard={setCurrentCard} hideButtons={false} delayedCardsLength={delayedCardsLength} cardId={cardId} database={database} addFailedCards={addFailedCards} failedCards={failedCards} />
            </>)
          }
          {isOver &&
            <NextGame setFailedCards={setFailedCards} isFailed={isFailed} failedCards={failedCards} setCurrentCard={setCurrentCard} database={database} />}

          {loading &&
            <Loading />
          }

           </div>)
}

export default CardDisplay
