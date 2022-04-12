import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { DataTable } from 'react-native-paper';

import invoices from "../models/invoices";

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allInvoices, setInvoices] = useState([]);

    async function reloadInvoices() {
        setInvoices(await invoices.getInvoices());
    }

    if (reload) {
        reloadInvoices();
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    const table = allInvoices?.map((invoice, index) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <View>
            <Text>Inleveranser</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title numeric>Pris</DataTable.Title>
                    <DataTable.Title>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {table}
            </DataTable>
            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </View>
    )
}
