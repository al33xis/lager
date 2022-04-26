import config from "../config/config.json";
import Delivery from "../interfaces/delivery";
// import products from "./products";

const delivery = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
        var updateDelivery = {
            product_id: delivery.product_id,
            amount: delivery.amount,
            delivery_date: delivery.delivery_date,
            comment: delivery.comment || "",
            api_key: config.api_key,
        };

        fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(updateDelivery),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });
    },
};

export default delivery;