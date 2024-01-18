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
manager.addProduct({
    title: 'Juego de Mesa - Exploradores del Cosmos',
    description: 'Es un juego de mesa emocionante que te sumerge en la emocionante y desafiante vida de un astronauta espacial.',
    price: 225000,
    thumbnail: 'imagenCosmos.jpg',
    code: 'JM002',
    stock: 12
});

manager.addProduct({
    title: 'Juego de Mesa - Aventura en CandyLand',
    description: 'Es un emocionante juego de mesa diseñado para transportarte a un mundo dulce y mágico lleno de golosinas, caramelos y desafíos deliciosos.',
    price: 68000,
    thumbnail: 'imagenCandy.jpg',
    code: 'JM003',
    stock: 21
});
manager.addProduct({
    title: 'Juego de Rol - Vampiros La Mascarada',
    description: 'En esta nueva edición del juego de rol Vampiro, encontrarás todo lo necesario para pasar un rato increíble con tus colegas.',
    price: 37500,
    thumbnail: 'imagenVampiros.jpg',
    code: 'JR001',
    stock: 14
});
manager.addProduct({
    title: 'Juego de Rol - Hellora',
    description: 'Explora todos los entornos, entra en las mismísimas mazmorras y visita ciudades y pueblos.',
    price: 120000,
    thumbnail: 'imagenHellora.jpg',
    code: 'JR002',
    stock: 10
});
manager.addProduct({
    title: 'Juego de Rol - Warhammer',
    description: 'Si quieres sumergirte en un pasado medieval de fantasía, Wathammer Fantasy rol es la mejor opción.',
    price: 98000,
    thumbnail: 'imagenWarha.jpg',
    code: 'JR003',
    stock: 7
});
manager.addProduct({
    title: 'Juego de Mesa - Uno',
    description: 'Uno es un juego de cartas clásico y popular que ha sido disfrutado por personas de todas las edades.',
    price: 18000,
    thumbnail: 'imagenUno.jpg',
    code: 'JM004',
    stock: 50
});
manager.addProduct({
    title: 'Juego de Mesa - Monopoly',
    description: 'Juego de mesa icónico que ha entretenido a millones de personas desde su creación en la década de 1930. En este juego de estrategia.',
    price: 69000,
    thumbnail: 'imagenMonopoly.jpg',
    code: 'JM005',
    stock: 47
});
manager.addProduct({
    title: 'Juego de Mesa - Parchis',
    description: 'El parchís es un juego de mesa español derivado y similar al Eile mit Weile, al parqués. Es muy popular en España, Europa y Marruecos.',
    price: 27500,
    thumbnail: 'imagenParchis.jpg',
    code: 'JM006',
    stock: 75
});
manager.addProduct({
    title: 'Juego de Rol - Fanhunter',
    description: 'Se trata de un juego de rol epidecadente ambientado en un futuro próximo, donde un villano cree estar poseído por el espíritu de un escritor.',
    price: 45800,
    thumbnail: 'imagenFanhunter.jpg',
    code: 'JR004',
    stock: 13
});

