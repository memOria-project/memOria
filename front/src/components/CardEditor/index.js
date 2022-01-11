import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { useParams, Redirect, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'

import Form from './Form.js'
import Confirmation from './Confirmation.js'
import { switchFocusTextArea } from './switchFocusTextArea.js'
import { GET_CARD, POST_CARD, SET_AS_MODIFIED, SET_CURRENT_DECK_ID } from '../../actions/index.js'

import './CardEditor.scss'
import './CardEditor_Desktop.scss'

const CardEditor = () => {
  //! ↓ STATE AND VARIABLES ↓

  let { deckId, cardId } = useParams()
  deckId = parseInt(deckId, 10)
  cardId = parseInt(cardId, 10)

  const isModified = useSelector((state) => state.currentDeck.isModified)
  const title = useSelector((state) => state.currentDeck.title)

  const [preview, setPreview] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isFocusOnRecto, setIsFocusOnRecto] = useState(true)
  const [areHotkeysVisible, setAreHotKeyVisibile] = useState(false)
  const toDeck = `/deckEditor/${deckId}`
  // sont utilisés pour les switch de focus (hotkey et resets)
  const textAreaRecto = useRef()
  const textAreaVerso = useRef()

  const dispatch = useDispatch()

  //! ↓ EFFETS DE BORD ↓

  // Au montage du composant:
  // - reset le contenu de la carte (si creation) OU charge le contenu de la carte (si edit)
  // - reset le retour utilisateur

  useEffect(() => {
    dispatch({ type: SET_AS_MODIFIED, state: false })
    dispatch({ type: SET_CURRENT_DECK_ID, deckId })
    if (!cardId) {
      console.log('reset card')
      dispatch({ type: GET_CARD, field: [{ field: 'recto', value: '' }, { field: 'verso', value: '' }] })
    } else {
      dispatch({
        type: GET_CARD,
        field: [{
          field: 'currentDeckId',
          value: deckId
        }, { field: 'cardId', value: cardId }]
      })
    }
  }, [])

  // relance l'animation de confirmation à chaque fois que l'utilisateur envoie le formulaire
  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(false)
      setTimeout(() => {
        setIsSubmit(true)
      }, 50)
    }
  }, [isModified.count])

  // reset le focus sur le recto quand on quitte le mode preview.
  useEffect(() => {
    if (!preview && isSubmit && textAreaRecto.current.commandOrchestrator) {
      setIsFocusOnRecto(true)
      textAreaRecto.current.commandOrchestrator.textArea.focus()
    }
  }, [preview])

  //! ↓ AUTRES ↓

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
    // reset le focus sur le recto quand la carte est soumise en mode éditeur (preview est falsy)
    if (!preview) {
      setIsFocusOnRecto(true)
      textAreaRecto.current.commandOrchestrator.textArea.focus()
    } else {
      setPreview(false)
      setIsFocusOnRecto(true)
    }
    setTimeout(() => setIsSubmit(false), 6000)
  }

  const classAltKey = classNames({
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
    onKeyUp={(event) => { if (!event.altKey) { setAreHotKeyVisibile(false) } }}
    >

      {
      /* redirection vers le deck SEULEMENT SI on edite une carte existante, et que la modification a fonctionné
      le ? est utilisé car isSubmit && isModified.state && cardId &&<Redirect /> affiche "NaN"(valeur de cardId) quand elle renvoie falsy - pas idéal, mais fonctionne
      */
      (isSubmit && isModified.state && cardId ? <Redirect to={{ pathname: toDeck, state: { editedCardId: cardId } }}/> : <></>)
      }

        <h1 className="cardEditor__title"> {cardId ? 'Editer' : 'Créer'} une carte (<NavLink to={toDeck} style={{ textDecoration: 'none' }}>{title}</NavLink>)</h1>
        <form
          id="recto"
          onSubmit={handleSubmit}
        >

          <div className="cardEditor__forms"
            /* onKeyDown permet l'utilisation du hotkey ctrl+M */
          >
            <Form isRecto={true} preview={preview} textArea={textAreaRecto} />
            <div className={classSwitchFocus}>
              <FontAwesomeIcon icon={faArrowRight} size="2x" className="arrow__icons" />
              <p className={classAltKey}>Alt</p>
              <p className="hotkey__plus">+</p>
              <p className="hotkey__key">M</p>
              <FontAwesomeIcon icon={faArrowLeft} size="2x" className="arrow__icons" />
            </div>
            <Form isRecto={false} preview={preview} textArea={textAreaVerso} />
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
                  className="hotkey__key hotkey__key--highlight">Alt</motion.p>
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

                  className="hotkey__key hotkey__key--highlight">Alt</motion.p>
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
