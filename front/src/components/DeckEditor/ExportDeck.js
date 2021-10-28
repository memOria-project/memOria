import { saveAs } from 'file-saver'
import { getMyDate } from './getMyDate'
import { PropTypes } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

const ExportDeck = ({ cards = [], title = 'Paquet vide!' }) => {
  const handleClick = () => {
    // éléments inclus dans le fichier
    const deckTitle = `## ${title}`
    const allCards = cards.map((card) => {
      const cardNumber = cards.indexOf(card) + 1
      return `
### card ${cardNumber} \n 
**recto** \n
${card.recto} \n
**verso** \n
${card.verso} \n
***
\n
`
    }).join('')

    const url = window.location.href
    const dateOfExport = getMyDate(Date.now())

    // le fichier est assemblé dans la variable blob, en utilisant file-saver.js
    const blob = new Blob(
      [
`
${deckTitle} \n
${allCards} \n
exporté depuis memOria (${url} - ${new Date(Date.now())}
`
      ],

      { type: 'text/plain;charset=utf-8' })

    saveAs(blob, `${title}__${dateOfExport}.md`)
  }

  return <button onClick={handleClick} className="btn__download">
    <FontAwesomeIcon icon={faDownload} size="2x" />
  </button>
}
export default ExportDeck

ExportDeck.propTypes = {
  cards: PropTypes.Array,
  title: PropTypes.string
}
