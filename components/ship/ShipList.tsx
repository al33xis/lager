import { View, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import orderModel from "../../models/orders"
import { Base, Typography } from "../../styles/index";


export default function ShipList({ route, navigation }) {
    var { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    if (reload) {
        reloadOrders();
        reload = false;
    }

    useEffect(() => {
        reloadOrders();
    }, [])

    const listOfOrders = allOrders
    .filter(order => order.status_id >= 200)
    .map((order, index) => {
        return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Order', {
                        order: order
                    });
                }}
        />
    });

    return (
        <View>
            <Text style={Typography.map_header2}>Ordrar redo att skickas</Text>
            {listOfOrders}
        </View>
    )
}
