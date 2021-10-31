import { useRef, useState } from 'react'

const TestFocus = () => {
  const textArea1 = useRef()
  const textArea2 = useRef()
  const [isFocusOn1, setIsFocusOn1] = useState(true)
  const cursorPosition = 0
  const handleKeyDown = (event) => {
    if (event.key === 'R' && event.shiftKey === true) {
      if (isFocusOn1) {
        textArea1.current.focus()

        console.log({ isFocusOn1, textArea1 })
      } else {
        console.log({ isFocusOn1, textArea2, event })
        textArea2.current.focus()
        textArea2.current.setSelectionRange(cursorPosition, cursorPosition)
      }
      setIsFocusOn1((state) => !state)
    }
  }
  return <div>
  <textarea
  ref={textArea1}
  onKeyUp={handleKeyDown}
  >

  </textarea>
  <textarea
  ref={textArea2}
  onKeyUp={handleKeyDown}
  >

  </textarea>
</div>
}
export default TestFocus
