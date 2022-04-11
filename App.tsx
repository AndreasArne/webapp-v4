import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './components/Stock.tsx';
import Pick from "./components/Pick.tsx";
import Deliveries from "./components/Deliveries.tsx";
import Invoices from "./components/Invoices.tsx";
import Auth from "./components/auth/Auth";
import authModel from "./models/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Inleverans": "car",
  "Logga in": "lock-closed",
  "Faktura": "cash-outline",
};
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn() /* Vi kommer tillbaka till denna funktion. */);
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
        >
          <Tab.Screen name="Lager" component={Stock} />
          <Tab.Screen name="Plock" component={Pick} />
          <Tab.Screen name="Inleveranse" component={Deliveries} />
          {isLoggedIn ?
            <Tab.Screen name="Faktura" component={Invoices} /> :
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});