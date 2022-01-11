import { useSelector, useDispatch } from 'react-redux'
import { PICK_DEFAULT_CARD_SIDE } from '../../../actions'
import setClassName from './setClassName'

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
    {isRecto
      ? 'Recto'
      : 'Verso'
}
<button className="discrete" onClick={handleClickNext}>&#10148; </button>
</div>
</div>
}
export default RectoVerso
