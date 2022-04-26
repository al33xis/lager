import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native';
import Home from "./components/lager/Home";
import Pick from "./components/plock/Pick";
import Deliveries from "./components/inleverans/Deliveries";
import Invoices from './components/invoices/Invoices';

import productModel from "./models/products";
import { Base, Typography } from "./styles/index";
import Auth from "./components/auth/Auth";
import authModel from "./models/auth";

const Tab = createBottomTabNavigator();
const routeIcons = {
    "Lager": "home",
    "Plock": "list",
    "Inleverans": "airplane",
    "Logga in": "lock-closed",
    "Faktura": "cash",
};



export default function App() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(async () => {
        setIsLoggedIn(await authModel.loggedIn());
    }, []);

    return (
        <SafeAreaView style={Base.container_safeArea}>
            <NavigationContainer>
                    <Tab.Navigator screenOptions={ ({route}) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName = routeIcons[route.name] || "alert";

                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                    })}>
                        <Tab.Screen name="Lager">
                            {() => <Home products={products} setProducts={setProducts} />}
                        </Tab.Screen>
                        <Tab.Screen name="Plock">
                            {() => <Pick products={products} setProducts={setProducts} />}
                        </Tab.Screen>
                        <Tab.Screen name="Inleverans">
                            {() => <Deliveries products={products} setProducts={setProducts}/>}
                        </Tab.Screen>
                        {isLoggedIn ?
                            <Tab.Screen name="Faktura">
                                {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
                            </Tab.Screen> :
                            <Tab.Screen name="Logga in">
                                {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
                            </Tab.Screen>
                        }
                    </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style='auto' />
        </SafeAreaView>
  );
}
