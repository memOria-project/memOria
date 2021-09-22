// const Paquet = ({paquet})=>{
//     const {id, title, created_at, tag} = paquet;
//     return (
//     <p> id: {id} title: {title} created: {new Date(created_at*1000)} tag:{tag}</p>
//     )
// }


const Paquet = ({paquet})=>{
    const {id, title, created_at, timestamp, tag} = paquet;
    console.log({id, title, created_at, timestamp, tag})
    const date = Date(timestamp);
    console.log(date);
    return (
    <p> id: {id} title: {title} created: {date} tag:{tag}</p>
    )
}
export default Paquet