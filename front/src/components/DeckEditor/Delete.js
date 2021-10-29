import { PropTypes } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { handleClickDelete } from './handleClick'

const Delete = ({ card }) => {
  return (
   <button className="critic" id={card.id} onClick={handleClickDelete}>
      <FontAwesomeIcon cardId={card.id} icon={faTrash} size="2x" style={{ cursor: 'pointer' }} />
   </button>
  )
}
export default Delete

Delete.propTypes = {
  card: PropTypes.Object
}
