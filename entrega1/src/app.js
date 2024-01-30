import express from 'express';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import bodyParser from 'body-parser';
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static('./public'));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => console.log(`Express server listening on port ${port}`));
