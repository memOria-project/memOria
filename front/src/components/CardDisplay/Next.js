import { useDispatch } from 'react-redux'
import {NavLink} from 'react-router-dom'
import { FETCH_CARDS } from '../../actions'

const Next = ({ nextCard, deckId,  handleClickNext, cardsNumberInDeck, setNextCard }) => {
  // if(nextCard >=cardsNumberInDeck-1) {
  //   setNextCard(cardsNumberInDeck-2)
  //   console.log("after modif", nextCard)
  // }
  const dispatch = useDispatch()
  const nextCardURL = () => { if(nextCard >=cardsNumberInDeck || nextCard === 0) {
    return `/deck/${deckId}/${nextCard}`
  } else {
    return `/deck/${deckId}/${nextCard-1}`
  }
}
  const tryAgainURL= `/`
  console.log("sans modif", nextCard);
return (cardsNumberInDeck>1?<button onClick={()=>handleClickNext()}> <NavLink to={nextCardURL} > Carte suivante au hasard dans le paquet </NavLink>
               </button>
        :<button onClick={()=>dispatch({type:FETCH_CARDS, deckId})}> Essaye encore </button>)
       

}
export default Next