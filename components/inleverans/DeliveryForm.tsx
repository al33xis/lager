import { useState, useEffect } from "react";
import { Platform, ScrollView, View, Text, TextInput, Button } from "react-native";
import { Base, Typography, Forms } from "../../styles/index";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { showMessage } from "react-native-flash-message";

import Delivery from "../../interfaces/delivery";
import productModel from "../../models/products";
import deliveryModel from "../../models/delivery";

function validateAmount(content: any) {

    console.log(content);

    // if (!isNaN(content.amount)) {
    //     console.log("rätt ifylld")
    // } else {
    //     console.log("inget värde")
    // }

    // if (content.match(pattern)) {
    //     showMessage({
    //         message: "Fel format",
    //         description: "Du får bara skriva in siffror",
    //         type: "warning",
    //         floating: true
    //     });
    // } else {
    //     showMessage({
    //         message: "Inmatning godkänd!",
    //         type: "success",
    //         floating: true
    //     })
    // }
}

// Raderar allt som inte är ett nummer
function removeNan(delivery: any) {
    if (delivery?.amount?.toString() === "NaN") {
        return "";
    } else {
        return delivery?.amount?.toString();
    }
}

function zeroPad(number:number): string {
    if (number < 10) {
        return "0"+number;
    }
    return ""+number;
}

function formatDate(date: Date): string {
    return `${date?.getFullYear()}-${zeroPad(date?.getMonth()+1)}-${zeroPad(date?.getDate())}`;
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
                    value={dropDownDate || new Date()}
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
                    // validateAmount(delivery)
                }}
                // value={delivery?.amount?.toString()}
                value={removeNan(delivery)}
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
                    let message: string;
                    let description: string;
                    let type: any;

                    if (!delivery?.product_id) {
                        message = "Ingen produkt vald";
                        description = "Du måste välja en produkt."
                        type = "warning"
                    } else if (!delivery?.amount) {
                        message = "Antal ej valt"
                        description = "Du måste välja antal produkter att inleverera."
                        type = "warning"
                    } else if (!delivery?.delivery_date) {
                        message = "Datum ej valt"
                        description = "Du måste välja ett datum för inleveransen"
                        type = "warning"
                    } else {
                        message = "Lyckad inleverans!"
                        description = "Leveransen har registrerats."
                        type = "success"
                        addDelivery();
                    }

                    showMessage({
                        message: message,
                        description: description,
                        type: type,
                        floating: true
                    })
                }}
            />
        </ScrollView>
    );
};