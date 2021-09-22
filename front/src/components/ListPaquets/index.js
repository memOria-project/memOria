import Paquet from '../Paquet'

const ListPaquets = ()=>{
    const paquets = [
        {id:1, title:"javascript", created_at:1632302004, tag:"React"}, 
        {id:2, title:"HTML", created_at:1632302005, tag:"Elements"}, 
        {id:3, title:"CSS", created_at:16323020060, tag:"selectors"}
    ];

return (
        <div className="cards-container__card">
            {paquets.map((paquet) => {
                return <div className="card__title" key={paquet.id}> <Paquet  paquet={paquet} /> </div>
            })}
        </div>
        )
}
export default ListPaquets