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
  const firstName = document.getElementById('firstName')
  firstName.setAttribute('pattern', '^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$')
  firstName.addEventListener('change', (e) => {
    const firstNameValidity = e.target.checkValidity()
    console.log(firstNameValidity)
    if (firstNameValidity === false) {
      // firstName.setCustomValidity('il ne doit pas y avoir de chiffres dans votre nom')
      document.querySelector('#firstNameErrorMsg').innerHTML = 'pas de chiffres dans les prénoms SVP'
      document.querySelector('input[id="firstName"]').style.backgroundColor = '#fbbcbc'
    } else {
      console.log('prenom ok')
      document.querySelector('#firstNameErrorMsg').innerHTML = ''
      firstName.style.backgroundColor = '#fff'
    }
  })
  const lastName = document.getElementById('lastName')
  lastName.setAttribute('pattern', '^[a-zA-Záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$')
  lastName.addEventListener('change', (e) => {
    const lastNameValidity = e.target.checkValidity()
    if (lastNameValidity === false) {
      document.querySelector('#lastNameErrorMsg').innerHTML = 'il ne doit pas y avoir de chiffres dans votre nom'
      lastName.style.backgroundColor = '#fbbcbc'
    } else {
      console.log('nom ok')
      document.getElementById('lastNameErrorMsg').innerHTML = ''
      lastName.style.backgroundColor = '#fff'
    }
  })
  const address = document.getElementById('address')
  address.addEventListener('change', (e) => {
    const addressValidity = e.target.checkValidity()
    if (addressValidity === false) {
      document.querySelector('#addressErrorMsg').innerHTML = 'veuillez renseigner votre adresse'
      address.style.backgroundColor = '#fbbcbc'
    } else {
      console.log('addresse ok')
      document.querySelector('#addressErrorMsg').innerHTML = ''
      address.style.backgroundColor = '#fff'
    }
  })
  const city = document.getElementById('city')
  city.setAttribute('pattern', '^([a-zA-Zéèêàôîûäëïùüöçœæ\-])*$')
  city.addEventListener('change', (e) => {
    const cityValidity = e.target.checkValidity()
    if (cityValidity === false) {
      document.querySelector('#cityErrorMsg').innerHTML = 'pas de chiffres dans le nom de ville SVP'
      city.style.backgroundColor = '#fbbcbc'
    } else {
      console.log('ville ok')
      document.getElementById('cityErrorMsg').innerHTML = ''
      city.style.backgroundColor = '#ffff'
    }
  })
  const email = document.getElementById('email')
  email.setAttribute('pattern', '(.*)@(.*)')
  email.addEventListener('change', (e) => {
    const emailValidity = e.target.checkValidity()
    if (emailValidity === false) {
      document.querySelector('#emailErrorMsg').innerHTML = 'il manque un @ dans votre email'
      email.style.backgroundColor = '#fbbcbc'
    } else {
      console.log('email ok')
      document.getElementById('emailErrorMsg').innerHTML = ''
      email.style.backgroundColor = '#ffff'
    }
  })
}

// une fonction pour recuperer le id des produits du panier pour le POST
const getProductIdFromCart = () => {
  const productIdList = cartManager.getCartFromLocalStorage()
  if (productIdList.length > 0) {
    return productIdList.map(item => item.id)
  } else {
    []
  }
}

// une fonction pour valider et poster les données du formulaire
const formCheckValidity = () => {
  document.querySelector('.cart__order__form__submit').addEventListener('click', e => {
    e.preventDefault()
    const valid = document.querySelector('.cart__order__form').reportValidity()
    if (valid) {
      console.log('formulaire ok')
      const result = fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          // accept: 'application/json',
          'content-type': 'application/json'
        },
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
      console.log(result)
    }
  })
}
const main = () => {
  displayCart()
  displayTotal()
  itemQuantityListener()
  deleteItemListener()
  verifyFormInput()
  formCheckValidity()
}
main()

// tester que le panier se met a jour quand on modifie la quantité

// tester que le produit disparaissent quand on le supprime

// tester et valider les donnees recolter en input

// tester que le bouton envoit bien la requete post
