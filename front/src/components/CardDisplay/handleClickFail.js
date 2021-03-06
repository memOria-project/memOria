import { useDispatch } from 'react-redux'
import { PICK_NEW_GAME, CHECK_TOKEN } from '../../actions'

const handleClickCheckFail = (database, setCurrentCard, dispatch = useDispatch()) => {
  dispatch({ type: PICK_NEW_GAME, field: 'databaseSelector', value: 'FAILED_1ST_ROUND' })
  const { id, recto, verso } = database[0]

  setCurrentCard({ index: 0, id, recto, verso })

  dispatch({ type: CHECK_TOKEN })
}

export default handleClickCheckFail
