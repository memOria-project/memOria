import { useSelector, useDispatch } from 'react-redux'
import { PICK_DEFAULT_CARD_SIDE } from '../../../actions'
import setClassName from './setClassName'

const RectoVerso = () => {
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

  return <div style={{ visibility: 'visible' }}>
    <button id="recto" className={setClassName(isRecto)} onClick={handleClick} id="recto">Recto</button>
    <button id="verso" className={setClassName(!isRecto)} onClick={handleClick} id="verso">Verso</button>
</div>
}
export default RectoVerso
