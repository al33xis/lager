import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import productModel from "../../models/products";
import { Base, Typography } from "../../styles/index";


export default function StockList({products, setProducts}) {

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
            <Text style={Typography.list_head}>Namn - Saldo</Text>
            {list}
        </View>
    )
}