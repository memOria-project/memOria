import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import PropTypes from 'prop-types'
import optionSwitch from './optionSwitch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

const DeckOrder = ({ handleClick }) => {
  const { order } = useSelector((state) => state.options)
  const dispatch = useDispatch()
  const defineDefault = () => {
    if (order === 'RANDOM') return 0
    if (order === '') return 1
    if (order === 'REVERSE_CHRONO') return 2
  }
  const [optionIndex, setOptionIndex] = useState(defineDefault())

  const handleClickNext = () => {
    if (optionIndex === 2) {
      optionSwitch('RANDOM', dispatch)
      setOptionIndex(0)
    } else if (optionIndex === 1) {
      optionSwitch('REVERSE_CHRONO', dispatch)
      setOptionIndex(prevState => prevState + 1)
    } else {
      optionSwitch('CHRONO', dispatch)

      setOptionIndex(prevState => prevState + 1)
    }
  }
  const handleClickBack = () => {
    if (optionIndex === 0) {
      optionSwitch('REVERSE_CHRONO', dispatch)
      setOptionIndex(2)
    } else if (optionIndex === 1) {
      optionSwitch('RANDOM', dispatch)
      setOptionIndex(prevState => prevState - 1)
    } else {
      optionSwitch('CHRONO', dispatch)
      setOptionIndex(prevState => prevState - 1)
    }
  }
  const allButtons = ['Random', 'ancien > récent', 'récent > ancien']

  return (
  <div className="deckOptions__buttons">
    <div className="info-div">
      <FontAwesomeIcon icon={faCaretLeft} className="discrete" style={{ cursor: 'pointer' }} onClick={handleClickBack}/>

      <p>{allButtons[optionIndex]}</p>
      <FontAwesomeIcon icon={faCaretRight} className="discrete" style={{ cursor: 'pointer' }} onClick={handleClickNext}/>

    </div>
  </div>
  )
}
export default DeckOrder

DeckOrder.propTypes = {
  handleClick: PropTypes.func
}
