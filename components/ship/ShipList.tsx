import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import orders from "./../../models/orders";


export default function ShipList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    async function reloadOrders() {
        setAllOrders(await orders.getOrders());
    }

    if (reload) {
        reloadOrders();
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Order', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            <Text>Ordrar redo att Skickas</Text>
            {listOfOrders}
        </View>
    )
}
