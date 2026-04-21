export const formatPrice = (price) => {
  if (price >= 1000) {
    // Transformation du nombre en string pour pourvoir boucler dessus
    const priceStr = price.toString()

    // Création d'un tableau vide qui stockera les caractères
    let newPrice = []

    // Boucle sur le prix transformé en string, EN PARTANT DU DERNIER CARACTERE
    for (let i = priceStr.length - 1; i >= 0; i--) {
      if (i === priceStr.length - 4 || i === priceStr.length - 7) {
        // SI c'est le 3ème ou 6ème tour, on ajoute le caractère et un espace
        newPrice.push(priceStr[i] + ' ')
      } else {
        // SINON on ajoute seulement le caractère
        newPrice.push(priceStr[i])
      }
    }

    // Les éléments du tableau sont inversés pour remettre les caractère dans l'ordre, puis il est transformé en string
    return newPrice.reverse().join('')
  } else {
    // Si le prix est inférieur à 1000 il est inutile de réaliser toute la logique du 'if' donc on le retourne sans modification
    return price
  }
}
