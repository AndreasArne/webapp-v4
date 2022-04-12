import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { DataTable } from 'react-native-paper';

import orders from "../models/orders";
import invoices from "../models/invoices";



function OrderDropDown(props) {
    const [allOrders, setAllOrders] = useState([]);
    let ordersHash: any = {};

    useEffect(async () => {
        setAllOrders(await orders.getOrders());
    }, []);

    const itemsList = allOrders
        .filter(order => order.status_id < 600)
        .map((order, index) => {
            ordersHash[order.id] = order;
            return <Picker.Item key={index} label={order.name} value={order.id} />;
        });
        
    return (
        <Picker
            selectedValue={props.order?.id}
            onValueChange={(itemValue) => {
                props.setOrder(ordersHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    )
}


export default function OrderList({ navigation }) {
    const [order, setOrder] = useState({});
    order["total_price"] = 0

    const table = order?.order_items?.map((product, index) => {
        order.total_price += product.amount * product.price;

        return (
            <DataTable.Row key={index}>
                <DataTable.Cell>{product.name}</DataTable.Cell>
                <DataTable.Cell numeric>{product.amount}</DataTable.Cell>
                <DataTable.Cell numeric>{product.price}</DataTable.Cell>
                <DataTable.Cell numeric>{product.amount * product.price}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <View>
            <Text>Skapa ny faktura</Text>
            <OrderDropDown 
                order={order}
                setOrder={setOrder}
            />
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>
            <Text>{order.country}</Text>
            <Text>Produkter</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Produkt</DataTable.Title>
                    <DataTable.Title numeric>Antal</DataTable.Title>
                    <DataTable.Title numeric>Pris</DataTable.Title>
                    <DataTable.Title numeric>Totalt</DataTable.Title>
                </DataTable.Header>
                {table}
            </DataTable>
            <Text>Totalt pris: {order.total_price}</Text>

            <Button
                title="Skapa faktura"
                onPress={() => {
                    invoices.createInvoice(order);
                    navigation.navigate("List", { reload: true });
                }}
            />
        </View>
    )
}
