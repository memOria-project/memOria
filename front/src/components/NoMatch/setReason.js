
export const setReason = (reason) => {
  let recto
  let verso

  switch (reason) {
    case 'deck': {
      recto = "**Erreur!** Vous n'avez pas accés à ce paquet.** \n Soit vous n'avez pas les droits nécessaires, soit ce paquet n'existe plus."
      verso = "Veuillez vérifier que vous êtes bien connecté et que l'URL correspond à un paquet existant en votre possession."
      break
    }
    case 'deck-display': {
      recto = "**Erreur!** \n ```javascript \n Promise.reject('Vous ne pouvez pas parcourir ce paquet!')\n```\n Il y a trois causes possibles: vous n'avez pas les droits nécessaires, le paquet n'existe pas, ou le paquet est vide."
      verso = "Veuillez vérifier que ce paquet existe, qu'il a des cartes, ou qu'il vous appartient, puis réessayez"
      break
    }
    // page 404
    default: {
      recto = "# 404\nCeci n'est pas une carte"
      verso = "Vous avez trouvé mug O'Clock\n![](https://img.freepik.com/photos-gratuite/tasse-vintage-cassee-table-bois-vue-dessus_172251-380.jpg)"
    }
  }
  return [recto, verso]
}
