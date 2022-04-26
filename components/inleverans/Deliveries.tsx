import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DeliveriesList from "./DeliveriesList";
import DeliveryForm from "./DeliveryForm";

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={DeliveriesList} />
            {/* <Stack.Screen name="Form" component={DeliveryForm} /> */}
            <Stack.Screen name="Form">
                {(screenProps) => <DeliveryForm {...screenProps} setProductsHome={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};