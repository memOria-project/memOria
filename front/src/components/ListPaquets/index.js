import Paquet from '../Paquet'
import { useSelector } from 'react-redux';

const ListPaquets = ()=>{
    const paquets = useSelector((state)=>(state.paquets))

return (
        <div className="cards-container__card">
            {paquets.map((paquet) => {
                return <div className="card__title" key={paquet.id}> <Paquet  paquet={paquet} /> </div>
            })}
        </div>
        )
}
export default ListPaquets