import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FETCH_DECKS, GET_USER } from '../../actions'
import ListDecks from '../ListDecks'
import { NavLink } from 'react-router-dom'
import { motion, MotionConfigContext } from 'framer-motion'
import MDEditor from '@uiw/react-md-editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'
import iconArrow from '../../assets/circle-down-solid.svg'

import './Home.scss'
import './Home_Desktop.scss'

// library.add(fa)

const Home = () => {
  const dispatch = useDispatch()
  // On récupère les decks. Il suffit de les récupérer une fois au montage, donc on utilise useEffect sans dépendances ([])
  const [turnCard, setTurnCard] = useState(false)
  useEffect(() => {
    dispatch({ type: FETCH_DECKS })
  }, [])

  const handleClick = () => {
    setTurnCard((state) => !state)
    setTimeout(() => setTurnCard((state) => !state), 30000)
  }
  const rectoPres = "# C'est quoi memOria?"
  const versoPres = 'Une **app** pour partager des **cartes de révisions** librement et gratuitement, ```avec du code``` ou sans! \n **Cliquez sur un paquet pour commencer!**'

  return (
        <div className="main-content">
            <div className="main-content__presentation-container">
            {!turnCard
              ? <>
              <motion.div

                className="card card__recto"
                onMouseEnter={handleClick}
                // onMouseLeave={handleClick}
                >
                <motion.pre
                // animation de "pulse", mais fait bugger l'autre animation
                // animate={{scale:[1, 1.1, 1]}}
                // transition={{ease:"easeOut", duration:3, repeat: Infinity}}
                className="card__content" >
                <MDEditor.Markdown source={rectoPres} />
                </motion.pre>
            </motion.div>
            <div>
            {/* j'ajoute l'icone flèche en "hidden" ici pour éviter une disruption du flow */}
            <FontAwesomeIcon icon={faArrowCircleDown} size='10x' style={{ visibility: 'hidden' }}/>
            </div>
                </>

              : <>
            <motion.div
                animate={{ rotateY: 180 }}
                className="card card__verso"
                // onHoverEnd={{rotateY:-180}}
                // onMouseEnter={handleClick}
                // onMouseLeave={handleClick}
                >
                <motion.pre
                     animate={{ rotateY: 180 }}
                    className="card__content" style={{ textAlign: 'center' }}>
                <MDEditor.Markdown source={versoPres} />
                </motion.pre>
            </motion.div>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ ease: 'easeOut', duration: 0.8, repeat: Infinity }}
                style={{ textAlign: 'center' }}
                >
                <FontAwesomeIcon icon={faArrowCircleDown} size='10x' style={{ boxShadow: '1 10px 10px black' }}/>
            </motion.div>
            </>

}

            </div>
            <div className="main-content__deck-display">
                <ListDecks />
            </div>
        </div>
  )
}
export default Home
