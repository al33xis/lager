import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import productModel from "../../models/products";
import { Base, Typography } from "../../styles/index";


// function StockList() {
function StockList({products, setProducts}) {

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);


    const list = products.map((product, index) => {
        return <Text
                key={index}
                style={Typography.list_item}>
                • { product.name } - { product.stock } st
                </Text>
    });

    return (
        <View>
            <Text style={Typography.header1}>Lagerförteckning</Text>
            <Text style={Typography.list_head}>Namn - Saldo</Text>
            {list}
        </View>
    )
}

export default function Stock({products, setProducts}) {
    return (
        <View>
            <StockList products={products} setProducts={setProducts} />
        </View>
    );
}
