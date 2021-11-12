import classNames from 'classnames'
import { useSelector } from 'react-redux'
import setClassName from './setClassName'

const DeckOrder = ({ handleClick }) => {
  const { order } = useSelector((state) => state.options)
  const isRandomOn = (order === 'RANDOM')
  const isChronoOn = (order === '')
  const isReverseChronoOn = (order === 'REVERSE_CHRONO')

  return <div>
  <button id="RANDOM" onClick={handleClick} className={setClassName(isRandomOn)}>Random</button>
  <button id="CHRONO" onClick={handleClick} className={setClassName(isChronoOn)}> ancient &gt; récent </button>
  <button id="REVERSE_CHRONO" onClick={handleClick} className={setClassName(isReverseChronoOn)}> récent &gt; ancient </button>
</div>
}
export default DeckOrder
