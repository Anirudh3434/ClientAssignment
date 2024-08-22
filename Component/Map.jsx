import React, { useState } from 'react';
import { AddressD } from '../data';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Map({ method, props }) {
    const [markerCoords, setMarkerCoords] = useState({
        latitude: 28.70405920,
        longitude: 77.10249020,
    });

    const handleMarkerDragEnd = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerCoords({ latitude, longitude });
    };

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setMarkerCoords({ latitude, longitude });
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    return (
        <View style={styles.manual}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: markerCoords.latitude,
                    longitude: markerCoords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={markerCoords}
                    draggable
                    onDragEnd={handleMarkerDragEnd}
                />
            </MapView>
            <View style={styles.mapInfo}>
                <Text style={{ color: 'black', margin: 10 }}>Select Your Delivery Location</Text>
                <View style={styles.row}>
                    <View style={{ flex: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name='location' style={[styles.icon, { fontSize: 25 }]} />
                            <Text style={[styles.locationText, { textAlign: 'left', marginLeft: 10, fontWeight: '700', fontSize: 25 }]}>
                                {AddressD.title}
                            </Text>
                        </View>
                        <Text style={{ color: 'black', margin: 10, fontSize: 12 }}>{AddressD.address}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.button2}>
                            <Text style={[styles.buttonText, { color: 'black' }]}>Enable</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { 
                                props(false);
                                method(false);
                            }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={getCurrentLocation}
                    style={[styles.button, { alignSelf: 'center' }]}
                >
                    <Text style={styles.buttonText}>Enable Location</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Map;

const styles = StyleSheet.create({
    manual: {
        flex: 1,
        position: 'absolute',
        marginLeft: 16,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    map: {
        height: 580,
        width: '100%',
    },
    mapInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 5,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        width: '100%',
        marginTop: 10,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
    button2: {
        marginTop: 10,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    icon: {
        fontSize: 25,
        color: 'black',
    },
    locationText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 25,
        textAlign: 'left',
        marginLeft: 10,
    },
});
