import express from 'express';
import { ProductManager } from './ProductManager.js';
const productsRouter = express.Router();
const productManager = new ProductManager();

productsRouter.get('/', (req, res) => {
    const products = productManager.getProduct();
    res.json(products);
  });

productsRouter.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else{
      res.status(404).send('Product not found');
    }
  });
  

  productsRouter.post('/', (req, res) => {
   const result = productManager.addProduct(req.body);
   res.send(result);
  });
  

  productsRouter.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;
    productManager.updateProduct(productId, updatedProduct);
    res.send(`Updated the product with id ${productId}`);
  });
  
  
  productsRouter.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    productManager.deleteProductById(productId);
    res.send(`Deleted the product with id ${productId}`);
    
  });

export { productsRouter };