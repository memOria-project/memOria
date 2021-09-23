const Paquet = ({paquet})=>{

    const {id, title, created_at, tag} = paquet;
    const date = Date(created_at);

    return (
    <p> id: {id} title: {title} created: {date} tag:{tag}</p>
    )
}
export default Paquet