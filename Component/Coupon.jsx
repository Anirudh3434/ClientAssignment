import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {coupon} from '../data';

function Coupon() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => {
                
                const nextIndex = (prevIndex + 1) % coupon.length;
                return nextIndex;
            });
        }, 5000);

        
        return () => clearInterval(interval);
    }, []);

    return (
       <View>
         <View style={styles.container}>
            <Image
                source={{ uri: coupon[index].image }}
                style={styles.image}
            />
        </View>

             
       </View>
    );
}

export default Coupon;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 250,
    },
    image: {
        width: 400,
        height: "55%",
        margin: 5,
        borderRadius: 10,
    },
    bar:{
       padding: 5,
       width: 5,
       height: 5,
       backgroundColor: 'red',
       borderRadius: 10,
       margin: 2
    
    },

    
    BarContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    }
});
