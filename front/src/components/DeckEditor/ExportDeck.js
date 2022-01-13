
import { PropTypes } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { handleClickExport } from './handleClick'

const ExportDeck = ({ cards = [], title = 'Paquet vide!' }) => {
  return <button onClick={() => handleClickExport(cards, title)} className="btn__download">
    <FontAwesomeIcon icon={faDownload} size="2x" />
  </button>
}
export default ExportDeck

ExportDeck.propTypes = {
  cards: PropTypes.array,
  title: PropTypes.string
}
