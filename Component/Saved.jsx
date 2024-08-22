import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Map from './Map';

function Saved() {
    const addresses = useSelector((state) => state.address);
    const navigation = useNavigation();
    const [map , setMap] = useState(false)

    const renderAddressItem = ({ item }) => (
        <View style={styles.addressItem}>
               <Text style={[styles.addressText , {fontWeight: '700' , fontSize: 20  }]}>{item.selectedOption}</Text>
            <Text style={styles.addressText}>House/Flat/Block: {item.houseFlatBlock}</Text>
            <Text style={styles.addressText}>Apartment/Road/Area: {item.apartmentRoadArea}</Text>
         
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name='arrowleft' size={24} color='black' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Saved Addresses</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Search your area/pincode/apartment"
                />
                <AntDesign name='search1' size={20} color="black" style={styles.searchIcon} />
            </View>
            <View style={styles.currentLocationContainer}>
                <FontAwesome6 name='location-crosshairs' size={20} color='red' style={styles.locationIcon} />
                <Text style={styles.currentLocationText}>Current Location</Text>
                <TouchableOpacity style={styles.enableButton}>
                    <Text
                    onPress={()=>{setMap(true)}} 
                    style={styles.enableButtonText}>Enable</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={addresses}
                renderItem={renderAddressItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.listContainer}
            />

            {  map && (<Map props={setMap}/>)

            }
        </View>
    );
}

export default Saved;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    searchContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 16,
        position: 'relative',
    },
    textInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 40,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600',
    },
    searchIcon: {
        position: 'absolute',
        left: 10,
    },
    currentLocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    locationIcon: {
        marginRight: 10,
    },
    currentLocationText: {
        fontSize: 18,
        color: 'red',
        fontWeight: '700',
        flex: 1,
    },
    enableButton: {
        width: 100,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    enableButtonText: {
        color: 'black',
        fontWeight: '600',
    },
    listContainer: {
        flex: 1,
        marginTop: 16,
    },
    addressItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    addressText: {
        fontSize: 14,
        color: 'black',
    },
});
