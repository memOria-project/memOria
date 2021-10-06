import RectoVerso from '../RectoVerso'

const Options = ({setShowOptions}) => {
  const handleClick = () => {
    setShowOptions((state)=> !state)
  }

  return (
    <div style={{margin:"2em"}}>
      <h1> Options</h1>

      <h2>Montrer en premier </h2>
        <RectoVerso />
      <h2>  Parcourir les cartes</h2>
        <button>apprises et non apprises</button>
        <button> non apprises</button> <br /> <br />
        <button onClick={handleClick}>Commencer</button>
     </div>
  )
}
export default Options