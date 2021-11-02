import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PropTypes } from 'prop-types'

const Confirmation = ({ isSuccess, deckId }) => {
  const path = `/deckEditor/${deckId}`

  return (
    /* le wrapper sert juste àajouter un delay à l'apparition du composant.
    Ce delay laisse le temps au state de se mettre à jour, et d'afficher directement le bon message.
    Sans lui, on voit durant quelques millisecondes le message par défaut (celui d'erreur), même si la carte a bien été créée.
    */
    <motion.div
      animate={{ visibility: 'visible' }}
      transition={{ ease: 'easeIn', delay: 0.10 }}
      className="setDelay"
      >
      {isSuccess
        ? <motion.div
            animate={{ y: 5 }}
            transition={{ ease: 'easeIn' }}
            className="confirmation--success"
          >
            <FontAwesomeIcon icon={faCheck} /> <strong>Carte enregistrée!</strong> <br />
            Revenez au <NavLink to={path}>paquet</NavLink> ou créer une autre carte
          </motion.div>

        : <motion.div
          animate={{ y: 5 }}
          transition={{ ease: 'easeIn' }}
            className="confirmation--error">
          <FontAwesomeIcon icon={faTimes} /> <strong>Carte non créée.</strong> <br /> Veuillez vous connecter et essayer à nouveau.
        </motion.div>
        }
      </motion.div>

  )
}
export default Confirmation

Confirmation.propTypes = {
  isSuccess: PropTypes.boolean,
  deckId: PropTypes.integer
}
