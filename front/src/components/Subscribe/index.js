/* eslint-disable no-control-regex */
/* eslint-disable react/no-unescaped-entities */

import { useDispatch, useSelector } from 'react-redux'
import './subscribe.scss'
import { Link, Redirect } from 'react-router-dom'
import Form from './Form'

const Subscribe = () => {
  const dispatch = useDispatch()
  const isConnected = useSelector((state)=>state.user.isConnected)
  // stope un utilisateur connecté de soumettre le formulaire

  if(isConnected){
    console.log("redirect")
    return <Redirect to="/profile" />
  }

  return <div className='formContainer'>
  <Form />
  </div>
}
export default Subscribe
