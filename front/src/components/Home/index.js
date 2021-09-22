import ListPaquets from '../ListPaquets'
import './Home_Desktop.scss'

const Home = ()=>{
return (
        <div> 
            <div className="main-content__presentation-container">
                <h2 className="presentation-container__title">Présentation</h2>
                <div className="presentation-container__content">Lorem ipsum...</div>
            </div>
            <div className="main-content__paquets-container">
                <h1 className="paquets-container__title">Les paquets memOria</h1>
                <ListPaquets />
            </div>
        </div>
        )

}
export default Home