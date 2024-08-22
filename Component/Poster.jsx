import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {poster} from '../data';

function Poster() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => {
                
                const nextIndex = (prevIndex + 1) % poster.length;
                return nextIndex;
            });
        }, 5000);

        
        return () => clearInterval(interval);
    }, []);

    return (
       <View>
         <View style={styles.container}>
            <Image
                source={{ uri: poster[index].image }}
                style={styles.image}
            />
        </View>

              <View style={styles.BarContainer}>
              {poster.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.bar,
                            {
                                width: i === index ? 20 : 5,
                                
                               
                            }
                        ]}
                    />
                ))}
              </View>
       </View>
    );
}

export default Poster;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 250,
    },
    image: {
        width: 400,
        height: 220,
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
