import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { SUBSCRIBE } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import './subscribe.scss'
import { Link, Redirect } from 'react-router-dom'

  
 
const ProfileEditor = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, getValues, formState: { errors, isValid } } = useForm({ mode: 'onChange' })
  const isConnected = useSelector((state)=>state.user.isConnected)
  // stope un utilisateur connecté de soumettre le formulaire
  
return 
}
export default ProfileEditor