import { useState } from "react";
import {ScrollView, Text, TextInput, Button } from "react-native";
import { Typography, Forms } from "../styles";

import Delivery from "../interfaces/delivery";

export default function DeliveryForm({ navigation }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});

    return (
        <ScrollView>
            <Text style={Typography.header2}>Ny inleverans</Text>

            <Text style={Typography.label}>Kommentar</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content})
                }}
                value={delivery?.comment}
            />
            <Button
                title="Gör inleverans"
                onPress={() => {
                    console.log(delivery);
                }}
            />
            <Text style={Typography.label}>Antal</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content:string) => {
                    setDelivery({ ..delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString() }
                keyboardType="numeric"
            />

            <Text style={Typography.label}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />
        </ScrollView>
    );
};
