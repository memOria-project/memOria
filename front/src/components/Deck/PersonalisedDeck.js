import './Deck.scss'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons'

const PersonalisedDeck = ({ deck }) => {
  const { id, title } = deck
  const editPath = `/deckEditor/${id}`
  const viewPath = `/deck/${id}/0`
  return (
  <div className="deck">
    <div className="deck__icons">
      <div>
        <NavLink to={viewPath}>
          <FontAwesomeIcon icon={faEye} size="2x" />
        </NavLink>
      </div>
      <div>
        <NavLink to={editPath}><FontAwesomeIcon icon={faEdit} size="2x"/></NavLink>
      </div>
    </div>
    <div className="deckProfile__title">
      <NavLink to={viewPath}>{title}</NavLink>
    </div>

  </div>

  )
}
export default PersonalisedDeck

PersonalisedDeck.propTypes = {
  deck: PropTypes.object
}
