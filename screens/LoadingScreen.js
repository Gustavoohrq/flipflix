import React, { useEffect, useState, useRef } from 'react'
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native'
import * as Font from 'expo-font'



export default function LoadingScreen({ navigation: { navigate } }) {

    
    useEffect(() => {
        async function loadFont(){
            await Font.loadAsync({
                bold: require('../assets/fonts/Montserrat-Bold.ttf'),
                regular: require('../assets/fonts/Montserrat-Regular.ttf'),
                light: require('../assets/fonts/Montserrat-Light.ttf'),
                alfa: require('../assets/fonts/alfa-slab-one-regular.ttf')
            })
            navigate('HomeScreen')
        }
        loadFont()
    }, [])


    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(21,31,40,1)",
        justifyContent: 'center',
        alignItems: 'center'
    }

})
