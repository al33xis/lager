import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

    const list = products.map((product, index) => <Text key={index} style={styles.list_item}> • { product.name } - { product.stock } st</Text>);

    return (
        <View>
            {list}
        </View>
    )
}

export default function Stock() {
    return (
        <View>
            <Text style={styles.header}>Lagerförteckning</Text>
            <Text style={styles.list_head}>Namn - Saldo</Text>
            <StockList />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        color: '#333'
    },
    list_head: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        paddingBottom: 12
    },
    list_item: {
        fontSize: 16,
        color: '#333',
        paddingBottom: 4,
    }
});
