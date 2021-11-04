
export const setReason = (reason) => {
  let recto
  let verso

  switch (reason) {
    case 'deck': {
      recto = "Vous n'avez pas accés à ce paquet. Soit vous n'avez pas les droits nécessaires, soit ce paquet n'existe plus."
      verso = "Veuillez vérifier que vous êtes bien connecté et que l'URL correspond à un paquet existant en votre possession."
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
