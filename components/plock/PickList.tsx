import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import orderModel from "../../models/orders";
import productModel from "../../models/products";


export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;

    
    
    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    function CompareStock() {
        var itemsArr = order.order_items;
        var stockReturn;

        for (const element of itemsArr) {
            // If enough in stock
            if (element.stock >= element.amount) {
                stockReturn = <Button title="Plocka order" onPress={pick} />;
            } else {
                stockReturn = <Text>Alla produkter finns ej i lager ännu!</Text>
                break;
            }
        }

        return (
            <View>
                {stockReturn}
            </View>
        );

    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text key={index}>
            {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
        <View>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>
            {orderItemsList}
            <CompareStock />
        </View>
    )
};
