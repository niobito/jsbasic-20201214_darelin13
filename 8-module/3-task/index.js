export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (this.cartItems.length === 0) {
      this.cartItems.push({product: product, count: 1});
    } else {
      let cyclesCounter = 0;
      for (let item of this.cartItems) {
        if (item.product.name === product.name) {
          ++item.count;
          break;
        }
        ++cyclesCounter;
      }
      if (cyclesCounter === this.cartItems.length) {
        this.cartItems.push({product: product, count: 1});
      }
    }
    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, index) => {
      if (productId === item.product.id) {
        this.cartItems[index].count = item.count + amount;
      }
      if (item.count <= 0) {
        this.cartItems.splice(index, 1);
      }
    });
    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    if (this.cartItems.length === 1) return this.cartItems[0].count;
    return this.cartItems.reduce((totalCount, item) => totalCount + item.count, 0);
  }

  getTotalPrice() {
    if (this.cartItems.length === 1) return this.cartItems[0].count * this.cartItems[0].product.price;
    return this.cartItems.reduce((totalPrice, item) => totalPrice + item.count * item.product.price, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

