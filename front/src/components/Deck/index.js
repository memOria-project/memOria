import "./Deck.scss";

const Deck = ({deck})=>{

    const {id, title, created_at, tag} = deck;
    const date = Date(created_at);

    return (
    <p className="deck"> id: {id} title: {title} created: {date} tag:{tag}</p>
    )
}
export default Deck