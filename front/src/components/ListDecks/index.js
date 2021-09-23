import Deck from '../Deck'
import { useSelector } from 'react-redux';

const ListDecks = ()=>{
    const decks = useSelector((state)=>(state.decks))
    console.log(decks);
return (
        <div className="decks-container">
            {decks.map((deck) => {
                return <div className="deck-container" key={deck.id}> <Deck  deck={deck} /> </div>
            })}
        </div>
        )
}
export default ListDecks