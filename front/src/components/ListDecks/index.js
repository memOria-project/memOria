import Deck from '../Deck'
import { useSelector } from 'react-redux';
import './ListDecks.scss'
import './ListDecks-Desktop.scss'
import Loading from '../Loading';

const ListDecks = ()=>{
    const decks = useSelector((state)=>(state.decks))
    console.log(decks);
return (
        <div className="decks-container">
            {decks.length>1?decks.map((deck) => {
                return <div className="deck-container" key={deck.id}> <Deck  deck={deck} /> </div>
            }):<Loading />}
        </div>
        )
}
export default ListDecks