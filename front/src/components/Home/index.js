import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_DECKS, GET_USER } from '../../actions';
import ListDecks from '../ListDecks';
import { NavLink } from 'react-router-dom';
import {motion, MotionConfigContext} from 'framer-motion';
import MDEditor from '@uiw/react-md-editor';
import './Home_Desktop.scss';
import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faArrowCircleDown} from '@fortawesome/free-solid-svg-icons'
import iconArrow from '../../assets/circle-down-solid.svg';

// library.add(fa)

const Home = ()=>{
    const dispatch = useDispatch();
    // On récupère les decks. Il suffit de les récupérer une fois au montage, donc on utilise useEffect sans dépendances ([])
    const [turnCard, setTurnCard] = useState(false)
    useEffect(()=> {
        dispatch({type: FETCH_DECKS})

    }, [])

    const handleClick = () => {
        setTurnCard((state)=> !state);
    }
    const rectoPres = "# Ancrer le savoir dans la mémoire";
    const versoPres = "Avec **memOria**, partagez **librement** et **gratuitement** des **cartes de révisions**";

return (
        <div className="main-content"> 
            <div className="main-content__presentation-container">
            {!turnCard?
            <motion.div 

                className="card card__recto"
                onMouseEnter={handleClick}
                onMouseLeave={handleClick}                
                >
                <motion.pre
                // animate={{scale:[1, 1.1, 1]}}
                // transition={{ease:"easeOut", duration:3, repeat: Infinity}}
                className="card__content" style={{textAlign:"center"}}>
                <MDEditor.Markdown source={rectoPres} />
                </motion.pre>
            </motion.div>
            :
            <>
            <motion.div 
                animate={{rotateY:180}}
                className="card card__verso"
                onHoverEnd={{rotateY:-180}}
                onMouseEnter={handleClick}
                onMouseLeave={handleClick}
                >
                <motion.pre 
                                animate={{rotateY:180}}

                                className="card__content" style={{textAlign:"center"}}>
                <MDEditor.Markdown source={versoPres} />
                </motion.pre>
            </motion.div>
            <motion.div
                animate={{y:[0,10, 0]}}
                transition={{ease:"easeOut", duration:0.8, repeat: Infinity}}
                style={{textAlign:"center"}}
                > 
                <FontAwesomeIcon icon={faArrowCircleDown} size='10x' />
            </motion.div>
            </>

}




            </div>
            <div className="main-content__deck-display">
                <h2 href="/deck/1/1" className="deck-display__title">Commençons ici</h2>
                <ListDecks />
            </div>
        </div>
        )

}
export default Home