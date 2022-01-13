import { useState } from 'react'
import { motion } from 'framer-motion'
import MDEditor from '@uiw/react-md-editor'
import './NoMatch.scss'
import PropTypes from 'prop-types'
import { setReason } from './setReason'

const NoMatch = ({ reason }) => {
  const [turnCard, setTurnCard] = useState(false)

  const handleClick = () => {
    setTurnCard((state) => !state)
  }

  const [rectoPres, versoPres] = setReason(reason)

  return (<div className="NoMatch__container">
        {!turnCard
          ? <motion.div

                        className="card card__recto"
                        onClick={handleClick}
                        // onMouseLeave={handleClick}
                        >
                        <motion.pre
                        // animation de "pulse", mais fait bugger l'autre animation
                        // animate={{scale:[1, 1.1, 1]}}
                        // transition={{ease:"easeOut", duration:3, repeat: Infinity}}
                        className="card__content" style={{ textAlign: 'center' }}>
                        <MDEditor.Markdown source={rectoPres} />
                        </motion.pre>
                    </motion.div>
          : <motion.div
                        animate={{ rotateY: 180 }}
                        onClick={handleClick}
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
                }
                </div>)
}
export default NoMatch

NoMatch.propTypes = {
  reason: PropTypes.string
}
