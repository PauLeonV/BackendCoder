const fs = require('fs');

class ProductManager {
    constructor() {
        this.productsPath = 'productos.json';
        this.products = [];
        this.productId = 1;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return 'Rellene todos los campos';
        }

        if (this.products.some(product => product.code === code)) {
            return 'El código ya existe elija otro';
        }

        const product = {
            id: this.productId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(product);
        fs.writeFileSync(this.productsPath,JSON.stringify(this.products),'utf-8');
    }

    getProduct() {
        try{
            const data = fs.readFileSync(this.productsPath, 'utf-8');
            this.products = JSON.parse(data);
            }
        catch(error){
            console.log(`Error al leer archivo ${error}`);
        }
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        return product;
    }

    updateProduct(id, updateProduct){
        const index = this.products.findIndex(product => product.id === id);
        this.products[index] = { ...this.products[index], ...updateProduct };
        fs.writeFileSync(this.productsPath,JSON.stringify(this.products), 'utf-8');
        
        if(index !== -1){
            
        } else {
            return console.log(` Error al actualizar el id ${id}, no se encontraron resultados`)
        }

    }

    deleteProductById(id){
        const index = this.products.findIndex(product => product.id === id);
        if(index !== -1){
            this.products.splice(index,1);
            fs.writeFileSync(this.productsPath,JSON.stringify(this.products),'utf-8');
            
        }else{
            return console.log(` Error al eliminar el id ${id}, no se encontraron resultados`)
        }


    }
}
const manager = new ProductManager();

manager.addProduct({
    title: 'Juego de Mesa - Calabozo',
    description: 'Es un emocionante juego de mesa diseñado para jugadores que buscan una experiencia llena de aventuras.',
    price: 150000,
    thumbnail: 'imagenCalabozo.jpg',
    code: 'JM001',
    stock: 25
});
