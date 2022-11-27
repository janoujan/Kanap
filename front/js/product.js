// faire une classe item
class Item {
  constructor (item) {
    item && Object.assign(this, item)
  }
}
// recuperartion de l'id de l'url pour le fetch de la fonction displayItem
const params = new URL(document.location).searchParams
const id = params.get('id')

// récupération des noeuds du DOM
const itemImg = document.querySelector('.item__img')
const idPrice = document.getElementById('price')
const idDescription = document.getElementById('description')
const idTitle = document.getElementById('title')
const optionColor = document.getElementById('colors')
const inputQuantity = document.getElementById('quantity')

// une fonction pour recupérer les données de l'API et les afficher
const displayItem = () => {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((data) => data.json())
    .then((jsonItem) => {
      const item = new Item(jsonItem)
      console.log(item)
      itemImg.innerHTML += `<img src="${item.imageUrl}" alt="${item.altTxt}">`
      idTitle.innerHTML += `${item.name}`
      idDescription.innerHTML += `${item.description}`
      // const totalPrice = item.price * inputQuantity
      // idPrice.innerHTML += `${totalPrice}`
      idPrice.innerHTML += `${item.price} `
      for (let i = 0; i < item.colors.length; i++) {
        optionColor.innerHTML += `<option value="${item.colors[i]}">${item.colors[i]}</option>`
      }
    })
}

// tester que l'"input" est bien enregistrer dans le localStorage
// tester que le bouton ajoute le produit avec la bonne option et le bon nombre d'article dans le panier

// faire une classe produit
class Product {
  constructor (id, color, quantity) {
    this.id = id
    this.color = color
    this.quantity = quantity
   }
}
// une fonction pour gerer addToCart en envoyant dans le LS les données utilisateurs
const addToCart = () => {
  let productArray = []
  const colorChoice = document.querySelector('option')
  
  const addToCartButton = document.getElementById('addToCart')
  addToCartButton.addEventListener('click', () => {
    if (inputQuantity.value > 0 && inputQuantity.value < 100 && colorChoice.value !== null) {
      const product = {
        dataId: id,
        color: colorChoice.value,
        quantity: parseFloat(inputQuantity.value)
      }
      if (localStorage.getItem(product) !== null) {
        productArray = JSON.parse(localStorage.getItem('product'))
      } else {
        productArray.push(product)
        localStorage.setItem('product', JSON.stringify(productArray))
      }
    } else {
      alert("ceci n'est pas un nombre compris entre 1 et 100")
    }
  })
}

const main = () => {
  displayItem()
  addToCart()
}

main()
