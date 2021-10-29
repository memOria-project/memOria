import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTrashRestoreAlt } from '@fortawesome/free-solid-svg-icons'
import { handleClickDelete } from './handleClick'
import classNames from 'classnames'

const Delete = ({ card }) => {
  const [isClicked, setIsClicked] = useState(false)
  const buttonClass = classNames({
    warning: !isClicked,
    'btn-doubleCheck': isClicked
  })

  return (
   <button className={buttonClass} id={card.id} onClick={(event) => handleClickDelete(event, isClicked, setIsClicked)}>
     {isClicked
       ? <FontAwesomeIcon className="btn-doubleCheck" icon={faTrashRestoreAlt} size="2x" />
       : <FontAwesomeIcon cardId={card.id} icon={faTrash} size="2x" style={{ cursor: 'pointer' }} />
     }
   </button>
  )
}
export default Delete

Delete.propTypes = {
  card: PropTypes.Object
}
