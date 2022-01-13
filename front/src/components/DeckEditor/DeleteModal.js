import { useSelector } from 'react-redux'
import { handleClickDeleteDeck, handleClickExport } from './handleClick'

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
      Sauvegarder les cartes puis supprimer le paquet
    </button>
    <button className="critic" onClick={() => handleClickDeleteDeck(setShowModal, id) }>
      Supprimer sans sauvegarder
    </button>
  </div>
</div>
}
export default DeleteModal
