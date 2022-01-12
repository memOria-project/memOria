import { useSelector, useDispatch } from 'react-redux'
import { PICK_DEFAULT_CARD_SIDE } from '../../../actions'
import setClassName from './setClassName'
import PropTypes from 'prop-types'

const RectoVerso = ({ firstCard }) => {
  const { defaultView } = useSelector((state) => state.options)
  const { isRecto } = defaultView
  const dispatch = useDispatch()
  const handleClick = (event) => {
    // id = recto button id and verso button id properties
    const userChoice = event.target.id
    if (userChoice === 'recto') {
      dispatch({ type: PICK_DEFAULT_CARD_SIDE, isRecto: true })
    } else {
      dispatch({ type: PICK_DEFAULT_CARD_SIDE, isRecto: false })
    }
  }
  const handleClickNext = (event) => {
    dispatch({ type: PICK_DEFAULT_CARD_SIDE, isRecto: !isRecto })
  }

  return <div style={{ visibility: 'visible' }} className="deckOptions__buttons">
    <div className="info-div" id="recto">

    <button className="discrete" onClick={handleClickNext} >
    &#x2B9C;</button>
    <div style={{ marginLeft: 'auto' }}> </div>

    {isRecto
      ? 'Recto'
      : 'Verso'
}
<div style={{ marginRight: 'auto' }}> </div>
<button className="discrete" onClick={handleClickNext}>
  &#x2B9E;
 </button>
</div>
</div>
}
export default RectoVerso

RectoVerso.propTypes = {
  firstCard: PropTypes.object
}
