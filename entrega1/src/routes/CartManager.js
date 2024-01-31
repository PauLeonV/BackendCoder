import fs from 'fs'

export class CartManager {
    constructor() {
        this.cartsPath = 'carrito.json';
        this.productsPath = 'productos.json';
        this.carts = [];
        this.cartId = 1;
    }
    
    createCart(products = []){
        const newCart = {
            id: this.cartId++,
            products: products,
        };
    this.carts.push(newCart);
    fs.writeFile(this.cartsPath,JSON.stringify(this.carts),'utf-8',(err)=>{
      if(err){
        console.error('Error writing carts file:',err);
      }
    })
    return newCart;
    }
   
    getCartById(id) {
      try{
        const data = fs.readFileSync(this.cartsPath, 'utf-8');
        this.carts= JSON.parse(data);
        const cId = Number(id);
        const cart = this.carts.find(cart => cart.id === (cId));
        return cart;
      }
      catch(e) {
          console.error('Error reading carts file',e);
          throw error;
          
      }  
    }

    addProductToCart(cartId, productId, quantity = 1, res) {
   
        fs.readFile(this.cartsPath, 'utf-8', (err, data) => {
          if (err) {
            res.status(500).send('Error reading carts file');
          } else {
            const carts = JSON.parse(data);
            const cId = Number(cartId);
            const cart = carts.find(c => c.id == cId);
            if (cart) {
              fs.readFile(this.productsPath, 'utf-8', (err, productData) => {
                if (err) {
                  res.status(500).send('Error reading products file');
                } else {
                  const products = JSON.parse(productData);
                  const pId = Number (productId);
                  const product = products.find(p => p.id == pId);
                  if (product) {
                    const existingProduct = cart.products.find(p => p.id == pId);
                    if (existingProduct) {
                      existingProduct.quantity += quantity;
                    } else {
                      cart.products.push({ id: pId, quantity });
                    }
                    fs.writeFile(this.cartsPath, JSON.stringify(carts), (err) => {
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



