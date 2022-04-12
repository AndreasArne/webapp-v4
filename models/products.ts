import config from "../config/config.json";

const products = {
    allProducts: [],
    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();
        products.allProducts = result.data;

        return result.data;
    },
    updateProduct: async function updateProduct(product) {
        product.api_key = config.api_key
        
        const response = await fetch(`${config.base_url}/products`, {
            body: JSON.stringify(product),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });
        // const result = await response.json();
    },
};

export default products;