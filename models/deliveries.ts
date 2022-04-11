import config from "../config/config.json";

import Delivery from "../interfaces/delivery";

const deliveries = {
    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    addDelivery: async function addDelivery(delivery: Partial<Delivery>) {
        const newDelivery = {
            ...delivery,
            api_key: config.api_key
        };

        try {
            const response = await fetch(`${config.base_url}/deliveries`, {
                body: JSON.stringify(newDelivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export default deliveries;