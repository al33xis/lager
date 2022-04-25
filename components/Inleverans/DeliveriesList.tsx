import { useState, useEffect } from "react";
import { ScrollView, View, Text, Button } from "react-native";
import deliveryModel from "../../models/delivery";

import { Base, Typography } from "../../styles/index";

export default function DeliveriesList({ navigation, route }) {
    var { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
        reload = false;
    }

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries())
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            return <View key={index} style={Base.delivery_box}>
                <Text>Leverans-ID: {delivery.id}</Text>
                <Text>Produkt: {delivery.product_id} - {delivery.product_name}</Text>
                <Text>Antal: {delivery.amount}</Text>
                <Text>Datum: {delivery.delivery_date}</Text>
                <Text>Kommentar: {delivery.comment}</Text>
            </View>
        })

    return (
        <ScrollView>
            <Text style={Typography.header1}>Inleveranser</Text>
            {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    )
}