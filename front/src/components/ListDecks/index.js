import Deck from '../Deck'
import { useSelector } from 'react-redux';

const ListDecks = ()=>{
    const decks = useSelector((state)=>(state.decks))

return (
        <div className="decks-container__deck">
            {decks.map((deck) => {
                return <div className="deck__title" key={deck.id}> <Deck  deck={deck} /> </div>
            })}
        </div>
        )
}
export default ListDecks