import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import './ErrorMessage.scss'

const ErrorMessage = ({ message }) => {
  return (
  <motion.div
    animate={{ y: 5 }}
    transition={{ ease: 'easeIn' }}
    className="errorMessage__body"
  >
          <FontAwesomeIcon icon={faTimes} /> <strong>{message}</strong> <br />
        </motion.div>
  )
}

export default ErrorMessage
