import { useState, useEffect } from "react";
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Forms } from "../../styles";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import invoiceModel from "../../models/invoices";
import orderModel from "../../models/orders";

// import Invoice from "../../interfaces/invoice";
import Order from "../../interfaces/order";

function zeroPad(number:number): string {
    if (number < 10) {
        return "0"+number;
    }
    return ""+number;
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${zeroPad(date.getMonth()+1)}-${zeroPad(date.getDate())}`;
}


function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);

    const ordersList = orders.filter(order => order.status === "Packad")
    .map((order, index) => {
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
        selectedValue={props.invoice?.order_id}
        onValueChange={(itemValue) => {
            props.setInvoice({...props.invoice, order_id: itemValue});
        }}>
            {ordersList}
        </Picker>
    )
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
                <Button onPress={showDatePicker} title="Fakturadatum" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setInvoice({
                            ...props.invoice,
                            creation_date: formatDate(date),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

export default function InvoicesForm({navigation, setProducts}) {
    const [invoice, setInvoice] = useState(); // oklar på om det ska vara objekt eller lista

    async function createInvoice() {
        await invoiceModel.createInvoice(invoice);
        console.log(invoice);

        navigation.navigate("List", {reload: true});
    }

    return (
        <ScrollView>
            <Text>Ny faktura</Text>

            <Text>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Text>Fakturadatum</Text>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Button
                title="Skapa faktura"
                onPress={async () => {
                    await createInvoice();
                }}
            />
        </ScrollView>
    );
}