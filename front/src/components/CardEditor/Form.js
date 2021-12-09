import MDEditor, { commands } from '@uiw/react-md-editor'

import { javaButton, htmlButton, CSSButton, title3, sqlButton } from './buttons'
import { useDispatch, useSelector } from 'react-redux'
import { GET_CARD } from '../../actions'
import './CardEditor.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { clean, cleanObject } from '../../functions/DOMPurify'

const Form = ({ isRecto, preview, textArea }) => {
  const { recto, verso } = useSelector((state) => state.currentDeck.currentCard)
  const dispatch = useDispatch()
  const handleChange = (val) => {
    const field = isRecto ? 'recto' : 'verso'
    console.log(field)
    dispatch({ type: GET_CARD, field: [{ field: field, value: val }, { field: 'test', value: 'value' }] })
  }

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
      <MDEditor.Markdown source={isRecto ? clean(recto) : clean(verso)} />
      </pre>

    </div>
      : <MDEditor
        ref={textArea}
        autoFocus={isRecto}
        onChange={(val) => handleChange(val)}
        textareaProps={{ placeholder: isRecto ? 'recto' : 'verso' }}
        preview='edit'
        // détermine ce que le formulaire va éditer: recto ou verso
        value={isRecto ? recto : verso}
        // liste tous les boutons devant apparaitre dans le toolbar
        commands={[
          title3, // bouton pour intégrer un titre de niveau 3
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
            // ? children crée un bouton qui s'active sur clique. Pas nécessaire ici, ni sur les autres boutons. Je le laisse seulement ici pour ref.
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
            execute: sqlButton,
            buttonProps: { 'aria-label': 'Insert SQL' }
          }
          )
          // ? Toutes les options de titre. Je les laisse en commentaire pour ref.
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

Form.propTypes = {
  isRecto: PropTypes.bool,
  preview: PropTypes.bool,
  textArea: PropTypes.object
}
