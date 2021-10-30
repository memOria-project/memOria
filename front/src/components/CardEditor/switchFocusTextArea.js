export const switchFocusTextArea = (event, textArea1, textArea2, isFocusOn1, setIsFocusOn1) => {
  /*
  cursorPosition définit la position du curseur quand le hotkey est utilisé (donc, à la fin).
  Il aurait été plus propre de se baser sur currentCard.recto.length / currentCard.verso.length
  Cependant, le code aurait été moins DRY, sans aucune contrepartie pour l'utilisateur (qui ne tapera sans doute pas plus de 5000 charactères sur une petite carte)
  Par ailleurs, d'après stackoverflow, cette solution semble éviter des malfonctionnements dans certains browser
  */
  const cursorPosition = 5000
  if (event.key === 'M' && event.shiftKey === true) {
    // evite que le "M" soit tapé dans textArea
    event.preventDefault()

    if (isFocusOn1) {
      // commandOrchestrator.textArea doit être ajouté pour atteindre le textArea. Il n'était pas possible de mettre le useRef direct dans textArea
      textArea1.current.commandOrchestrator.textArea.focus()
      textArea1.current.commandOrchestrator.textArea.setSelectionRange(cursorPosition, cursorPosition)

      console.log({ isFocusOn1, textArea1, event })
    } else {
      console.log({ isFocusOn1, textArea2, event })
      textArea2.current.commandOrchestrator.textArea.focus()
      textArea2.current.commandOrchestrator.textArea.setSelectionRange(cursorPosition, cursorPosition)
    }

    setIsFocusOn1((state) => !state)
  }
}
