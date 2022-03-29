import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from './assets/warehouse.jpg';
import Stock from './components/Stock.tsx';
import ButtonTest from './components/Button.tsx';


export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.base}>
                <Text style={styles.header}>Infinity Warehouses</Text>
                <Image source={warehouse} style={{width: 200, height: 200, marginBottom: 18}}/>
                <Stock />
                <ButtonTest />
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        color: '#000',
        fontSize: 38,
        paddingBottom: 18
    },
    base: {
        // flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 12,
        paddingRight: 12,
        alignItems: 'center'
    }
});
