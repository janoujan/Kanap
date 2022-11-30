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
const getUserData = () => {
  userData.id = id
  document.getElementById('quantity').addEventListener('input', e => {
    const quantitySelected = e.target.value
    userData.quantity = quantitySelected
    return userData.quantity
  }, false)
  document.querySelector('option').addEventListener('value', e => {
    const colorSelected = e.target.value
    userData.color = colorSelected
    return userData.color
  }, false)
  // const colorSelected = document.querySelector('option').value
  // userData.color = colorSelected
  // return userData.quantity + userData.color
}

// une fonction pour gerer addToCart en envoyant dans le LS les données utilisateurs
getUserData()
const addToCart = () => {
  let kanapsArray = []
  const addToCartButton = document.querySelector('button')
  addToCartButton.addEventListener('click', () => {
    if (
      userData.quantity > 0 &&
      userData.quantity < 100 &&
      userData.color !== null
    ) {
      if (localStorage.getItem(userData) !== null) {
        kanapsArray = JSON.parse(localStorage.getItem('userData'))
      } else {
        kanapsArray.push(userData)
        localStorage.setItem('userData', JSON.stringify(kanapsArray))
      }
    } else {
      alert("Veuillez renseigner une couleur ou un nombre d'article compris entre un et 100")
    }
  })
}

const main = () => {
  displayKanap()
  addToCart()
}

main()
