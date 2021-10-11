import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_DECKS, GET_USER } from '../../actions';
import ListDecks from '../ListDecks';
import { NavLink } from 'react-router-dom';
import './Home.scss'
import './Home_Desktop.scss';


const Home = ()=>{
    const dispatch = useDispatch();
    // On récupère les decks. Il suffit de les récupérer une fois au montage, donc on utilise useEffect sans dépendances ([])
    const hello = 1;
    useEffect(()=> {
        dispatch({type: FETCH_DECKS})

    }, [ ])

return (
        <div className="main-content"> 
            <div className="main-content__presentation-container">
                <div className="presentation-container__content">
                    <p>Memoria est une plateforme de partage de cartes de révision. L'accès est libre et gratuit. Les paquets regroupent des cartes autour d’un thème. </p>
                    <p> </p>
                <p>Connecte toi pour créer tes propres paquets et enregistrer la progression de ton apprentissage.</p>
            </div>
            </div>
            <div className="main-content__deck-display">
                <h2 href="/deck/1/1" className="deck-display__title">Commençons ici</h2>
                <ListDecks />
            </div>
        </div>
        )

}
export default Home