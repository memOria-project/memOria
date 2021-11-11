import { useDispatch } from 'react-redux'
import { SET_CURRENT_DECK_CONTENT } from '../../actions'

const ResetCard = () => {
  const dispatch = useDispatch()
  dispatch({ type: SET_CURRENT_DECK_CONTENT, currentDeckContent: { id: '', title: '', tags: '', cards: '' } })

  return (null)
}
export default ResetCard
