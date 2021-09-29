import "./CardDisplay.scss";
import "./CardDisplay-Desktop.scss";
import { useParams } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RETURN_CARD, RESET_CARD, SET_CURRENT_DECK_ID, FETCH_CARDS, SET_CURRENT_CARD } from '../../actions';
import RectoVerso  from '../RectoVerso';
import MDEditor from '@uiw/react-md-editor';

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


  

  

  //If deck id has changed in the URl, 
  //sets the current_deck_id property in store to the id 
  //of the deck currently displayed.
  const previousDeckId = useSelector(state => state.currentDeck)
  
  console.log("previousDeckId", previousDeckId);
  
  //Set the current deck id in the state
  useEffect(() => {
    dispatch({ type: SET_CURRENT_DECK_ID, currentDeckId: deckId })
    }, [])
    
  console.log("currentDeckId", useSelector(state => state.currentDeck).currentDeckId);

  //Fetch the current deck content from the database
  useEffect(() => {
    dispatch({ type: FETCH_CARDS })
  }, [ deckId ])

  
  

  //with the real database :
 let database = useSelector(state => state.currentDeck).currentDeckContent

 //fix temporaire tant que la réponse à FETCH_CARDS est un array
 database = database[0];
 console.log("database", database);
  
  //with a testing fake database
  // let database = {
  //  "1":{
  //   "name":"TestDeck",
  //   "1":{
  //      "recto":"1515",
  //      "verso":"Marignan"
  //   },
  //   "2":{
  //      "recto":"1492",
  //      "verso":"Découverte de l'Amérique"
  //   },
  //   "3":{
  //      "recto":"1789",
  //      "verso":"Chute de la Bastille"
  //   },
  //   "4":{
  //      "recto":"1815",
  //      "verso":"Waterloo"
  //   },
  //   "5":{
  //      "recto":"1914",
  //      "verso":"Guerre mondiale"
  //   },
   //  "6":{
   //     "recto":"recto6",
   //     "verso":"verso6"
   //  },
   //  "7":{
   //     "recto":"recto7",
   //     "verso":"verso7"
   //  },
   //  "8":{
   //     "recto":"recto8",
   //     "verso":"verso8"
   //  },
   //  "9":{
   //     "recto":"recto9",
   //     "verso":"verso9"
   //  },
   //  "10":{
   //     "recto":"recto10",
   //     "verso":"verso10"
   //  }
//  }
// }

  
  // number of cards in deck  
  let cardsNumberInDeck;
  let nextCardURL;

  if(database){
  cardsNumberInDeck = database["cards"].length;
  let randomNextCardId = Math.floor(cardsNumberInDeck*Math.random() + 1);

  console.log("next card id", randomNextCardId);
  nextCardURL = `/deck/${deckId}/${randomNextCardId}` 

  console.log("database[cards][0])", database["cards"][0]);
  console.log("cardId",cardId);
  } 

   const handleClickReturn = () => {
      dispatch({type:RETURN_CARD, isRecto: currentView.isRecto})
   }
   const handleClickNext = () => {
      dispatch({type:RESET_CARD, isRecto: defaultView.isRecto})
      console.log("reset")
   } 

 
  
  return (database?
                <>
            <p className="deck__title">{database["title"]} </p>
            <div style={{margin:"2em"}}> <h1>Je veux voir en premier </h1>
            <RectoVerso />
            </div>
            <p style={{fontSize: "1.5em"}}> Card #{cardId} / {cardsNumberInDeck}</p>
             <p className="card">
            {currentView.isRecto?
            <MDEditor.Markdown source={database["cards"][cardId - 1]["recto"]} />
            :
            <MDEditor.Markdown source={database["cards"][cardId - 1]["verso"]} />
            }</p> 
            <button onClick={handleClickReturn}>Retourner</button>
            <button onClick={()=>handleClickNext()}> <NavLink to={nextCardURL} > Carte suivante au hasard dans le paquet </NavLink> </button>
            </>
            :<p>Loading</p>)
          

            
          
}

export default CardDisplay;