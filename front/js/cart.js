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
  let cart = cartManager.getCartFromLocalStorage()
  // une condition pour gerer le cas ou le panier n'a pas été créer afin de ne pas bloquer le .forEach()
  if (cart === null) {
    const element = document.getElementById('cart__items')
    element.innerHTML = '<p>Votre panier est vide</p>'
    cart = []
  }
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

// une fonction pour ecouter chaque input quantité et on modifie le total
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

displayCart()
displayTotal()
itemQuantityListener()
deleteItemListener()

// tester que le panier se met a jour quand on modifie la quantité

// tester que le produit disparaissent quand on le supprime

// tester et valider les donnees recolter en input

// tester que le bouton envoit bien la requete post
