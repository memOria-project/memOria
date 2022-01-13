import ShowCards from '../CardDisplay/ShowCards'

const Copyrights = () => {
  const recto = '![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Cc-by-nc_icon.svg/1200px-Cc-by-nc_icon.svg.png)'
  const verso = 'Les paquets de memOria tombe sous la <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.'
  const database = [{ recto, verso }]
  return (<div> <h2 style={{ marginTop: '20px' }}>Droits d'utilisation </h2>
<ShowCards hideButtons={true} currentCard={{ recto, verso }} database={database} failedCards={[]} />
</div>
  )
}
export default Copyrights
