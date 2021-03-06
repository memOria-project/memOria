import Deck from '../Deck'
import { useSelector } from 'react-redux'
import './ListDecks.scss'
import './ListDecks-Desktop.scss'
import Loading from '../Loading'
import { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'

const ListDecks = () => {
  const allDecks = useSelector((state) => (state.decks))
  const decks = allDecks.filter((deck) => deck.card_number > 0)
  const decksWithTags = allDecks.filter((deck) => deck.tag !== null)
  const oclockDecks = decksWithTags.filter((deck) => deck.tag[0] === 'oclock')
  console.log(oclockDecks)
  console.log(decks)
  const [openUser, setOpenUser] = useState(false)
  const handleClick = () => {
    setOpenUser((state) => !state)
  }

  return (<>
        <div className="decks-container">
            {decks.length > 1
              ? oclockDecks.map((deck) => {
                return <Fragment key={deck.id}> <Deck deck={deck} /> </Fragment>
              })
              : <Loading />}
        </div>
        <h2> <button className="confirm" onClick={handleClick}> {openUser ? 'v' : '>'} Paquets de nos utilisateurs {openUser ? 'v' : '<'} </button></h2>
        {openUser &&
        <div className="decks-container">
            {decks.length > 1
              ? decks.map((deck) => {
                const path = `/deck/${deck.id}/0`

                return <Fragment key={deck.id}><NavLink to={path}> <Deck deck={deck} /></NavLink> </Fragment>
              })
              : <Loading />}
        </div>
        }
        </>
  )
}
export default ListDecks
