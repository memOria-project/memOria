import "./CardDisplay.scss";
import "./CardDisplay-Desktop.scss";
import { useParams } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RETURN_CARD, RESET_CARD } from '../../actions';
import RectoVerso  from '../RectoVerso';
// import jsonTestDatabase from '../../assets/jsonTestDatabase';

//Display zone for cards. Cards from a Deck are displayed one by one.
//User can choose to switch to card verso and vice versa.
const CardDisplay = () =>  {
  const {defaultView, currentView} = useSelector((state)=>state.card)
//   const [isRecto, setIsRecto ] = useState(true)
  const dispatch= useDispatch()
  console.log("test");
  //use URl parameters to determine the card to display from deck and card id
  let { deckId, cardId } = useParams();
  console.log("deckId", deckId);
  
  //with a testing fake database
  let database = {
   "1":{
    "name":"TestDeck",
    "1":{
       "recto":"recto1",
       "verso":"verso1"
    },
    "2":{
       "recto":"recto2",
       "verso":"verso2"
    },
    "3":{
       "recto":"recto3",
       "verso":"verso3"
    },
    "4":{
       "recto":"recto4",
       "verso":"verso4"
    },
    "5":{
       "recto":"recto5",
       "verso":"verso5"
    },
    "6":{
       "recto":"recto6",
       "verso":"verso6"
    },
    "7":{
       "recto":"recto7",
       "verso":"verso7"
    },
    "8":{
       "recto":"recto8",
       "verso":"verso8"
    },
    "9":{
       "recto":"recto9",
       "verso":"verso9"
    },
    "10":{
       "recto":"recto10",
       "verso":"verso10"
    }
 }
}

  //number of properties in deck 1 minus name property : number of cards 
  let cardsNumberInDeck= Object.keys(database[deckId]).length - 1;
  

  let randomNextCardId = Math.floor(cardsNumberInDeck*Math.random() + 1);

  console.log("next card id", randomNextCardId);
  const nextCardURL = `/deck/${deckId}/${randomNextCardId}` 

   const handleClickReturn = () => {
      dispatch({type:RETURN_CARD, isRecto: currentView.isRecto})
   }
   const handleClickNext = () => {
      dispatch({type:RESET_CARD, isRecto: defaultView.isRecto})
      console.log("reset")
   }
  return (<>
   
            <p className="deck__title">{database[deckId]["name"]} </p>
            <div style={{margin:"2em"}}> <h1>Je veux voir en premier </h1>
            <RectoVerso />
            </div>
            <p style={{fontSize: "1.5em"}}> Card #{cardId} / {cardsNumberInDeck}</p>
            <p className="card">
            {currentView.isRecto?
            <> {database[deckId][cardId]["recto"]}</>
            :  
            <>{database[deckId][cardId]["verso"]}</>
            }</p>
            <button onClick={handleClickReturn}>Retourner</button>
            <button onClick={()=>handleClickNext()}> <NavLink to={nextCardURL} > Carte suivante au hasard dans le paquet </NavLink> </button>
          </>
          )
}

export default CardDisplay;