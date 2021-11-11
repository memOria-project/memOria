import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { PICK_NEW_GAME } from '../../../actions'
import RectoVerso from './RectoVerso'
import DelayedCards from './DelayedCards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Options = ({ setDelayedCardsLength, setShowOptions, delayedCards }) => {
  const isConnected = useSelector((state) => state.user.isConnected)
  const { isDelayedReviewOn, databaseSelector } = useSelector((state) => state.options)
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState({ allMastered: false, notMastered: false, allCards: true })
  const delayedCardsLength = useRef(delayedCards.length)

  const handleClick = (event) => {
    if (event.target.id === 'start') {
      setShowOptions((state) => !state)
    } else if (event.target.id === 'allCards') {
      dispatch({ type: PICK_NEW_GAME, field: 'isDelayedReviewOn', value: false })
      dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: '' })
    } else if (event.target.id === 'notMastered') {
      dispatch({ type: PICK_NEW_GAME, field: 'isDelayedReviewOn', value: true })
      dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: 'NOT_MASTERED' })
    }
    setIsActive((state) => ({ ...state, allCards: false, notMastered: false }))
    setIsActive((state) => ({ ...state, [event.target.id]: true }))
  }

  return (
    <div>
      <h1> Options</h1>

      <h2>Montrer en premier </h2>
        <RectoVerso />
      {isConnected &&
        <>
          <h2>  Parcourir les cartes</h2>
          <DelayedCards handleClick={handleClick} isActive={isActive} delayedCards={delayedCards.length} />
        </>
        }
        <button className="btn__submit" id="start" type="submit" onClick={handleClick}>Continuer </button>
        {/* <FontAwesomeIcon icon={faCheck} onClick={handleClick}/> */}
     </div>
  )
}
export default Options