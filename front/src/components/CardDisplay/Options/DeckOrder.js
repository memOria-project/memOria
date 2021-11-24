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
  const allButtons = [(<motion.button
    // key={1}
    // animate={{ opacity: [0, 1], boxShadow: '-5px -10px 0px white', duration: 5 }}

    // exit={{ boxShadow: 'none', color: 'dark', y: [-5, -25, -5], x: [0, -5, 0] }}
    id="RANDOM" onClick={handleClick} className={setClassName(isRandomOn)}>Random</motion.button>),
  (<motion.button
    // key={2}
    // animate={{ opacity: [0, 1], boxShadow: '-5px -10px 0px white', duration: 5 }}
    // initial={{ y: 0, x: 0 }}
    // exit={{ boxShadow: 'none', color: 'dark', y: [-5, -25, -5], x: [0, -5, 0] }}
    id="CHRONO" onClick={handleClick} className={setClassName(isChronoOn)}> ancien &gt; récent </motion.button>),
  (<motion.button
    // key={3}
    // initial={{ y: 0, x: 0 }}

    // animate={{ opacity: [0, 1], boxShadow: '-5px -10px 0px white', duration: 5 }}
    // exit={{ boxShadow: 'none', color: 'dark', y: [-5, -25, -5], x: [0, -5, 0] }}
    id="REVERSE_CHRONO" onClick={handleClick} className={setClassName(isReverseChronoOn)}> récent &gt; ancien </motion.button>)]

  return <div className="deckOptions__buttons">
<button className="discrete" onClick={handleClickBack} >
&#11164;</button>
{/* <AnimatePresence initial={false} exitBeforeEnter> */}
                  {allButtons[optionIndex]}
    {/* </AnimatePresence> */}
    <button className="discrete" onClick={handleClickNext}>&#10148; </button>

</div>
}
export default DeckOrder
