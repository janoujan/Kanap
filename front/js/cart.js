import { Cart } from './cartManager.js'
// tester que le panier s'affiche
// une fonction pour afficher le panier
const displayCart = () => {
  const cartManager = new Cart()
  const cart = cartManager.getCartFromLocaleStorage()
  console.log(cart)
  cart.forEach(item => {
    const contentToLoad = `<article class="cart__item" data-id = ${item.id} data-color = ${item.color}>
                           <div class="cart__item__img">
                             <img src= ${item.image} alt="Photographie d'un canapé">
                           </div>
                           <div class="cart__item__content">
                             <div class="cart__item__content__description">
                                          <h2>${item.name}</h2>
                               <p>${item.color}</p>
                               <p>${item.price}</p>
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

displayCart()
// tester que le panier se met a jour quand on modifie la quantité

// tester que le produit disparaissent quand on le supprime

// tester et valider les donnees recolter en input

// tester que le bouton envoit bien la requete post
