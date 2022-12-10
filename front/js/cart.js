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
// une fonction pour ecrire des messages d'erreurs
const errorMessage = (input) => {
  input
}
// une fonction pour verifier, valider et poster les données du formulaire 
const formCheckValidity = () => {
document.querySelector('.cart__order__form__submit').addEventListener('click', (e) => {
    e.preventDefault()
    let formInputs = document.querySelectorAll('.cart__order__form__question')
    let valid = true
    for (const input of formInputs) {
      valid &= errorMessage(input)
      if(!valid){
        break
      }
    }
    if (valid) {
      console.log('formulaire OK');
    }
  })
}

const main = () => {
  displayCart()
  displayTotal()
  itemQuantityListener()
  deleteItemListener()
  formCheckValidity()
}
main()

// tester que le panier se met a jour quand on modifie la quantité

// tester que le produit disparaissent quand on le supprime

// tester et valider les donnees recolter en input

// tester que le bouton envoit bien la requete post
