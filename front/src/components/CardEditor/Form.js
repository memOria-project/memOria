import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextAreaTextApi
}  from '@uiw/react-md-editor';

import { javaButton, htmlButton, CSSButton } from './buttons';

// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_CARD } from '../../actions';
import './CardEditor.scss'
const Form = ({isRecto, preview})=>{
  const title3: ICommand = {
    name: "title3",
    keyCommand: "title3",
    buttonProps: { "aria-label": "Insert title3" },
    icon: (
      <svg width="12" height="12" viewBox="0 0 520 520">
        <path
          fill="currentColor"
          d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
        />
      </svg>
    ),
    execute: (state: TextState, api: TextAreaTextApi) => {
      let modifyText = `### ${state.selectedText}\n`;
      if (!state.selectedText) {
        modifyText = `### `;
      }
      api.replaceSelection(modifyText);
    }
  };

    const { recto, verso } = useSelector((state)=>state.card.currentCard);
    const dispatch = useDispatch();
    // const value = isRecto?recto:verso


    const handleChange=(val) => {
        const field= isRecto?"recto":"verso";
        console.log(field)
        dispatch({type:EDIT_CARD, field: [{"field": field, "value":val}, {"field":"test", "value":"value"}]})        
    }


return   (<div className="form"> 

        {preview?
            <MDEditor.Markdown source={isRecto?recto:verso} />
            :
            <MDEditor onChange={(val)=>handleChange(val)}  preview='edit' value={isRecto?recto:verso} 

                commands={[
                          // Custom Toolbars
                          title3,
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
                          commands.bold,
                          commands.strikethrough,
                          commands.orderedListCommand,
                          commands.unorderedListCommand,
                          commands.quote,
                          commands.code,
                          commands.divider,
                          commands.group([], {
                            name: "JS",
                            groupName: "JS",
                            icon: (
                              <span> JS </span>
                            ),
                            children: (handle: any) => {
                              return (
                                  <button type="button">
                                    Javascript
                                  </button>
                              );
                            },
                            execute: javaButton
                            ,
                            buttonProps: { "aria-label": "Insert title" }
                          },
                          ),

                          commands.group([], {
                            name: "HTML",
                            groupName: "HTML",
                            icon: (
                              <span> HTML </span>
                            ),
                            children: (handle: any) => {
                              return (
                                  <button type="button">
                                    HTML
                                  </button>
                              );
                            },
                            execute: htmlButton
                            ,
                            buttonProps: { "aria-label": "Insert title" }
                          },
                          ),
                          commands.group([], {
                            name: "CSS",
                            groupName: "CSS",
                            icon: (
                              <span> CSS </span>
                            ),
                            children: (handle: any) => {
                              return (
                                  <button type="button">
                                    CSS
                                  </button>
                              );
                            },
                            execute: CSSButton
                            ,
                            buttonProps: { "aria-label": "Insert title" }
                          },
                          ),

                        ]}
                        
            />
            }
        </div>
    )
}
export default Form