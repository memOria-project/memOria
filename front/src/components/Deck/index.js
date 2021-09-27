import './Deck.scss'
import PropTypes from 'prop-types'
const Deck = ({ deck }) => {
  const {id, title, created_at} = deck;
  // const myTags = tag.map((oneTag) => oneTag)
  return (
    // je laisse ça ici au cas où on veut tester plus tard les autres données
    // <p className="deck"> id: {id} title: {title} created: {created_at} tag:{myTags}</p>
    <p className="deck"> {title} </p>

  )
}
export default Deck

Deck.propTypes = {
  deck: PropTypes.object
}