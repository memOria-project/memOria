import ShowCards from "../CardDisplay/ShowCards"
import { useState } from "react"
import { PICK_DEFAULT_CARD_SIDE } from "../../actions"
import { useDispatch } from 'react-redux'

const Team = ()=>{
   // met tes données en **MarkDown** dans const database
   // 1 objet = 1 carte
   // n'utilise PAS les boutons OK et x, ça ne marchera pas. Utilise le bouton "au suivant"

   const database = [
      {recto:"Scrum Master\nLead Dev Front", verso:'[![](https://i.postimg.cc/hvKrwfHD/whatsapp.png)](https://github.com/JMJHautier)\nJean Hautier'},
      {recto:"Git Master\nDev Back", verso:'[![](https://i.postimg.cc/cLgcPMt4/120680-FA-3-CD4-4-B1-C-A692-908-BDF19-D418-1-201-a.jpg)](https://github.com/S-COULIBALY)\nSouleymane Coulibaly'},
      {recto:"UX Design\nDev Front", verso:'[![](https://avatars.githubusercontent.com/u/74912713?v=4)](https://github.com/yann-beraud)\nYann Béraud'},
      {recto:"Product Owner\nDev back", verso:'[![Profil Github](https://avatars.githubusercontent.com/u/7131900?v=4)](https://github.com/vmingam)\nVincent Mingam'}
   ]

   // const {defaultView, currentView } = useSelector((state)=>state.card);
 
   const dispatch = useDispatch();

   // dispatch({type:PICK_DEFAULT_CARD_SIDE, isRecto:true})
   //? tentative de disable les boutons. Mais ça ne marche pas, probablement car le DOM est impacté après.
   //? il faudrait utiliser useRef, mais il faudrait alors intervenir dans ShowCards... pas la peine vu l'utilité de la page
   // const warning = document.getElementsByClassName("warning");

   // useEffect(() => {
   // console.log(warning)   
   // warning&&warning[0].length===1?warning.style.disabled = true:console.log("pas de warning encore")
   // }, [warning])

   //? fin de la tentative

   // failedCards est juste là pour remplir la props correspondante. Elle n'est aps utilisée ici.
   const failedCards =[]

   //cardId signifie en réalité "Card Index". On commence par 0, puis on remonte à  chaque "suivant"
   const [cardId, setCardId] = useState(0);

   const handleClick= () => {
      if(cardId === 3) {
         setCardId(0)
      }
      else {
      setCardId((state)=>state+1)
      }
      dispatch({type:PICK_DEFAULT_CARD_SIDE, isRecto:true})

   }

   const handleClickBack= () => {
      if(cardId === 0)
      {
         setCardId(3)
      }
      else{
      setCardId((state)=>state-1)
      }
      dispatch({type:PICK_DEFAULT_CARD_SIDE, isRecto:true})

   }

return <>
         <h1 style={{fontSize:"2.5em", marginTop:"1.5em"}}> L'équipe memOria</h1>
         <ShowCards hideButtons={true} cardId={cardId} database={database} failedCards={failedCards} />
         <button onClick={handleClickBack}>Précédent</button>
         <button onClick={handleClick}>Suivant</button>

      </>
}
export default Team