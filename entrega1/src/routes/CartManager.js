import fs from 'fs'

export class CartManager {
    constructor() {
        this.cartsPath = 'carrito.json';
        this.carts = [];
        this.cartId = 1;
    }
    
    createCart(){

        const newCart = {
            id: this.cartId++,
            products: [],
        };
    fs.readFile(this.cartsPath,'utf-8',(err)=>{
        if (err){
            res.status(500).send('Error reading carts file');
        } else {
            this.carts.push(newCart);
            fs.writeFile(this.cartsPath,JSON.stringify(this.carts),'utf-8');
        }
    })
    
    }
    getCartById(id) {
        const cart = this.carts.find(c => c.id === id);
        return cart;
    }

    addProductToCart(cartId, productId, quantity = 1, res) {
        fs.readFile(this.cartsFile, 'utf8', (err, data) => {
          if (err) {
            res.status(500).send('Error reading carts file');
          } else {
            const carts = JSON.parse(data);
            const cart = carts.find(c => c.id == cartId);
            if (cart) {
              fs.readFile(this.productsFile, 'utf8', (err, productData) => {
                if (err) {
                  res.status(500).send('Error reading products file');
                } else {
                  const products = JSON.parse(productData);
                  const product = products.find(p => p.id == productId);
                  if (product) {
                    const existingProduct = cart.products.find(p => p.id == productId);
                    if (existingProduct) {
                      existingProduct.quantity += quantity;
                    } else {
                      cart.products.push({ id: productId, quantity });
                    }
                    fs.writeFile(this.cartsFile, JSON.stringify(carts), (err) => {
                      if (err) {
                        res.status(500).send('Error writing carts file');
                      } else {
                        res.json(cart);
                      }
                    });
                  } else {
                    res.status(404).send('Product not found');
                  }
                }
              });
            } else {
              res.status(404).send('Cart not found');
            }
          }
        });
      }
    
      
    }



