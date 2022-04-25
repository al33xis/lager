import config from "../config/config.json";
import Order from "../interfaces/order";
import Product from "../interfaces/order_item";



const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    updateStock: async function updateStock(items: Partial<Order>) {
        // For every product in order_items -> make PUT-request
        for (const element of items) {
            var diff = element.stock - element.amount;

            var updateProduct = {
                id: element.product_id,
                name: element.name,
                stock: diff,
                api_key: config.api_key,
            };

            fetch(`${config.base_url}/products`, {
                body: JSON.stringify(updateProduct),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });
        }
    },
    addStock: async function addStock(product: Partial<Product>) {
        console.log(product)
        var updateProduct = {
            id: product.id,
            name: product.name,
            stock: product.stock,
            api_key: config.api_key,
        };

        fetch(`${config.base_url}/products`, {
            body: JSON.stringify(updateProduct),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
    },
}


export default products;
