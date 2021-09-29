import { useSelector } from 'react-redux'
import Deck from '../Deck';
import { FETCH_DECKS } from '../../actions'


const DeckEditor = () => {

  const personalizedDecks = useSelector((state)=>(state.user.decks))
  console.log(personalizedDecks);

  //temporary: access to common deck for testing purpose
  useEffect(()=> {
    dispatch({type: FETCH_DECKS})}, [ ])
  const commonDecks = useSelector((state)=>(state.deck))
  console.log(personalizedDecks);

  return ( 
    <>
    {for}
    </>
)
}

