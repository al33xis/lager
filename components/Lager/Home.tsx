import { Image, Text, View, ScrollView } from 'react-native';
import { Base, Typography } from "../../styles/index";
import warehouse from '../../assets/warehouse.jpg';
import Stock from './Stock';

// export default function Home() {
// export default function Home({products, setProducts}) {
export default function Home({products, setProducts}) {

    return (
            <View style={Base.container_home}>
                <Text style={Typography.header1}>Infinity Warehouses</Text>
                <Image source={warehouse} style={{width: 200, height: 200, marginBottom: 18}}/>
                <Stock products={products} setProducts={setProducts} />
            </View>
  );
}
