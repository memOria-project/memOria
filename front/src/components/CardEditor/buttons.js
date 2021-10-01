import {
  commands,
  selectWord
}  from '@uiw/react-md-editor';



export const javaButton =  (
  state: commands.TextState,
  api: commands.TextAreaTextApi
) => {
  
            // Adjust the selection to encompass the whole word if the caret is inside one
            const newSelectionRange = selectWord({ text: state.text, selection: state.selection });
            const state1 = api.setSelectionRange(newSelectionRange);
            // Replaces the current selection with the bold mark up
            const state2 = api.replaceSelection("```javascript \n"+ state1.selectedText+"\n ```");
            // Adjust the selection to not contain the **
            // je le retire, car je n'arrive pas à mettre le curseur à un endroit pertinent :/ 
            // api.setSelectionRange({
            //   start: state2.selection.end - 2 - state1.selectedText.length,
            //   end: state2.selection.end - 2,
            // })
          }

export const htmlButton =  (
    state: commands.TextState,
    api: commands.TextAreaTextApi
  ) => {
    
              // Adjust the selection to encompass the whole word if the caret is inside one
              const newSelectionRange = selectWord({ text: state.text, selection: state.selection });
              const state1 = api.setSelectionRange(newSelectionRange);
              // Replaces the current selection with the bold mark up
              const state2 = api.replaceSelection("```html \n"+ state1.selectedText+"\n ```");
              // Adjust the selection to not contain the **
              // je le retire, car je n'arrive pas à mettre le curseur à un endroit pertinent :/ 

              // api.setSelectionRange({
              //   start: state2.selection.end - 2 - state1.selectedText.length,
              //   end: state2.selection.end - 2,
              // })
            }

export const CSSButton =  (
  state: commands.TextState,
  api: commands.TextAreaTextApi
) => {
  
            // Adjust the selection to encompass the whole word if the caret is inside one
            const newSelectionRange = selectWord({ text: state.text, selection: state.selection });
            const state1 = api.setSelectionRange(newSelectionRange);
            // Replaces the current selection with the bold mark up
            const state2 = api.replaceSelection("```css \n"+ state1.selectedText+"\n ```");
            // Adjust the selection to not contain the **
            // je le retire, car je n'arrive pas à mettre le curseur à un endroit pertinent :/ 
            // api.setSelectionRange({
            //   start: state2.selection.end - 2 - state1.selectedText.length,
            //   end: state2.selection.end - 2,
            // })
          }