import { useState } from "react";
import {ScrollView, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from "../styles";

import Delivery from "../interfaces/delivery";

export default function DeliveryForm({ navigation }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});

    return (
        <ScrollView style={Base.base}>
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
        </ScrollView>
    );
};
