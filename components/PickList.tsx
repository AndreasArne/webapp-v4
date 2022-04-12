import {View, Text, Button } from "react-native";
import OrderModel from "../models/orders.ts";

export default function PickList({route, navigation}) {
    const { order } = route.params;

    async function pick() {
        await OrderModel.pickOrder(order);
        navigation.navigate("List")
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
              key={index}
            >
                {item.name} - {item.amount} - {item.location}
        </Text>
    });

    let available_stock = order.order_items.some(product => product.amount > product.stock);

    return (
        <View>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>

            {orderItemsList}
            { !available_stock &&
                <Button title="Plocka order" onPress={pick}/>
            }
            {/* https://reactjs.org/docs/conditional-rendering.html */}
            {/*             
            {allInStock
                ? <Button title="Plocka order" onPress={pick} />
                : <Text style={{ ...Typography.normal }}>Ordern går inte att packa, då varor saknas.</Text>
            } */}
        </View>
    )
};