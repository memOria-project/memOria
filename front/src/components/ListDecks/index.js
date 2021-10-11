import Deck from '../Deck'
import { useSelector } from 'react-redux';
import './ListDecks.scss'
import './ListDecks-Desktop.scss'
import Loading from '../Loading';
import { Fragment, useState } from 'react';

const ListDecks = ()=>{
    const allDecks = useSelector((state)=>(state.decks))
    const decks = allDecks.filter((deck)=> deck.card_number > 0)
    const decksWithTags = allDecks.filter((deck)=>deck.tag !== null);
    const oclockDecks= decksWithTags.filter((deck)=>deck.tag[0] === "oclock")
    console.log(oclockDecks);
    console.log(decks);
    const [openUser, setOpenUser] = useState(false)
    const handleClick= () => {
        setOpenUser((state)=>!state)
    }
return (<>
        <div className="decks-container">
            {decks.length>1?oclockDecks.map((deck) => {
                return <Fragment key={deck.id}> <Deck  deck={deck} /> </Fragment>
            }):<Loading />}
        </div>
        <h2 onClick={handleClick}> {openUser?"v":">"} Paquets de nos utilisateurs {openUser?"v":"<"}</h2> 
        {openUser&&
        <div className="decks-container">
            {decks.length>1?decks.map((deck) => {
                return <Fragment key={deck.id}> <Deck  deck={deck} /> </Fragment>
            }):<Loading />}
        </div>
        }
        </>
        )
}
export default ListDecks