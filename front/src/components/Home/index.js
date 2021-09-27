import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_DECKS, GET_USER } from '../../actions';
import ListDecks from '../ListDecks';
import './Home_Desktop.scss';
import './Home.scss'


const Home = ()=>{
    const dispatch = useDispatch();
    // On récupère les decks. Il suffit de les récupérer une fois au montage, donc on utilise useEffect sans dépendances ([])
    const hello = 1;
    useEffect(()=> {
        dispatch({type: FETCH_DECKS})

    }, [ ])

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