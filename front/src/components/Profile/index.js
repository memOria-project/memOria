import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import PersonalisedDeck from '../Deck/PersonalisedDeck'
import Loading from '../Loading'
import UpdateForm from './UpdateForm'
import NewDeckForm from './NewDeckForm'
import { FETCH_USER_DECKS, SET_LOADING } from '../../actions'

import './Profile.scss'
import ErrorMessage from '../ErrorMessage'

const Profile = () => {
  //! ↓ STATE ↓
  const { user } = useSelector((state) => state)
  const isConnected = useSelector((state) => state.user.isConnected)
  const { decks, loading, error } = useSelector((state) => (state.user))
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showNewDeck, setShowNewDeck] = useState(false)
  const dispatch = useDispatch()

  //! ↓ AUTRE ↓
  const handleClick = (event) => {
    console.log(event)
    if (event.target.name === 'newDeck' || event.target.className === 'deck deck--new' || event.target.viewportElement?.parentNode.name === 'newDeck' || event.target.parentNode.name === 'newDeck') {
      setShowNewDeck((state) => !state)
    } else {
      setShowUpdateForm((state) => !state)
    }
  }
  const styleLoading = classNames({
    modal: loading
  })
  //! ↓ EFFETS DE BORD ↓

  if (!isConnected) {
    console.log('redirect')
    return <Redirect to="/signin" />
  }

  useEffect(() => {
    dispatch({ type: SET_LOADING, status: true })
  }, [])

  useEffect(() => {
    // la conditionnelle vise à réduire les appels à l'API. Elle peut être enlevée si besoin.
    if (!decks && !error) {
      dispatch({ type: FETCH_USER_DECKS })
    }
  }, [user])

  // enlève le spinner si le chargement réussi
  useEffect(() => {
    if (decks || decks?.length === 0) {
      dispatch({ type: SET_LOADING, status: false })
    }
  }, [decks])

  // cache le formulaire si les modifications ont réussi
  useEffect(() => {
    setShowUpdateForm(false)
  }, [user.name, user.email, user.password])

  return (loading
    ? <div className={styleLoading}>
                {loading && <Loading />}
              </div>
    : error
      ? <ErrorMessage message={error} />
      : <>
          <h1 className="userDecks__title">Tes paquets</h1>

          <div className="userDecks__container">
            <div name="newDeck" className="deck deck--new" >
              <button name="newDeck" style={{ backgroundColor: 'transparent' }} onClick={handleClick}>
                <FontAwesomeIcon icon={faPlus} size="3x" style={{ color: '#16a085' }} />
              </button>
            </div>
            {showNewDeck &&
            <NewDeckForm handleClick={handleClick} setShowNewDeck={setShowNewDeck} />
            }
            {decks && decks.length > 0 && decks.map((deck) => {
              return <Fragment key={deck.id}> <PersonalisedDeck deck={deck} /> </Fragment>
            })}

          </div>
          {showUpdateForm
            ? <>
            <UpdateForm setShowUpdateForm={setShowUpdateForm} />
          </>
            : <button className="confirm" onClick={handleClick}>Infos personnelles</button>
          }

        </>
  )
}
export default Profile
