// recuperartion de l'id de l'url pour le fetch de la fonction displayKanap
const params = new URL(document.location).searchParams
const id = params.get('id')

// récupération des noeuds du DOM
const kanapImg = document.querySelector('.item__img')
const kanapPrice = document.getElementById('price')
const kanapDescription = document.getElementById('description')
const kanapName = document.getElementById('title')
const optionColor = document.getElementById('colors')
// const inputQuantity = document.getElementById('quantity')

// une fonction pour recupérer les données de l'API et les afficher
const displayKanap = () => {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(data => data.json())
    .then(jsonKanap => {
      kanapImg.innerHTML = `<img src="${jsonKanap.imageUrl}" alt="${jsonKanap.altTxt}">`
      kanapName.innerHTML = `${jsonKanap.name}`
      kanapDescription.innerHTML = `${jsonKanap.description}`
      kanapPrice.innerHTML = `${jsonKanap.price}`
      let options = ''
      jsonKanap.colors.forEach(
        color => (options += `<option value="${color}">${color}</option>`))
      optionColor.innerHTML += options
    })
}
// tester que l'"input" et l'"option" sont bien enregistrer
// une fonction pour ecouter et recuperer les données utilisateurs dans un objet 'userData'
const userData = {}
const dataInput = () => {
  // userData = {}
  userData.id = id
  document.getElementById('quantity').addEventListener('input', e => {
    const quantitySelected = e.target.value
    userData.quantity = quantitySelected
    userData.color = optionColor.value
    return userData.quantity + userData.color
  }, false)
  console.log(userData)
  return userData.quantity + userData.color
}
dataInput()
console.log(userData)

// tester que le bouton ajoute le produit avec la bonne option et le bon nombre d'article dans le panier
// une fonction pour gerer addToCart en envoyant dans le LS les données utilisateurs
// const addToCart = () => {
//   let kanapsArray = []
//   // recuperation de la couleur selectionné

//   /*
//   const colorChoice = document.querySelector('option')
//   document.addEventListener('DOMContentLoaded', function () {
//     document.querySelector('select[name="color-select"]').onchange = changeEventHandler
//   }, false)
//   function changeEventHandler (event) {
//     if (!event.target.value) alert('Veuillez choisir une couleur SVP')
//     else colorChoice = event.target.value
//   }
//   */

//   // au click sur le bouton récuperer les données utilisateurs
//   const addToCartButton = document.querySelector('button')
//   addToCartButton.addEventListener('click', () => {
//     const colorSelected = document.getElementById('colors').value
//     if (
//       inputQuantity.value > 0 &&
//       inputQuantity.value < 100 &&
//       colorSelected !== null
//     ) {
//       const product = {
//         dataId: id,
//         color: colorSelected,
//         quantity: parseFloat(inputQuantity.value)
//       }
//       if (localStorage.getItem(product) !== null) {
//         kanapsArray = JSON.parse(localStorage.getItem('product'))
//       } else {
//         kanapsArray.push(product)
//         localStorage.setItem('product', JSON.stringify(kanapsArray))
//       }
//     } else {
//       alert("ceci n'est pas un nombre compris entre 1 et 100")
//     }
//   })
// }

const main = () => {
  displayKanap()
  dataInput()
  // addToCart()
}

main()
