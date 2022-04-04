import { Alert } from "react-native";

import config from "../config/config.json";
import products from "./products.ts";


const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    updateOrder: async function updateOrder(order) {
        order.api_key = config.api_key
        console.log(order);

        const response = await fetch(`${config.base_url}/orders`, {
            body: JSON.stringify(order),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
        // const result = await response.json();
        console.log(response.status);
    },

    pickOrder: async function pickOrder(order) {
        // kolla att det finns tillräckligt med produkter
        let any_out_of_stock = order.order_items.some(product => product.amount > product.stock);
        console.log(any_out_of_stock);
        

        if (!any_out_of_stock) {
            // minska antalet produkter
            order.order_items.forEach(product => {
                products.updateProduct({
                    id: product.product_id,
                    name: product.name,
                    stock: product.stock - product.amount,
                });
            });
            // packa
            orders.updateOrder({
                id: order.id,
                name: order.name,
                status_id: 200
            });
        } else {
            Alert.alert(
                "Missing products",
                "Not enough products",
                [
                    { text: "OK" }
                ]
            );
        }


    }
};

export default orders;