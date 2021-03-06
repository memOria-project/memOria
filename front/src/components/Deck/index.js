import './Deck.scss'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Deck = ({ deck }) => {
  const { id, title } = deck
  // const myTags = tag.map((oneTag) => oneTag)
  const path = `/deck/${id}/0`
  return (
  // je laisse ça ici au cas où on veut tester plus tard les autres données
  // <p className="deck"> id: {id} title: {title} created: {created_at} tag:{myTags}</p>
  <div className="deck"> <NavLink to={path}>{title}</NavLink> </div>

  )
}
export default Deck

Deck.propTypes = {
  deck: PropTypes.object
}
