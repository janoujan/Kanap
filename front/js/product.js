import { Cart } from './cartManager.js'
// creation d'un objet Cart pour recuperer les methodes de cartManager.js
const cartManager = new Cart()

// recuperartion de l'id de l'url pour le fetch de la fonction displayKanap
const params = new URL(document.location).searchParams
const id = params.get('id')

// récupération des noeuds du DOM
const kanapImg = document.querySelector('.item__img')
const kanapPrice = document.getElementById('price')
const kanapDescription = document.getElementById('description')
const kanapName = document.getElementById('title')
const optionColor = document.getElementById('colors')

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
      const productImage = `${jsonKanap.imageUrl}`
      userSelection.image = productImage
      const productName = `${jsonKanap.name}`
      userSelection.name = productName
      const productPrice = `${jsonKanap.price}`
      userSelection.price = productPrice
      jsonKanap.colors.forEach(
        color => (options += `<option value="${color}">${color}</option>`))
      optionColor.innerHTML += options
    })
}
// une fonction pour ecouter et recuperer les données utilisateurs dans un objet 'userSelection'
const userSelection = {}
const getUserSelection = () => {
  userSelection.id = id
  optionColor.addEventListener('change', event => {
    const colorSelected = event.target.value
    userSelection.color = colorSelected
  })
  document.getElementById('quantity').addEventListener('input', (e) => {
    const quantitySelected = e.target.value
    userSelection.quantity = parseFloat(quantitySelected)
  })
}

// une fonction pour gerer addToCart en envoyant dans le LS les données utilisateurs
const addToCart = () => {
  getUserSelection()
  const addToCartButton = document.querySelector('button')
  addToCartButton.addEventListener('click', () => {
    if (userSelection.color == null) {
      alert('Veuillez saisir une couleur SVP')
    } else if (userSelection.quantity == null || userSelection.quantity <= 0 || userSelection.quantity > 100) {
      alert("Veuillez saisir un nombre d'article valide SVP")
    } else {
      cartManager.addToLocalStorage(userSelection)
      window.location.assign('cart.html')
    }
  })
}

const main = () => {
  displayKanap()
  addToCart()
}

main()
