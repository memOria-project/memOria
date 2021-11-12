import classNames from 'classnames'
import { useSelector } from 'react-redux'
const DeckOrder = ({ handleClick }) => {
  const { order } = useSelector((state) => state.options)
  const isRandomOn = (order === 'RANDOM')
  const isChronoOn = (order === '')
  const isReverseChronoOn = (order === 'REVERSE_CHRONO')
  const className = 'information-alt'
  const classNameActive = 'information'

  const setClassName = (isActive) => {
    const myClassName = classNames({
      [classNameActive]: isActive,
      [className]: !isActive
    })
    return myClassName
  }

  return <div>
  <button id="random" onClick={handleClick} className={setClassName(isRandomOn)}>Random</button>
  <button id="chronological" onClick={handleClick} className={setClassName(isChronoOn)}> ancient &gt; récent </button>
  <button id="chronological_reverse" onClick={handleClick} className={setClassName(isReverseChronoOn)}> récent &gt; ancient </button>
</div>
}
export default DeckOrder
