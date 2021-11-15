import { useDispatch, useSelector } from 'react-redux'
import { PICK_NEW_GAME, PICK_ORDER } from '../../../actions'
import RectoVerso from './RectoVerso'
import DelayedCards from './DelayedCards'
import DeckOrder from './DeckOrder'
import optionSwitch from './optionSwitch'

const Options = ({ setShowOptions, delayedCards }) => {
  const isConnected = useSelector((state) => state.user.isConnected)
  const dispatch = useDispatch()
  const handleClick = (event) => {
    optionSwitch(event.target.id, dispatch)
    if (event.target.id === 'start') {
      setShowOptions((state) => !state)
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
