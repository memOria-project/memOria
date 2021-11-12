import { useDispatch, useSelector } from 'react-redux'
import { PICK_NEW_GAME, PICK_ORDER } from '../../../actions'
import RectoVerso from './RectoVerso'
import DelayedCards from './DelayedCards'
import DeckOrder from './DeckOrder'

const Options = ({ setShowOptions, delayedCards }) => {
  const isConnected = useSelector((state) => state.user.isConnected)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    switch (event.target.id) {
      case 'start': {
        setShowOptions((state) => !state)

        break
      }
      case 'allCards': {
        dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: '' })

        break
      }
      case 'NOT_MASTERED': {
        dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: 'NOT_MASTERED' })
        break
      }
      case 'RANDOM': {
        dispatch({ type: PICK_ORDER, value: 'RANDOM' })
        break
      }

      case 'REVERSE_CHRONO': {
        dispatch({ type: PICK_ORDER, value: 'REVERSE_CHRONO' })
        break
      }

      case 'CHRONO': {
        dispatch({ type: PICK_ORDER, value: '' })
        break
      }

      default: {
        console.log('no valid button selected')
      }
    }
  }

  return (
    <div>
      <h1> Options</h1>

      <h2> Face par défaut </h2>
        <RectoVerso />
      <h2> Ordre </h2>
        <DeckOrder handleClick={handleClick}/>

      {isConnected &&
        <>
          <h2>Montrer...</h2>
          <DelayedCards handleClick={handleClick} delayedCards={delayedCards.length} />
        </>
        }
        <button className="btn__submit" id="start" type="submit" onClick={handleClick}>Continuer </button>
     </div>
  )
}
export default Options
