import Deck from '../Deck'
import { useSelector } from 'react-redux';
import './ListDecks.scss'
import './ListDecks-Desktop.scss'
import Loading from '../Loading';
import { Fragment } from 'react';

const ListDecks = ()=>{
    const allDecks = useSelector((state)=>(state.decks))
    const decks = allDecks.filter((deck)=> deck.card_number > 0)
    console.log(decks);


return (
        <div className="decks-container">
            {decks.length>1?decks.map((deck) => {
                return <Fragment key={deck.id}> <Deck  deck={deck} /> </Fragment>
            }):<Loading />}
        </div>
        )
}
export default ListDecks