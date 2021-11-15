import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

import setIndexPreviousCard from '../setIndexPreviousCard'
import setClassName from './setClassName'
import optionSwitch from './optionSwitch'
import { motion, AnimatePresence } from 'framer-motion'

const DeckOrder = ({ handleClick }) => {
  const { order } = useSelector((state) => state.options)
  const dispatch = useDispatch()
  const defineDefault = () => {
    if (order === 'RANDOM') return 0
    if (order === '') return 1
    if (order === 'REVERSE_CHRONO') return 2
  }
  const [optionIndex, setOptionIndex] = useState(defineDefault())
  const isRandomOn = (order === 'RANDOM')
  const isChronoOn = (order === '')
  const isReverseChronoOn = (order === 'REVERSE_CHRONO')

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
  const allButtons = [(<button id="RANDOM" onClick={handleClick} className={setClassName(isRandomOn)}>Random</button>),
    (<button id="CHRONO" onClick={handleClick} className={setClassName(isChronoOn)}> ancient &gt; récent </button>),
    (<button id="REVERSE_CHRONO" onClick={handleClick} className={setClassName(isReverseChronoOn)}> récent &gt; ancient </button>)]

  return <div className="deckOptions__buttons">
            <button className="discrete" onClick={handleClickBack} >
&#11164;</button>
<AnimatePresence>

    <motion.span
                    animate={{ opacity: 1 }}
                    transition={{ ease: 'easeInOut', delay: 2 }}
                    exit={{ opacity: 0 }}
                className="Carousel">
                  {allButtons[optionIndex]}
    </motion.span>
    </AnimatePresence>
    <button className="discrete" onClick={handleClickNext}>&#10148; </button>

</div>
}
export default DeckOrder
