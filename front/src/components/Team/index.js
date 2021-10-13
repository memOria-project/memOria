import ShowCards from "../CardDisplay/ShowCards"
import { useState, useEffect } from "react"

const Team = ()=>{
   // met tes données en **MarkDown** dans const database
   // 1 objet = 1 carte
   // n'utilise PAS les boutons OK et x, ça ne marchera pas. Utilise le bouton "au suivant"

   const database = [
      {recto:"**Vincent Mingam \n PRODUCT OWNER**", verso:'![](https://i.postimg.cc/1zSPg5C6/whatsapp.png)'},
      {recto:"**Souleymane Coulibaly \n REFERENT TECHNIQUE  GIT**", verso:'![](https://i.postimg.cc/1zSPg5C6/whatsapp.png)'},
      {recto:"**Jean Hautier \n SCRUM MASTER**", verso:'![](https://i.postimg.cc/1zSPg5C6/whatsapp.png)'},
      {recto:"**Yann Béraud \n LEAD DEV**", verso:'![](https://i.postimg.cc/1zSPg5C6/whatsapp.png)'},
   ]
   // tentative de disable les boutons. Mais ça ne marche pas, probablement car le DOM est impacté après.
   // il faudrait utiliser useRef, mais il faudrait alors intervenir dans ShowCards... pas la peine vu l'utilité de la page
   const warning = document.getElementsByClassName("warning");

   useEffect(() => {
   console.log(warning)   
   warning&&warning[0].length===1?warning.style.disabled = true:console.log("pas de warning encore")
   }, [warning])

   // fin de la tentative

   // failedCards est juste là pour remplir la props correspondante. Elle n'est aps utilisée ici.
   const failedCards =[]

   //cardId signifie en réalité "Card Index". On commence par 0, puis on remonte à  chaque "suivant"
   const [cardId, setCardId] = useState(0);

   const handleClick= () => {
      setCardId((state)=>state+1)
   }

return <>
         <h2> L'équipe memOria</h2>
         <button onClick={handleClick}>Au suivant!</button>
         <ShowCards cardId={cardId} database={database} failedCards={failedCards} />

      </>
}
export default Team