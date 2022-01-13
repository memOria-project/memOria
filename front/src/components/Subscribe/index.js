/* eslint-disable no-control-regex */
/* eslint-disable react/no-unescaped-entities */

import { useSelector } from 'react-redux'
import './subscribe.scss'
import { Redirect } from 'react-router-dom'
import Form from './Form'

const Subscribe = () => {
  const isConnected = useSelector((state) => state.user.isConnected)
  // stope un utilisateur connecté de soumettre le formulaire

  if (isConnected) {
    return <Redirect to="/profile" />
  }

  return <div className='formContainer'>
  <Form />
  </div>
}
export default Subscribe
