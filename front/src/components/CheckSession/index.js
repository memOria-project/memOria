
// N'est plus utilisé. A été remplacé par la fonction éponyme.

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CHECK_TOKEN } from '../../actions'

const CheckSession = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: CHECK_TOKEN })
  })

  return <span style={{ visibility: 'hidden', position: 'absolute' }}>token verifiée</span>
}
export default CheckSession
