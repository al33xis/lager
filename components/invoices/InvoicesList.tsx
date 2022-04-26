import { useState, useEffect } from "react";
import { ScrollView, Text, Button } from "react-native";
import { DataTable } from "react-native-paper";
import Invoice from "../../interface/invoice";
import invoiceModel from "../../models/invoices";
import { Base, Typography } from "../../styles";
import auth from "../../models/auth";

export default function InvoicesList({ route, navigation, setIsLoggedIn}) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Invoice[]>([]); // ändra till rätt typ

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
        // console.log(allInvoices);
    }

    if (reload) {
        reloadInvoices();
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    async function logOut() {
        auth.logout(); // använd en auth-logout funktion i stället
        setIsLoggedIn(false);
    }

    const invoicesRows = allInvoices.map((invoice, index) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
                <DataTable.Cell numeric>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    // datatable mellan fakturor och skapa faktura
    return (
        <ScrollView>
            <Text style={Typography.header2}>Fakturor</Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title numeric>Pris</DataTable.Title>
                    <DataTable.Title numeric>Fakturadatum</DataTable.Title>
                </DataTable.Header>
                {invoicesRows}
            </DataTable>

            <Button 
            title="Skapa ny faktura"
            onPress={() => {
                navigation.navigate("Form");
            }}
            />
            <Text></Text>
            <Button 
            title="Logga ut"
            onPress={async () => {
                await logOut();
            }}
            
            />


        </ScrollView>
    )
}