import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addAddress } from '../Store/Slice'; 
import { AddressD } from '../data';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Address({ method }) {
    const [houseFlatBlock, setHouseFlatBlock] = useState('');
    const [apartmentRoadArea, setApartmentRoadArea] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [noSubmit, setNoSubmit] = useState(true); // Initially noSubmit is true

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        // Update noSubmit state based on field values
        if (houseFlatBlock && apartmentRoadArea && selectedOption) {
            setNoSubmit(false);
        } else {
            setNoSubmit(true);
        }
    }, [houseFlatBlock, apartmentRoadArea, selectedOption]);

    const handleSave = () => {
        if (noSubmit) return; // Prevent saving if form is not valid

        dispatch(addAddress({ houseFlatBlock, apartmentRoadArea, selectedOption }));

        setHouseFlatBlock('');
        setApartmentRoadArea('');
        setSelectedOption(null);
        method(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TouchableOpacity onPress={() => method(false)} style={styles.closeButton}>
                    <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>
                <View style={styles.locationHeader}>
                    <Ionicons name="location" size={28} color="red" />
                    <Text style={styles.title}>{AddressD.title}</Text>
                </View>
                <View style={styles.addressContainer}>
                    <Text>{AddressD.address}</Text>
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>HOUSE/FLAT/BLOCK NO.</Text>
                    <TextInput
                        style={styles.textInput}
                        value={houseFlatBlock}
                        onChangeText={setHouseFlatBlock}
                    />
                    <Text style={styles.label}>APARTMENT/ROAD/AREA</Text>
                    <TextInput
                        style={styles.textInput}
                        value={apartmentRoadArea}
                        onChangeText={setApartmentRoadArea}
                    />
                    <Text style={styles.label}>SAVE AS</Text>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity
                            style={[
                                styles.option,
                                selectedOption === 'home' && styles.selectedOption
                            ]}
                            onPress={() => setSelectedOption('Home')}
                        >
                            <Ionicons name="home" size={24} color={selectedOption === 'home' ? 'white' : 'black'} />
                            <Text style={[styles.optionText, { color: selectedOption === 'home' ? 'white' : 'black' }]}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.option,
                                selectedOption === 'office' && styles.selectedOption
                            ]}
                            onPress={() => setSelectedOption('Office')}
                        >
                            <Ionicons name="briefcase" size={24} color={selectedOption === 'office' ? 'white' : 'black'} />
                            <Text style={[styles.optionText, { color: selectedOption === 'office' ? 'white' : 'black' }]}>Office</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.option,
                                selectedOption === 'other' && styles.selectedOption
                            ]}
                            onPress={() => setSelectedOption('Other')}
                        >
                            <Ionicons name="location-outline" size={24} color={selectedOption === 'other' ? 'white' : 'black'} />
                            <Text style={[styles.optionText, { color: selectedOption === 'other' ? 'white' : 'black' }]}>Other</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.button, { opacity: noSubmit ? 0.5 : 1 }]}
                    onPress={handleSave}
                    disabled={noSubmit} 
                >
                    <Text style={styles.buttonText}>Save & Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('saved')}
                >
                    <Text style={styles.viewSavedText}>View Saved Address</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#00000080',
        justifyContent: 'flex-end',
    },
    subContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 20,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        height: 550,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeText: {
        fontSize: 24,
        color: 'black',
    },
    locationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    title: {
        fontSize: 30,
        color: 'black',
        fontWeight: '700',
        marginLeft: 10,
    },
    addressContainer: {
        width: '100%',
        marginTop: 10,
        marginLeft: 20,
    },
    formContainer: {
        marginTop: 20,
        marginLeft: 20,
        width: '90%',
    },
    label: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
    },
    textInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '30%',
        justifyContent: 'center',
    },
    selectedOption: {
        backgroundColor: 'red',
        borderColor: 'red',
    },
    optionText: {
        marginLeft: 5,
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        width: '90%',
        height: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    viewSavedText: {
        color: 'black',
        fontWeight: '800',
        marginLeft: '32%',
        marginTop: 20,
    },
});

export default Address;
