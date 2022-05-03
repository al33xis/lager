import { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

import getCoordinates from "../../models/nominatim";


export default function ShipOrder({ route }) {
    const { order } = route.params;

    const mapRef = useRef(null);
    const [marker, setMarker] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await getCoordinates(`${order.address}, ${order.city}`);
            setMarker(<Marker
                    coordinate={{ latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon) }}
                    title={result[0].display_name}
                    identifier={"ship"}
                />)

            // setMarkers("Shipment loaded"); // Räknar med att GPS tar längre tid
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setErrorMessage("Permission denied.");
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude, 
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
                identifier={"me"}
                />)
            setMarkers("Location loaded");
        })();
    }, []);

    function fitMarkers() {
        if (mapRef.current && marker && locationMarker) {
            const markerIDs = [marker.props.identifier, locationMarker.props.identifier];
            mapRef.current.fitToSuppliedMarkers(markerIDs, true);
        }
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text style={Typography.list_item} key={index}>
            {item.name} - {item.amount}
            </Text>;
    });

    return (
        <View style={Base.container_map}>
            <Text style={Typography.map_header1}>Skicka</Text>
            <Text style={Typography.map_header2}>Order: {order.id}</Text>
            <Text style={Typography.map_header3}>({order.status})</Text>
            <Text style={Typography.list_item}>{order.name}</Text>
            <Text style={Typography.list_item}>{order.address}</Text>
            <Text style={Typography.list_item}>{order.zip} {order.city}</Text>
            <Text style={Typography.map_normal}>Produkter: </Text>
            {orderItemsList}
            <MapView
                key={markers.length}
                ref={mapRef}
                style={Base.map_base}
                initialRegion={{
                    latitude: 62.00,
                    longitude: 15.00,
                    latitudeDelta: 15.0,
                    longitudeDelta: 10.0,
                }}
                onMapReady={fitMarkers}
                onMapLoaded={fitMarkers} 
                >
            {marker}
            {locationMarker}
            </MapView>
        </View>
    );
};
