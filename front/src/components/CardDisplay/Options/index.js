import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import RectoVerso from './RectoVerso'
import DelayedCards from './DelayedCards'
import DeckOrder from './DeckOrder'
import optionSwitch from './optionSwitch'

const Options = ({ setShowOptions, delayedCards, firstCard }) => {
  const { isConnected } = useSelector((state) => state.user)
  const { defaultView: { isRecto } } = useSelector((state) => state.options)

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
        <RectoVerso firstCard={firstCard} />
      <h2> Ordre </h2>
        <DeckOrder handleClick={handleClick}/>

      {isConnected &&
        <>
          <h2>Montrer...</h2>
          <DelayedCards handleClick={handleClick} delayedCards={delayedCards.length} />
        </>
        }

        <button className="btn__submit" id="start" type="submit" onClick={handleClick}>Continuer </button>
        <h3> Vous verrez: </h3>
        {isRecto
          ? <div>"{firstCard.recto.substring(0, 30)}..." </div>
          : <div>"{firstCard.verso.substring(0, 30)}..." </div>}
    </div>
  )
}
export default Options

Options.propTypes = {
  setShowOptions: PropTypes.func,
  delayedCards: PropTypes.array,
  firstCard: PropTypes.object
}
