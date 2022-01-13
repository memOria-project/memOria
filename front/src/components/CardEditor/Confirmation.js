import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PropTypes } from 'prop-types'
import { useSelector } from 'react-redux'
import Loading from '../Loading'

const Confirmation = ({ deckId }) => {
  const path = `/deckEditor/${deckId}`
  const { loading, error } = useSelector((state) => state.user)

  return (
    loading
      ? <div style={{ position: 'relative' }}> <Loading /> </div>
      : error
        ? <motion.div
        animate={{ y: 5 }}
        transition={{ ease: 'easeIn' }}
          className="confirmation--error">
        <FontAwesomeIcon icon={faTimes} /> <strong>Carte non créée.  </strong> <br /> &quot;{error}&quot;. <br /> Veuillez vous connecter et essayer à nouveau.
      </motion.div>
        : <motion.div
            animate={{ y: 5 }}
            transition={{ ease: 'easeIn' }}
            className="confirmation--success"
          >
            <FontAwesomeIcon icon={faCheck} /> <strong>Carte enregistrée!</strong> <br />
            Revenez au <NavLink to={path}>paquet</NavLink> ou créer une autre carte
          </motion.div>
  )
}
export default Confirmation

Confirmation.propTypes = {
  deckId: PropTypes.number
}
