import "./CardDisplay.scss"
import "./CardDisplay-Desktop.scss"
import { useParams } from "react-router-dom"

import jsonTestDatabase from '../../assets/jsonTestDatabase';
//Display zone for cards. Cards from a Deck are displayed one by one.
//User can choose to switch to card verso and vice versa.
const CardsDisplay = () =>  {

  //use URl parameters to determine the card to display from deck and card id
  let { deckId, cardId } = useParams();
  
  //with a testing fake database
  let database = JSON.parse(jsonTestDatabase);

  return (<p className="card">deck :{database[deckId]["name"]} card: {database[deckId][cardId]} </p>)
}

export default CardsDisplay;