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
    <button className="discrete" onClick={handleClickNext} >
&#11164;</button>
    {isRecto
      ? <button id="recto" className={setClassName(isRecto)} onClick={handleClick} id="recto">Recto</button>
      : <button id="verso" className={setClassName(!isRecto)} onClick={handleClick} id="verso">Verso</button>
}
<button className="discrete" onClick={handleClickNext}>&#10148; </button>

</div>
}
export default RectoVerso
