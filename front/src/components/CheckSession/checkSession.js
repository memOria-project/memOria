import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CHECK_TOKEN } from '../../actions'

export const checkSession = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: CHECK_TOKEN })
  })

  return <span style={{ visibility: 'hidden', position: 'absolute' }}>token verifiée</span>
}
