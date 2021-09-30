// import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";
// import { useEffect, useMemo, useState } from 'react';
// import hljs from 'highlight.js';
// import 'highlight.js/styles/github.css';

// const TestEasyMDE = ()=>{
//     const [myInput, setMyInput] = useState("");
//     hljs.highlightAll();
//     useEffect(()=> {
//     hljs.highlightAll()
//     }, [myInput])

//     const options = useMemo(() => {
//         return {
//           autofocus: true,
//         renderingConfig: {
//             codeSyntaxHighlighting: true,
//          } 
//         }
//         }, []);
//     const supervalue = <pre><code>{myInput}</code></pre>
//     const handleChange = (event) => {
//         setMyInput((state)=> event)
//         console.log(myInput);

//     }
//     const hi ="<h1> Hi there!</h1> const hello"
    
// return <>
// <pre> <code className="language-javascript"> {hi} </code>
// </pre>
//  <SimpleMDE options={options} onChange={handleChange} value={myInput} /> <p>{supervalue}</p></>
// }
// export default TestEasyMDE
