import { Cart } from './cartManager.js'

// creation d'un tableau d'objet avec la class Cart pour pouvoir utiliser les methodes de cartManager
const cartManager = new Cart()

// une fonction pour afficher les totaux utilisant les methodes de cartManager
const displayTotal = () => {
  document.getElementById('totalQuantity').innerHTML = cartManager.getTotalQuantity()
  document.getElementById('totalPrice').innerHTML = cartManager.getTotalPrice()
}

// une fonction pour afficher le panier
const displayCart = () => {
  const cart = cartManager.getCartFromLocalStorage()
  cart.forEach(item => {
    const contentToLoad = `<article class="cart__item" data-id = ${item.id} data-color = ${item.color}>
                           <div class="cart__item__img">
                             <img src= ${item.image} alt="Photographie d'un canapé">
                           </div>
                           <div class="cart__item__content">
                             <div class="cart__item__content__description">
                                          <h2>${item.name}</h2>
                               <p>couleur : ${item.color}</p>
                               <p>prix unitaire : ${item.price} €</p>
                             </div>
                             <div class="cart__item__content__settings">
                               <div class="cart__item__content__settings__quantity">
                                 <p>Qté : </p>
                                 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                               </div>
                               <div class="cart__item__content__settings__delete">
                                 <p class="deleteItem">Supprimer</p>
                               </div>
                             </div>
                            </div>
                        </article>`
    document.querySelector('#cart__items').innerHTML += contentToLoad
  })
}

// une fonction pour ecouter chaque input quantité et modifier les totaux
const itemQuantityListener = () => {
  document.querySelectorAll('.itemQuantity').forEach(inputQuantity => {
    inputQuantity.addEventListener('change', (e) => {
      cartManager.changeQuantity({
        quantity: parseInt(e.target.value),
        id: e.target.closest('.cart__item').dataset.id,
        color: e.target.closest('.cart__item').dataset.color
      })
      if (parseFloat(e.target.value) === 0) {
        e.target.closest('.cart__item').remove()
      }
      displayTotal()
    })
  })
}

// une fonction pour ecouter chaque bouton deleteItem et retirer le produit du panier
const deleteItemListener = () => {
  const deleteItems = document.getElementsByClassName('deleteItem')
  for (const deleteItem of deleteItems) {
    deleteItem.addEventListener('click', (e) => {
      cartManager.removeFromLocalStorage({
        id: e.target.closest('.cart__item').dataset.id,
        color: e.target.closest('.cart__item').dataset.color
      })
      displayTotal()
      e.target.closest('.cart__item').remove()
    })
  }
}

// une fonction pour ecouter et verifier les inputs du formulaire
const verifyFormInput = () => {
  const regexNoNumbers = '^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\\-\\s]{1,31}$'
  const regexAddress = '^.{5,120}$'
  const regexEmail = '^[a-z0-9._-]+@[a-z0-9._-]{2,}\\.[a-z]{2,7}$'
  // une boucle pour gerer les inputs ou les chiffres sont interdits
  const inputsNoNumbers = [document.getElementById('firstName'), document.getElementById('lastName'), document.getElementById('city')]
  inputsNoNumbers.forEach(currentInput => {
    currentInput.setAttribute('pattern', regexNoNumbers)
    const id = currentInput.getAttribute('id')
    currentInput.addEventListener('input', (e) => {
      if (e.target.checkValidity() === false) {
        document.querySelector(`#${id}ErrorMsg`).innerHTML = 'les chiffres ne sont pas accepté'
        currentInput.style.backgroundColor = '#fbbcbc'
      } else {
        document.querySelector(`#${id}ErrorMsg`).innerHTML = ''
        currentInput.style.backgroundColor = '#fff'
      }
    })
  })
  // maintenant on gere les autres inputs
  const address = document.getElementById('address')
  address.setAttribute('pattern', regexAddress)
  address.addEventListener('input', (e) => {
    if (e.target.checkValidity() === false) {
      document.querySelector('#addressErrorMsg').innerHTML = 'trop court pour une adresse'
      address.style.backgroundColor = '#fbbcbc'
    } else {
      document.querySelector('#addressErrorMsg').innerHTML = ''
      address.style.backgroundColor = '#fff'
    }
  })
  const email = document.getElementById('email')
  email.setAttribute('pattern', regexEmail)
  email.addEventListener('input', (e) => {
    if (e.target.checkValidity() === false) {
      document.querySelector('#emailErrorMsg').innerHTML = 'il manque des caractères dans votre email'
      email.style.backgroundColor = '#fbbcbc'
    } else {
      document.getElementById('emailErrorMsg').innerHTML = ''
      email.style.backgroundColor = '#ffff'
    }
  })
}

// une fonction pour recuperer le id des produits du panier pour le POST
const getProductIdFromCart = () => {
  const productIdList = cartManager.getCartFromLocalStorage()
  return (productIdList.length > 0) ? productIdList.map(item => item.id) : []
}

// une fonction pour valider et poster les données du formulaire
const formCheckAndPost = () => {
  document.querySelector('.cart__order__form__submit').addEventListener('click', e => {
    e.preventDefault()
    const valid = document.querySelector('.cart__order__form').reportValidity()
    if (valid) {
      fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contact: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('email').value
          },
          products: getProductIdFromCart()
        })
      })
        .then(res => res.json())
        .then(data => {
          window.location.href = `confirmation.html?orderId=${data.orderId}`
          window.localStorage.clear()
        })
    }
  })
}

const main = () => {
  displayCart()
  displayTotal()
  itemQuantityListener()
  deleteItemListener()
  verifyFormInput()
  formCheckAndPost()
}
main()

// tester que le panier se met a jour quand on modifie la quantité

// tester que le produit disparaissent quand on le supprime

// tester et valider les donnees recolter en input

// tester que le bouton envoit bien la requete post
