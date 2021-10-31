import MDEditor from '@uiw/react-md-editor'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import Form from './Form.js'
import { GET_CARD, FETCH_CARDS, getCurrentDeckContent, POST_CARD, SET_AS_MODIFIED } from '../../actions/index.js'

import Confirmation from './Confirmation.js'
import './CardEditor.scss'
import './CardEditor_Desktop.scss'
import { switchFocusTextArea } from './switchFocusTextArea.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'

const CardEditor = () => {
  let { deckId, cardId } = useParams()
  deckId = parseInt(deckId, 10)
  cardId = parseInt(cardId, 10)

  const isModified = useSelector((state) => state.currentDeck.isModified)
  const [preview, setPreview] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isFocusOnRecto, setIsFocusOnRecto] = useState(true)
  const [areHotkeysVisible, setAreHotKeyVisibile] = useState(false)

  const dispatch = useDispatch()
  const didMountRef = useRef(false)
  // reset le retour utilisateur quand le composant est monté
  useEffect(() => {
    if (didMountRef.current) {
      dispatch({ type: SET_AS_MODIFIED, state: false })
    } else didMountRef.current = true
  }, [])

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(false)
      setTimeout(() => {
        setIsSubmit(true)
      }, 50)
    }
  }, [isModified.count])

  // récupère le contenu de la carte
  dispatch({
    type: GET_CARD,
    field: [{
      field: 'currentDeckId',
      value: deckId
    }, { field: 'currentCardId', value: cardId }]
  })
  const path = `/deckEditor/${deckId}`

  // handleClick du preview
  const handleClick = (event) => {
    event.preventDefault()
    setPreview((state) => !state)
  }

  // envoie la carte
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch({ type: POST_CARD, cardId })
    setIsSubmit(true)
  }
  // sont utilisés pour le  switchFocus hotkey (ctrl+M)
  const textAreaRecto = useRef()
  const textAreaVerso = useRef()

  const classShiftKey = classNames({
    hotkey__key: true,
    'hotkey__key--highlight': areHotkeysVisible
  })

  const classSwitchFocus = classNames({
    cardEditor__forms__hotkey: true,
    cardEditor__forms__firstRender: true,
    displayNone: preview
  })
  return (
    <div
    onKeyDown={(event) => switchFocusTextArea(event, textAreaRecto, textAreaVerso, isFocusOnRecto, setIsFocusOnRecto, handleSubmit, handleClick, setAreHotKeyVisibile)}
    onKeyUp={(event) => { if (!event.shiftKey) { setAreHotKeyVisibile(false) } }}
    >

      {
      /* redirection vers le deck SEULEMENT SI on edite une carte existante, et que la modification a fonctionné
      */
      (isSubmit && isModified.state && cardId ? <Redirect to={path}/> : <></>)
      }

        <h1 className="cardEditor__title"> {cardId ? 'Editer' : 'Créer'} une carte </h1>
        <form
          id="recto"
          onSubmit={handleSubmit}
        >

          <div className="cardEditor__forms"
            /* onKeyDown permet l'utilisation du hotkey ctrl+M */
          >
            <label>
            <Form isRecto={true} preview={preview} textArea={textAreaRecto} />
            </label>
            <div className={classSwitchFocus}>
              <FontAwesomeIcon icon={faArrowRight} size="2x" className="arrow__icons" />
              <p className={classShiftKey}>Shift</p>
              <p className="hotkey__plus">+</p>
              <p className="hotkey__key">M</p>
              <FontAwesomeIcon icon={faArrowLeft} size="2x" className="arrow__icons" />
            </div>
            <label>
            <Form isRecto={false} preview={preview} textArea={textAreaVerso} />
            </label>
          </div>
          <div className="cardEditor__forms__submission">
            <div className="submission__buttons">
              <button className="information" onClick={handleClick}> {preview ? 'Retour éditeur' : 'Aperçu'}</button>
              <button type="submit" className="confirm">Créer</button>
            </div>
            <div className="submission__hotkeys">
            <AnimatePresence>
              {areHotkeysVisible &&
              <>
                <motion.div
                animate={{ opacity: 1 }}
                transition={{ ease: 'easeInOut', delay: 0.25 }}
                exit={{ opacity: 0 }}

                className="cardEditor__forms__hotkey cardEditor__forms__hotkey--horizontal">
                  <motion.p
                  animate={{ scale: 0.9 }}
                  transition={{ ease: 'easeIn', delay: 0.5 }}
                  className="hotkey__key hotkey__key--highlight">Shift</motion.p>
                  <p className="hotkey__plus">+</p>
                  <p className="hotkey__key">P</p>
                </motion.div>

                <motion.div
                animate={{ opacity: 1 }}
                transition={{ ease: 'easeInOut', delay: 0.25 }}
                exit={{ opacity: 0 }}
                className="cardEditor__forms__hotkey cardEditor__forms__hotkey--horizontal">
                  <motion.p
                  animate={{ scale: 0.9 }}
                  transition={{ ease: 'easeIn', delay: 0.5 }}

                  className="hotkey__key hotkey__key--highlight">Shift</motion.p>
                  <p className="hotkey__plus">+</p>
                  <p className="hotkey__key">Enter</p>
                </motion.div>
                </>
              }
              </AnimatePresence>
            </div>
          </div>

        </form>
        {isSubmit

          ? <Confirmation isSuccess={isModified.state} deckId={deckId} />
          : console.log('première soumission')

}
    {preview &&
      <textarea autoFocus={true} style={{ width: '1px', border: 'none', resize: 'none', position: 'absolute', top: 0, left: 0, zIndex: 0 }}></textarea>
}

    </div>
  )
}
export default CardEditor
