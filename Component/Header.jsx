import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';


function Header({method}) {
    return (
  
            <View style={styles.NavContainer}>
                <View style={styles.Nav1}>
                    <Ionicons name='person-circle' style={styles.icon} accessibilityLabel="Profile icon" />
                    <View style={styles.userinfo}>
                        <View style={styles.userInfoRow}>
                            <Text style={styles.welcomeText}>Welcome, Guest</Text>
                            <TouchableOpacity>
                                <Text style={styles.loginText}>Login</Text>
                            </TouchableOpacity> 
                        </View>
                        <View   style={styles.userInfoRow}>
                          <FontAwesome6 name='location-dot' style={styles.iconS}/>
                          <Text style={styles.welcomeText}>Deliver to <Text style={{fontWeight: '600'}}>450071</Text></Text>
                         <TouchableOpacity
                         onPress={() => method(true)}
                         >
                         <AntDesign name='caretdown'/>    
                            </TouchableOpacity> 
                        </View>
                    </View>
                </View>
              
                <AntDesign name='search1' style={[styles.icon ,{ color: 'black' , fontSize: 25}]}/>
            </View>

        
    );
}

export default Header;

const styles = StyleSheet.create({
  
    Nav1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    NavContainer: {
        padding: 5,
        height: 90,
        width: "100%",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        elevation: 2,
        backgroundColor: '#fff',
    },
    icon: {
        padding: 5,
        fontSize: 60,
        color: 'red',
    },
    iconS:{
        padding: 2,
        fontSize: 15,
        color: 'red',
    },
    userinfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', 
    },
    userInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welcomeText: {
        color: 'black',
        marginRight: 10, 
    },
    loginText: {
        color: 'red',
        fontWeight: '600',
    },
});
