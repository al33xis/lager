import config from "../config/config.json";
import Order from "../interfaces/order";
import products from "./products";

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
        // console.log(order.id);
        // console.log(order.name);

        var updateOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key,
        };

        fetch(`${config.base_url}/orders`, {
            body: JSON.stringify(updateOrder),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });

        products.updateStock(order.order_items);
    }
};

export default orders;