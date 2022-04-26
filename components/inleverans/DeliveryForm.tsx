import { useState, useEffect } from "react";
import { Platform, ScrollView, View, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from "../../styles/index";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import Delivery from "../../interfaces/delivery";
import productModel from "../../models/products";
import deliveryModel from "../../models/delivery";

function zeroPad(number:number): string {
    if (number < 10) {
        return "0"+number;
    }
    return ""+number;
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${zeroPad(date.getMonth()+1)}-${zeroPad(date.getDate())}`;
}

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({...props.delivery, product_id: itemValue});
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
                {itemsList}
            </Picker>
    );
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View style={Forms.button}>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: formatDate(date),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}


export default function DeliveryForm({ route, navigation, setProductsHome }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    async function addDelivery() {

        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.addStock(updatedProduct);

        setProductsHome(await productModel.getProducts());

        navigation.navigate("List", {reload: true});
    }

    return (
        <ScrollView style={{}}>
            <Text style={{...Typography.header2}}>Ny inleverans</Text>

            <Text style={{...Typography.list_head}}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{...Typography.list_head}}>Antal</Text>
            <TextInput 
                style={{...Forms.input}}
                keyboardType="numeric"
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
            />

            <Text style={{...Typography.list_head}}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />

            <Text style={{...Typography.list_head}}>Kommentar</Text>
            <TextInput
                style={{...Forms.input}}
                onChangeText={(content: string) => {
                    setDelivery({...delivery, comment: content})
                }}
                value={delivery?.comment}
            />

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
    );
};