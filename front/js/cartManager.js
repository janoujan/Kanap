
export class Cart {
  constructor () {
    const cart = localStorage.getItem('cart')
    if (cart === null) {
      this.cart = []
    } else {
      this.cart = JSON.parse(cart)
    }
  }

  getCartFromLocaleStorage () {
    return JSON.parse(localStorage.getItem('cart'))
  }

  save () {
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }

  add (product) {
    // on cherche dans le panier si ce produit existe deja
    const foundItem = this.cart.find(p => p.id === product.id && p.color === product.color)
    if (foundItem !== undefined) {
      product.quantity += foundItem.quantity
    } else {
      this.cart.push(product)
    }
    this.save()
  }

  remove (product) {
    this.cart = this.cart.filter(p => p.id !== product.id)
    this.save()
  }

  changeQuantity (product, quantity) {
    const foundProduct = this.cart.find(p => p.id === product.id)
    if (foundProduct !== undefined) {
      foundProduct.quantity += quantity
      if (foundProduct.quantity <= 0) {
        this.remove(foundProduct)
      } else {
        this.save()
      }
    }
  }

  getNumberProduct () {
    let number = 0
    for (const product of this.cart) {
      number += product.quantity
    }
    return number
  }

  getTotalPrice () {
    let total = 0
    for (const product of this.cart) {
      total += product.quantity * product.price
    }
    return total
  }
}
