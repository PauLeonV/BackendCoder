const express = require('express');
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/products', (req, res) => {
    const ProductManager = require('./productManager.js');
    const products = new ProductManager();
    const limit = parseInt(req.query.limit); 
    const productList = products.getProduct();

    if (limit) {
        const limitedProducts = productList.slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json(productList );
    }
});

app.get('/products/:pid', (req, res) => {
    const ProductManager = require('./productManager.js');
    const manager = new ProductManager();
    const pid = parseInt(req.params.pid);
    const products = manager.getProduct();
    const productPid = products.find(product => product.id === pid)
    if (productPid) {
        res.send(productPid);
    } else {
        res.status(404).json({ message: 'Product Not Found' });
    }
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));
