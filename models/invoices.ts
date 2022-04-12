import config from "../config/config.json";
import orders from "./orders";

import storage from "./storage.ts";

const invoices = {
    getInvoices: async function getinvoices() {
        const resp = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': await storage.readToken()
            },
        })
        const result = await resp.json();
        
        return result.data
    },
    createInvoice: async function createInvoice(order) {
        let now = new Date();
        let later = new Date();
        later.setDate(now.getDate() + 30);

        const newInvoice = {
            order_id: order.id,
            api_key: config.api_key,
            total_price: order.total_price,
            creation_date: now.toLocaleDateString('se-SV'),
            due_date: later.toLocaleDateString('se-SV')
        };

        try {
            const response = await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(newInvoice),
                headers: {
                    'x-access-token': await storage.readToken(),
                    'content-type': 'application/json'
                },
                method: 'POST'
            });
        } catch (error) {
            console.log(error);
        }
        orders.updateOrder({
            ...order,
            status_id: 600
        })
    }
};

export default invoices;