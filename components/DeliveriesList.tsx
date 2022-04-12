import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button } from "react-native";
import Delivery from '../interfaces/delivery';

import deliveryModel from "../models/deliveries";
import { Base, Typography, Card } from '../styles';

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState<Delivery[]>([]);

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }

    if (reload) {
        reloadDeliveries();
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries
        .map((delivery: Delivery, index) => {
            return <View key={index} style={{ ...Card.card }}>
                <Text style={{ ...Typography.normal }}>{delivery.amount} st. {delivery.product_name}</Text>
                <Text>Levererad: {delivery.delivery_date}</Text>
                <Text>Kommentar: {delivery.comment}</Text>
            </View>
        });

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Inleveranser</Text>
            {/* {listOfDeliveries} */}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
}
