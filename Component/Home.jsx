import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, TouchableOpacity, Image, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddressC from './Address';
import Header from './Header';
import Poster from './Poster';
import Coupon from './Coupon';
import { AddressD, dishes } from '../data';
import MapView, { MapOverlay, Marker } from 'react-native-maps';
import Map from './Map';

function Home() {
    const [location, setLocation] = useState(null);
    const [manual, setManual] = useState(false);
    const [markerPosition, setMarkerPosition] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });
    const [address, setAddress] = useState(true);

    useEffect(() => {
        const requestPermissions = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Permission',
                            message: 'App needs access to your location.',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        },
                    );
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        console.warn('Location permission not granted');
                    } else {
                        getCurrentLocation();
                    }
                } catch (err) {
                    console.warn(err);
                }
            } else {
                getCurrentLocation();
            }
        };

        requestPermissions();
    }, []);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLocation(position.coords);
                setMarkerPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    };

    const handleMarkerDragEnd = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarkerPosition({ latitude, longitude });
    };

    const renderDishItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.dishPrice}>{item.price}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Header method={setAddress} />
            <Poster />
            <Coupon />
            <View style={styles.dishesContainer}>
                <Text style={styles.dishName}>Items</Text>
                <FlatList
                    data={dishes}
                    renderItem={renderDishItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}  // Setting the number of columns to 2
                />
            </View>
            {location == null && (
                <View style={styles.location}>
                    <View style={styles.locationContainer}>
                        <MaterialIcons name='wrong-location' style={styles.icon} />
                        <Text style={styles.locationText}>Location permission is Off</Text>
                        <Text style={styles.description}>
                            We need your location to find the nearest store and provide you a seamless delivery experience.
                        </Text>
                        <TouchableOpacity onPress={getCurrentLocation} style={styles.button}>
                            <Text style={styles.buttonText}>Enable Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button2}
                            onPress={() => setManual(true)}
                        >
                            <Text style={[styles.buttonText, { color: 'red' }]}>
                                <AntDesign name='search1' style={styles.searchIcon} />
                                Search your Location Manually
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {manual && (
                <Map method={setManual} />
            )}
            {address && (
                <AddressC method={setAddress} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    location: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#00000080',
        justifyContent: 'flex-end',
    },
    locationContainer: {
        width: '100%',
        height: 350,
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        alignItems: 'center',
        padding: 25,
    },
    icon: {
        fontSize: 60,
        color: 'red',
    },
    locationText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        fontWeight: '600',
    },
    description: {
        textAlign: 'center',
        marginVertical: 10,
    },
    button: {
        marginTop: 20,
        width: '100%',
        height: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    button2: {
        marginTop: 20,
        width: '100%',
        height: 50,
        borderWidth: 2,
        borderColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    searchIcon: {
        fontSize: 20,
        marginRight: 5,
    },
    manual: {
        position: 'absolute',
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
        justifyContent: 'space-between',
    },
    dishesContainer: {
        width: '100%',
        padding: 10,
    },
    card: {
        flex: 1, // Adjust to fill half of the available space
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        marginVertical: 8,
        marginHorizontal: 8, // Adjust margin to maintain space between columns
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: 150,
    },
    cardContent: {
        padding: 10,
    },
    dishName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    dishPrice: {
        fontSize: 16,
        color: 'gray',
    },
});

export default Home;
