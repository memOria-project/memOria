import { useSelector } from 'react-redux'
import { handleClickDeleteDeck, handleClickExport } from './handleClick'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'

const DeleteModal = ({ isDeck, setShowModal }) => {
  const { cards, title, id } = useSelector((state) => state.currentDeck)
  return <div className="deleteModal">
  <div className="modal__container">
    <h2>Suppression de paquet</h2>
    <p> Les cartes seront définitivement perdues. Vous avez la possibilité de les sauvegarder sous un format .md, afin d'en utiliser le contenu ailleurs.
       </p>
    <button className="confirm" onClick={() => setShowModal(false)}>
      annuler
    </button>
    <button className="warning" onClick={() => { handleClickExport(cards, title); handleClickDeleteDeck(setShowModal, id) }}>
        <FontAwesomeIcon icon={faDownload} /> puis <FontAwesomeIcon icon={faTrash} />
    </button>
    <button className="critic" onClick={() => handleClickDeleteDeck(setShowModal, id) }>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  </div>
</div>
}
export default DeleteModal

DeleteModal.propTypes = {
  isDeck: PropTypes.bool,
  setShowModal: PropTypes.func
}
