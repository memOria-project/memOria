import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const Confirmation = ({ isSuccess, deckId }) => {
  const path = `/deckEditor/${deckId}`
return (isSuccess?
        <motion.div
          animate={{y:5}}
          transition={{ease:"easeIn"}} 
          className="confirmation--success"
        > 
         <FontAwesomeIcon icon={faCheck} /> <strong>Carte enregistrée!</strong> <br /> Revenez au <NavLink to={path}>paquet</NavLink> ou créer une autre carte
        </motion.div>
        :
        <motion.div
        animate={{y:5}}
        transition={{ease:"easeIn"}} 
         className="confirmation--error"> 
        <FontAwesomeIcon icon={faTimes} /> <strong>Carte non créée.</strong> <br /> Veuillez vous connecter et essayer à nouveau. </motion.div>
)
}
export default Confirmation