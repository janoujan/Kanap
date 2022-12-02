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
const userSelection = {}
const getUserSelection = () => {
  userSelection.id = id
  document.getElementById('colors').addEventListener('option', f => {
    const colorSelected = f.target.value
    userSelection.color = colorSelected
  })
  document.getElementById('quantity').addEventListener('input', e => {
    // const colorSelected = document.getElementById('colors').value
    // userSelection.color = colorSelected
    const quantitySelected = e.target.value
    userSelection.quantity = quantitySelected
  }, false)
}

// une fonction pour gerer addToCart en envoyant dans le LS les données utilisateurs
const addToCart = () => {
  getUserSelection()
  let kanapsArray = []
  const addToCartButton = document.querySelector('button')
  addToCartButton.addEventListener('click', () => {
    // if (userSelection.color === "") {
    //   alert('veuillez choisir une couleur SVP')
    // }
    if (
      userSelection.quantity > 0 &&
      userSelection.quantity < 100
    ) {
      if (localStorage.getItem(userSelection) !== null) {
        kanapsArray = JSON.parse(localStorage.getItem('userData'))
      } else {
        kanapsArray.push(userSelection)
        localStorage.setItem('userData', JSON.stringify(kanapsArray))
      }
    } else {
      alert(
        "Veuillez choisir un nombre d'article compris entre un et 100 SVP"
      )
    }
  })
}

const main = () => {
  displayKanap()
  addToCart()
}

main()
