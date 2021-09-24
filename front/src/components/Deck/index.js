import "./Deck.scss";

const Deck = ({deck})=>{

    const {id, title, created_at, tag} = deck;
    const myTags = tag.map((oneTag) => oneTag)
    return (
    <p className="deck"> id: {id} title: {title} created: {created_at} tag:{myTags}</p>
    )
}
export default Deck