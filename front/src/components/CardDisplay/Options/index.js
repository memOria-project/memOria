import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { PICK_NEW_GAME, PICK_ORDER } from '../../../actions'
import RectoVerso from './RectoVerso'
import DelayedCards from './DelayedCards'
import DeckOrder from './DeckOrder'
import optionSwitch from './optionSwitch'

const Options = ({ setShowOptions, delayedCards, firstCard }) => {
  const { isConnected } = useSelector((state) => state.user)
  const { defaultView: { isRecto } } = useSelector((state) => state.options)

  const dispatch = useDispatch()
  const [preview, setPreview] = useState()
  const handleClick = (event) => {
    optionSwitch(event.target.id, dispatch)
    if (event.target.id === 'start') {
      setShowOptions((state) => !state)
    }
  }

  useEffect(() => {
    if (isRecto) {
      setPreview(<div>"{firstCard.recto.substring(0, 25)}..." </div>)
      console.log('recto')
    } else {
      setPreview(<div>"{firstCard.verso.substring(0, 25)}..." </div>)
      console.log('verso')
    }
  }, [isRecto])

  return (
    <div>
      <h1> Options</h1>

      <h2> Face par défaut </h2>
        <RectoVerso firstCard={firstCard} />
      <h2> Ordre </h2>
        <DeckOrder handleClick={handleClick}/>

      {isConnected &&
        <>
          <h2>Montrer...</h2>
          <DelayedCards handleClick={handleClick} delayedCards={delayedCards.length} />
        </>
        }
    <h2> Aperçu </h2>
        {isRecto
          ? <div>"{firstCard.recto.substring(0, 30)}..." </div>
          : <div>"{firstCard.verso.substring(0, 30)}..." </div>}
        <button className="btn__submit" id="start" type="submit" onClick={handleClick}>Continuer </button>
     </div>
  )
}
export default Options
