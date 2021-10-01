import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_DECKS, GET_USER } from '../../actions';
import ListDecks from '../ListDecks';
import { NavLink } from 'react-router-dom';
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
        <div className="main-content"> 
            <div className="main-content__presentation-container">
                <h2 className="presentation-container__title">Présentation</h2>
                <div className="presentation-container__content">Memoria est une plateforme mettant à disposition des apprenants O’Clock des paquets de cartes de révision, construit autour d’une thématique, consultable librement et gratuitement.
Memoria se démarque d’autres logiciels de flashcards en offrant des outils particuliers pour les développeurs, telle que l’intégration de snippets avec colorisation automatique de la syntaxe.
</div>
            </div>
            <div className="main-content__deck-display">
                <h2 href="/deck/1/1" className="deck-display__title">Les decks memOria </h2>
                <ListDecks />
            </div>
        </div>
        )

}
export default Home