import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoicesList from './InvoicesList';
import InvoiceForm from './InvoiceForm';

const Stack = createNativeStackNavigator();

export default function Invoices() {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={InvoicesList} />
            <Stack.Screen name="Form" component={InvoiceForm} />
        </Stack.Navigator>
    );
};