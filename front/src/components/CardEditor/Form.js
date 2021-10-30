import MDEditor, { commands } from '@uiw/react-md-editor'

import { javaButton, htmlButton, CSSButton, title3, sqlButton } from './buttons'

import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_CARD } from '../../actions'
import './CardEditor.scss'
import classNames from 'classnames'

const Form = ({ isRecto, preview, textArea }) => {
  const { recto, verso } = useSelector((state) => state.currentDeck.currentCard)
  const dispatch = useDispatch()
  const handleChange = (val) => {
    const field = isRecto ? 'recto' : 'verso'
    console.log(field)
    dispatch({ type: GET_CARD, field: [{ field: field, value: val }, { field: 'test', value: 'value' }] })
  }

  // console.log(textAreaRecto.current.commandOrchestrator.textArea)
  const cardClasses = classNames({
    card: true,
    card__recto: isRecto,
    card__verso: !isRecto
  })

  return (
    <div>

    {preview
      ? <div

    className={cardClasses}
    >
    <pre

    className="card__content" style={{ textAlign: 'center' }}>
      <MDEditor.Markdown source={isRecto ? unescape(recto) : unescape(verso)} />
      </pre>
    </div>
      : <MDEditor
        ref={textArea}
        onChange={(val) => handleChange(val)}
        // onKeyDown={(event, isRecto, textAreaRecto, textAreaVerso) => switchTextArea(event, isRecto, textAreaRecto, textAreaVerso)}
        preview='edit'
        // détermine ce que le formulaire va éditer: recto ou verso
        value={isRecto ? recto : verso}
        // liste tous les boutons devant apparaitre dans le toolbar
        commands={[
          title3, // bouton pour intégrer un titre
          commands.bold,
          commands.strikethrough,
          commands.orderedListCommand,
          commands.unorderedListCommand,
          commands.quote,
          commands.code,
          commands.image,
          commands.divider, // sépare les boutons d'édition texte de ceux d'édition code
          commands.group([], { // je ne comprend pas .group, mais elle semble nécessaire pour construire des boutons personalisés.
            name: 'JS',
            groupName: 'JS',
            icon: (
              <span> JS </span>
            ),
            // ? children crée un bouton qui s'active sur clique. Pas nécessaire ici.
            // children: (handle: any) => {
            //   return (
            //       <button type="button">
            //         Javascript
            //       </button>
            //   );
            // },
            execute: javaButton,
            buttonProps: { 'aria-label': 'Insert Javascript' }
          }
          ),

          commands.group([], {
            name: 'HTML',
            groupName: 'HTML',
            icon: (
              <span> HTML </span>
            ),
            // children: (handle: any) => {
            //   return (
            //       <button type="button">
            //         HTML
            //       </button>
            //   );
            // },
            execute: htmlButton,
            buttonProps: { 'aria-label': 'Insert HTML' }
          }
          ),
          commands.group([], {
            name: 'CSS',
            groupName: 'CSS',
            icon: (
              <span> CSS </span>
            ),
            // children: (handle: any) => {
            //   return (
            //       <button type="button">
            //         CSS
            //       </button>
            //   );
            // },
            execute: CSSButton,
            buttonProps: { 'aria-label': 'Insert CSS' }
          }
          ),
          commands.group([], {
            name: 'SQL',
            groupName: 'SQL',
            icon: (
              <span> SQL </span>
            ),
            // children: (handle: any) => {
            //   return (
            //       <button type="button">
            //         SQL
            //       </button>
            //   );
            // },
            execute: sqlButton,
            buttonProps: { 'aria-label': 'Insert SQL' }
          }
          )
          // Toutes les options de titre. Je les commente car je crois qu'elles sont superflues.

          // commands.group(
          //   [
          //     commands.title1,
          //     commands.title2,
          //     commands.title3,
          //     commands.title4,
          //     commands.title5,
          //     commands.title6,
          //   ],
          //   {
          //     name: "title",
          //     groupName: "title",
          //     buttonProps: { "aria-label": "Insert title" }
          //   }
          // ),
        ]}
      />
    }
  </div>
  )
}
export default Form
