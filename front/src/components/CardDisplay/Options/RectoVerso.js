import { useSelector, useDispatch } from 'react-redux'
import { PICK_DEFAULT_CARD_SIDE } from '../../../actions'
import classNames from 'classnames'

const RectoVerso = () => {
  const { defaultView } = useSelector((state) => state.options)
  const { isRecto } = defaultView
  const dispatch = useDispatch()
  const className = 'information-alt'
  const classNameActive = 'information'
  const classNameRecto = classNames({
    [classNameActive]: isRecto,
    [className]: !isRecto
  })
  const classNameVerso = classNames({
    [classNameActive]: !isRecto,
    [className]: isRecto
  })
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
    <button id="recto" className={classNameRecto} onClick={handleClick} id="recto">Recto</button>
    <button id="verso" className={classNameVerso} onClick={handleClick} id="verso">Verso</button>
</div>
}
export default RectoVerso
