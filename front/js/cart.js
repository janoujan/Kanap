import { Cart } from './cartManager.js'
// tester que le panier s'affiche
// une fonction pour afficher le panier
const cartManager = new Cart()
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
    const deleteButton = document.querySelector('.deleteItem')
    deleteButton.addEventListener('click', (e) => {
      e.target.closest('.cart__item').remove()
      this.cart.filter(p => p.id !== item.id)
      cartManager.saveToLocalStorage(item)
    })
  })
}

displayCart()

const displayTotal = () => {
  document.getElementById('totalQuantity').innerHTML = cartManager.getTotalQuantity()
  document.getElementById('totalPrice').innerHTML = cartManager.getTotalPrice()
}

displayTotal()
// tester que le panier se met a jour quand on modifie la quantité

// une fonction pour afficher les quantités et prix totaux
// on ecoute chaque input quantité et on modifie le total
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

// tester que le produit disparaissent quand on le supprime

// tester et valider les donnees recolter en input

// tester que le bouton envoit bien la requete post
