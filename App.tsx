import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./components/Home";
import Pick from "./components/Pick";
import productModel from "./models/products";
import { Base, Typography } from "./styles/index";

const Tab = createBottomTabNavigator();
const routeIcons = {
    "Lager": "home",
    "Plock": "list",
};



export default function App() {
    const [products, setProducts] = useState([]);

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
                    {/* <Tab.Screen name="Lager" component={Home} /> */}
                    <Tab.Screen name="Lager">
                        {() => <Home products={products} setProducts={setProducts} />}
                    </Tab.Screen>
                    {/* <Tab.Screen name="Plock" component={Pick} /> */}
                    <Tab.Screen name="Plock">
                        {() => <Pick products={products} setProducts={setProducts} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style='auto' />
        </SafeAreaView>
  );
}
