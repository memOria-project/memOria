import { useSelector, useDispatch } from 'react-redux'
import { PICK_DEFAULT_CARD_SIDE } from '../../../actions'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

const RectoVerso = ({ firstCard }) => {
  const { defaultView } = useSelector((state) => state.options)
  const { isRecto } = defaultView
  const dispatch = useDispatch()

  const handleClickNext = (event) => {
    dispatch({ type: PICK_DEFAULT_CARD_SIDE, isRecto: !isRecto })
  }

  return <div style={{ visibility: 'visible' }} className="deckOptions__buttons">
    <div className="info-div" id="recto">
    <FontAwesomeIcon icon={faCaretLeft} className="discrete" onClick={handleClickNext} style={{ cursor: 'pointer' }}/>

    <div style={{ marginLeft: 'auto' }}> </div>

    {isRecto
      ? 'Recto'
      : 'Verso'
}
<div style={{ marginRight: 'auto' }}> </div>
<FontAwesomeIcon icon={faCaretRight} className="discrete" onClick={handleClickNext} style={{ cursor: 'pointer' }}/>

</div>
</div>
}
export default RectoVerso

RectoVerso.propTypes = {
  firstCard: PropTypes.object
}
