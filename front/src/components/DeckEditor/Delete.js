import { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTrashRestoreAlt } from '@fortawesome/free-solid-svg-icons'
import { handleClickDelete } from './handleClick'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

const Delete = ({ card, isDeck, size = '2x' }) => {
  const deckId = useSelector((state) => state.currentDeck.id)
  const id = isDeck ? deckId : card.id
  const [isClicked, setIsClicked] = useState(false)
  const buttonClass = classNames({
    warning: !isClicked,
    'btn-doubleCheck': isClicked,
    smallButton: isDeck
  })
  // la props cardId provoque un warning React, mais semble nécessaire pour handleClickDelete
  return (
  <button className={buttonClass} id={id} onClick={(event) => handleClickDelete(event, isDeck, isClicked, setIsClicked)}>
  {isClicked
    ? <FontAwesomeIcon className="btn-doubleCheck" icon={faTrashRestoreAlt} size={size} />
    : <FontAwesomeIcon cardId={id} icon={faTrash} size={size} style={{ cursor: 'pointer' }} />
    }
  </button>
  )
}
export default Delete

Delete.propTypes = {
  card: PropTypes.object,
  isDeck: PropTypes.bool,
  size: PropTypes.string
}
