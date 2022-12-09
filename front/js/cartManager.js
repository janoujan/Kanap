
export class Cart {
  constructor () {
    const cart = localStorage.getItem('cart')
    if (cart === null) {
      this.cart = []
    } else {
      this.cart = JSON.parse(cart)
    }
  }

  getCartFromLocalStorage () {
    const cart = localStorage.getItem('cart')
    if (cart === null) {
      return []
    } else {
      return JSON.parse(cart)
    }
  }

  saveToLocalStorage (cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  /**
 * ajoute un produit dans le panier ou augmente sa quantité si il existe deja
 * @param {product} product l'objet du produit à ajouter doit avoir une id: une color: et une quantity: pour fonctionner
 */
  addToLocalStorage (product) {
    const cart = this.getCartFromLocalStorage()
    console.log(this.cart)
    const foundItem = cart.find(p => p.id === product.id && p.color === product.color)
    console.log(foundItem)
    if (foundItem != null) {
      foundItem.quantity += product.quantity
      if (product.quantity > 100) {
        product.quantity = 100
      }
    } else {
      cart.push(product)
    }
    this.saveToLocalStorage(cart)
  }

  /**
 * une fonction pour supprimer un produit du panier
 * @param {product} product l'objet du produit à supprimer doit avoir une id: et une color: pour fonctionner
 */
  removeFromLocalStorage (product) {
    let cart = this.getCartFromLocalStorage()
    const itemToDelete = cart.find(p => p.id === product.id && p.color === product.color)
    cart = cart.filter(p => p !== itemToDelete)
    this.saveToLocalStorage(cart)
  }

  /**
 * change la quantite d'un produit dans le panier ou le supprimme si sa quantite <= 0
 * @param {product} product l'objet produit à ajouter doit avoir une id: une color: et une quantity: pour fonctionner
 */
  changeQuantity (product) {
    this.cart = this.getCartFromLocalStorage()
    const foundItem = this.cart.find(p => p.id === product.id && p.color === product.color)
    foundItem.quantity = product.quantity
    if (foundItem.quantity <= 0) {
      this.cart = this.cart.filter(p => p.id !== product.id || p.color !== product.color)
    }
    this.saveToLocalStorage(this.cart)
  }

  getTotalQuantity () {
    const cart = this.getCartFromLocalStorage()
    let number = 0
    for (const item of cart) {
      number += item.quantity
    }
    return number
  }

  getTotalPrice () {
    const cart = this.getCartFromLocalStorage()
    let total = 0
    for (const item of cart) {
      total += item.quantity * item.price
    }
    return total
  }
}
