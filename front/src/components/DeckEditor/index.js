import { useSelector, useDispatch } from 'react-redux'
import Deck from '../Deck';
import { FETCH_DECKS } from '../../actions'
import { useEffect } from 'react'
import './DeckEditor.scss'

const DeckEditor = () => {

  const dispatch = useDispatch();

  // const personalizedDecks = useSelector((state)=>(state.user.decks));
  // console.log(personalizedDecks);

  //temporary: access to common deck for testing purpose
  useEffect(()=> {
    dispatch({ type: FETCH_DECKS })}, [ ])
  

  const commonDecks = useSelector((state)=>(state.decks))
  console.log("commonDeck", commonDecks);

  let firstCommonDeck;
  if (commonDecks !== []) {
    firstCommonDeck = commonDecks[0]["cards"];
    //;

    console.log("firstCommonDeck",firstCommonDeck);
  }

  

  return (   null
    // <div>
    //   <p>Liste des cartes du deck :</p>
    //   {commonDecks !== []? firstCommonDeck.map((card) => {return (
    //     <p className="rectoVersoView">
    //       <p className="card">{card.recto}</p>
    //       <p className="card">card.verso</p>
    //     </p>)})
    //     : <p>Loading...</p>})
    // </div>  
    )

}

export default DeckEditor