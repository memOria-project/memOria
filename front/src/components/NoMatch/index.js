import { useState } from 'react';
import { motion } from 'framer-motion';
import MDEditor from '@uiw/react-md-editor';

const NoMatch = () => {
    const [turnCard, setTurnCard] = useState(false)
    
    const handleClick = () => {
        setTurnCard((state)=> !state);
        setTimeout(()=>setTurnCard((state)=>!state), 2000)
    }
    const rectoPres = "# 404\nCeci n'est pas une carte";
    const versoPres = "Vous avez trouvé mug O'Clock\n![](https://image.shutterstock.com/image-photo/isolate-broken-mug-mugs-shards-260nw-1094446331.jpg)";

    return (
        <div className="main-content"> 
            <div className="main-content__presentation-container">
                {!turnCard?
                    <motion.div 

                        className="card card__recto"
                        onMouseEnter={handleClick}
                        // onMouseLeave={handleClick}                
                        >
                        <motion.pre
                        // animation de "pulse", mais fait bugger l'autre animation
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
                        // onHoverEnd={{rotateY:-180}}
                        // onMouseEnter={handleClick}
                        // onMouseLeave={handleClick}
                        >
                        <motion.pre 
                                        animate={{rotateY:180}}

                                        className="card__content" style={{textAlign:"center"}}>
                        <MDEditor.Markdown source={versoPres} />
                        </motion.pre>
                    </motion.div>
                    </>

                }
            </div>
        </div>    
    )
    }
export default NoMatch