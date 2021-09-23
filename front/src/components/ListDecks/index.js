import Deck from '../Deck'
import { useSelector } from 'react-redux';

const ListDecks = ()=>{
    const decks = useSelector((state)=>(state.decks))
    console.log(decks);
return (
        <div className="cards-container__card">
            {decks.decks?decks.map((deck) => {
                return <div className="card__title" key={deck.id}> <Deck  deck={deck} /> </div>
            }):<p>Loading</p>}
        </div>
        )
}
export default ListDecks