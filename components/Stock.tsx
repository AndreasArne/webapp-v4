import { useState, useEffect } from "react";
import config from "./../config/config.json";
import { Image, StyleSheet, Text, ScrollView, View } from 'react-native'; // Had to add scrollview, to be able to scroll in produkt list
import warehouse from '../assets/warehouse.jpg';

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);

    const list = products.map((product, index) => <Text key={index}>{product.name} - { product.stock}</Text>);
    console.log(products);
    
    return (
        <View>
            {list}
        </View>
    );
}

export default function Stock () {
    return (
        <ScrollView style={styles.base}>
            <Text style={{ color: '#33c', fontSize: 42 }}>Lager-Appen</Text>
            <Image source={warehouse} style={{ width: 320, height: 240 }} />
            <Text style={{color: "#333", fontSize: 24}}>Lagerförteckning</Text>
            <StockList />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 12,
        paddingRight: 12,
    }
});