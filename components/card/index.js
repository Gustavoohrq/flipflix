import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";



export default function index({ movie }) {
    const [vincent, setVincent] = useState(false)

    useEffect(() => {
        if (movie.length !== 0) {
            setVincent(true)
        }
    }, [movie])
    return (
        <>
            {vincent ?


                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                        resizeMode="stretch"
                    />
                    <Text style={styles.titleCard}>{movie.title}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20 }} >
                        <Icon name="star" style={styles.iconsStart} />
                        <Text style={styles.rating}>{movie.vote_average}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }} >
                        <Icon name="calendar" style={styles.iconsCalender} />
                        <Text style={styles.releaseData}>{movie.release_date}</Text>
                    </View>
                </View>
                : <Image
                    style={{ marginTop: 300, position: 'absolute' }}
                    source={require("../../assets/images/confused.gif")}
                />}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 15,
        marginBottom: 20,
        top: 100,
        marginLeft: 30,
        marginRight: 30,
        flexDirection: "row",
        borderColor: "#D9D5DC",
        borderBottomWidth: 2,
    },
    image: {
        width: 100,
        height: 150,
    },
    titleCard: {
        marginBottom: 20,
        width: 210,
        top: 5,
        left: 10,
        color: "rgba(217,217,217,1)",
        fontSize: 14,
        fontFamily: "bold"
    },
    iconsStart: {
        position: "absolute",
        color: 'yellow',
        fontSize: 25,
        left: -200,
        top: 30
    },
    iconsCalender: {
        position: "absolute",
        color: 'rgba(217,217,217,1)',
        fontSize: 25,
        left: -210,
        top: 70
    },
    rating: {
        fontSize: 13,
        fontFamily: "light",
        color: "rgba(217,217,217,1)",
        left: -160,
        top: 35
    },
    releaseData: {
        fontSize: 13,
        fontFamily: "light",
        color: "rgba(217,217,217,1)",
        left: -170,
        top: 75

    }


})

