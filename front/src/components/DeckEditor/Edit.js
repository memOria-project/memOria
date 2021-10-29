
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { PropTypes } from 'prop-types'
import { handleClickEdit } from './handleClick'

const Edit = ({ card, deckId }) => {
  return (
    <NavLink to={`/cardEditor/${deckId}/${card.id}`}>
      <button className="information" id={card.id} onClick={handleClickEdit}>
        <FontAwesomeIcon icon={faEdit} size="2x" name={card.id} onClick={handleClickEdit}/>
      </button>
    </NavLink>
  )
}
export default Edit

Edit.propTypes = {
  card: PropTypes.Object,
  deckId: PropTypes.integer
}
