import "./CardDisplay.scss";
import "./CardDisplay-Desktop.scss";
import { useParams } from "react-router-dom"
import { NavLink } from 'react-router-dom';

// import jsonTestDatabase from '../../assets/jsonTestDatabase';

//Display zone for cards. Cards from a Deck are displayed one by one.
//User can choose to switch to card verso and vice versa.
const CardDisplay = () =>  {

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


  return (<>
            <p className="card">paquet :{database[deckId]["name"]} </p>
            <p>recto de la carte: {database[deckId][cardId]["recto"]}</p>  
            <p>verso de la carte: {database[deckId][cardId]["verso"]}</p>

            <NavLink to={nextCardURL}> Carte suivante au hasard dans le paquet </NavLink>
          </>
          )
}

export default CardDisplay;