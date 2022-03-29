import React from "react";
import { StyleSheet, Button, Text, Alert, View } from "react-native";

export default function ButtonTest() {
    return (
        <View style={styles.button}>
            <Button 
            title="Tryck här" 
            onPress={() => Alert.alert('Du tryckte!')}
            color='#333'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 24,
    }
})