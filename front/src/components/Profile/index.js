import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import PersonalisedDeck from '../Deck/PersonalisedDeck'
import Loading from '../Loading'
import Form from '../Subscribe/Form'
import UpdateForm from './UpdateForm'
import NewDeckForm from './NewDeckForm'
import './Profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FETCH_USER_DECKS } from '../../actions'

const Profile = () => {
  const { user } = useSelector((state) => state)
  const { name, email } = user
  const isConnected = useSelector((state) => state.user.isConnected)
  const personalizedDecks = useSelector((state) => (state.user.decks))
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showNewDeck, setShowNewDeck] = useState(false)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  console.log(personalizedDecks)
  useEffect(() => {
    // la conditionnelle vise à réduire les appels à l'API. Elle peut être enlevée si besoin.
    if (!personalizedDecks) {
      dispatch({ type: FETCH_USER_DECKS })
    }
  }, [user])
  const handleClick = (event) => {
    console.log(event)
    if (event.target.name === 'newDeck' || event.target.className === 'deck deck--new' || event.target.viewportElement?.parentNode.name === 'newDeck' || event.target.parentNode.name === 'newDeck') {
      setShowNewDeck((state) => !state)
    } else {
      setShowUpdateForm((state) => !state)
    }
  }

  useEffect(() => {
    if (personalizedDecks || personalizedDecks?.length === 0) {
      setLoading(false)
    }
  }, [personalizedDecks])

  useEffect(() => {
    setShowUpdateForm(false)
  }, [user.name, user.email, user.password])

  if (!isConnected) {
    console.log('redirect')
    return <Redirect to="/signin" />
  }

  return (<>
        <div>
          {/* <h2>Bienvenue {name}</h2> */}
        </div>

        {/* <div className="profileEdit">
          <p><strong>Adresse Email</strong>: {email}</p>

        </div> */}
        <div className="personalizedDecksDisplay">
          <h1 className="personalizedDecksDisplay__title">Tes paquets</h1>

          <div className="personalizedDecksDisplay__decks-container">
          <div name="newDeck" className="deck deck--new" >
            <button name="newDeck" style={{ backgroundColor: 'transparent' }} onClick={handleClick}>
              <FontAwesomeIcon icon={faPlus} size="3x" style={{ color: '#16a085' }} />
            </button>
          </div>
          {showNewDeck &&
          <NewDeckForm handleClick={handleClick} setShowNewDeck={setShowNewDeck} />
          }
          {personalizedDecks && personalizedDecks.length > 0 && personalizedDecks.map((deck) => {
            return <Fragment key={deck.id}> <PersonalisedDeck deck={deck} /> </Fragment>
          })}

          {loading && <Loading />}

          </div>

          </div>
          {showUpdateForm
            ? <>
            <UpdateForm setShowUpdateForm={setShowUpdateForm} />
            <button onClick={handleClick}>retour</button>
          </>
            : <button className="confirm" onClick={handleClick}>Infos personnelles</button>
          }

        </>
  )
}
export default Profile
// const handleSubmit = (event) => {
//   event.preventDefault();
//   dispatch({type:CHANGE_PASSWORD});
// }

// const handleChange = (event, field) => {
//   dispatch({
//       type:UPDATE_LOGIN,
//       value: event.target.value,
//       field })
// }

{ /* Personal information changing section */ }
{ /* <form onSubmit={handleSubmit}>
        <p>Nom d'utilisateur: {name} </p>
        <p>Email: {email} </p>

        <p>Vous pouvez ici changer votre mot de passe :</p>
        <label htmlFor="precedentPassword">Ancient mot de passe
            <input onChange={(event)=> handleChange(event, "password")} id="precedentPassword" type="password" value={precedentPassword} />
        </label>
        <label htmlFor="newPassword">Nouveau mot de passe :
            <input onChange={(event)=> handleChange(event, "password")} id="confirmNewPassword" type="password" value={newPassword} />
        </label>
        <label htmlFor="confirmNewPassword">Confirmez votre nouveau mot de passe :
            <input onChange={(event)=> handleChange(event, "password")} id="confirmNewPassword" type="password" value={confirmNewPassword} />
        </label>

        <button type="submit">submit</button>
    </form> */ }

{ /* lien vers l'éditeur de cartes */ }
{ /* <NavLink to="/deckEditor/1">Éditeur de cartes</NavLink> */ }

{ /* Personalized decks */ }
