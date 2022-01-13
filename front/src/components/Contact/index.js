import ShowCards from '../CardDisplay/ShowCards'

const Contact = () => {
  const recto = 'Un retour? Un problème technique ou une demande de suppression de compte?'
  const verso = 'Contactez nous à [memoria.uther(at)gmail.com](mailto:memoria.uther(at)gmail.com)'
  const database = [{ recto, verso }]
  return (<div> <h2 style={{ marginTop: '20px' }}>Contact </h2>
<ShowCards hideButtons={true} currentCard={{ recto, verso }} database={database} failedCards={[]} />
</div>
  )
}
export default Contact
