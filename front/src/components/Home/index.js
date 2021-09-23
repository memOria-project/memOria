import ListDecks from '../ListDecks'
import './Home_Desktop.scss'

const Home = ()=>{
return (
        <div> 
            <div className="main-content__presentation-container">
                <h2 className="presentation-container__title">Présentation</h2>
                <div className="presentation-container__content">Lorem ipsum...</div>
            </div>
            <div className="main-content__decks-container">
                <h1 className="decks-container__title">Les decks memOria</h1>
                <ListDecks />
            </div>
        </div>
        )

}
export default Home