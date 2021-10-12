import ShowCards from "../CardDisplay/ShowCards"
import { useState } from "react"

const Team = ()=>{
   // met tes données en **MarkDown** dans const database
   // 1 objet = 1 carte
   // n'utilise PAS les boutons OK et x, ça ne marchera pas. Utilise le bouton "au suivant"
   
   const database = [
      {recto:"Souleymane", verso:"Le magnifique"},
      {recto:"monrecto", verso:"monverso"}
   ]
   const [cardId, setCardId] = useState(0);

   const handleClick= () => {
      setCardId((state)=>state+1)
   }

return <>
         <h2> L'équipe memOria</h2>
         <button onClick={handleClick}>Au suivant!</button>
         <ShowCards cardId={cardId} database={database} failedCards={database} />

      </>
}
export default Team