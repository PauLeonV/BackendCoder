import express from 'express';
import { CartManager } from './CartManager.js';
const cartsRouter = express.Router();
const cartManager = new CartManager();


cartsRouter.post('/', (req, res)=>{
  const products = req.body;
  const newCart = cartManager.createCart(products);
  console.log (newCart.id);
  res.json(newCart);
});

cartsRouter.get('/:cid', (req,res)=>{
  const cartId = parseInt(req.params.cid);
  const cart = cartManager.getCartById(cartId);
  if (cart){
    res.json(cart);
  } else {
    res.status(404).send('Cart not found');
  }
});
cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const quantity = req.body.quantity || 1;
  cartManager.addProductToCart(cartId, productId, quantity, res);
});

export { cartsRouter };

