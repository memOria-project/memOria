import './Deck.scss'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const PersonalisedDeck = ({ deck }) => {
  const {id, title, created_at} = deck;
  // const myTags = tag.map((oneTag) => oneTag)
  const editPath = `/deckEditor/${id}`
  const viewPath = `/deck/${id}/0`
  return (
    // je laisse ça ici au cas où on veut tester plus tard les autres données
    // <p className="deck"> id: {id} title: {title} created: {created_at} tag:{myTags}</p>
  <div className="deck">
    <div>
      <NavLink to={editPath}><FontAwesomeIcon icon={faEdit} size="2x"/></NavLink>
    </div>
    <div>
      <NavLink to={viewPath}>{title}</NavLink>
    </div>
  </div>

  )
}
export default PersonalisedDeck

PersonalisedDeck.propTypes = {
  deck: PropTypes.object
}