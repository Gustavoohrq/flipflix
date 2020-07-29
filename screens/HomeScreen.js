import React, { useState, useEffect, useRef } from 'react'
import ReactNative, { View, StyleSheet, ScrollView, StatusBar, Dimensions, Image, Text, FlatList, TouchableOpacity } from 'react-native'
import api from '../services/api'
import Icon from "react-native-vector-icons/FontAwesome";


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


export default function HomeScreen() {
    const [movies, setMovies] = useState(['']);
    const [loading, setLoading] = useState(false)

    var key = '50e1d8ffed136011850ab0daf22650c0';
    var lg = 'en-US'

    const _renderItem = ({ item, index }) => {
        var d = new Date(item.release_date);
        const release_date = d.getFullYear()

        return (
            <TouchableOpacity style={styles.containerMovie}>

                <Image
                    style={styles.imgFlat}
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
                />
                <View style={styles.movieImg}>
                    <View style={styles.description}>
                        <Icon name='star' size={14} color='#87919E' >
                            <Text style={{ fontSize: 14, fontFamily: 'regular', }}>  {item.vote_average}</Text>
                        </Icon>
                        <Text style={styles.release_date}>{release_date}</Text>
                    </View>
                    <Text style={styles.titleMovie}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    useEffect(() => {
        api.get(`3/movie/popular`, {
            params: {
                api_key: key,
                language: lg,
            }
        }).then(response => {
            setMovies(response.data.results)
            setTimeout(() => {
                setLoading(true)
            }, 5000);
        });
    }, [])

    async function handleAddMovies(data) {
        var response = await api.get(`3/search/movie`, {
            params: {
                api_key: key,
                language: lg,
                query: data,
            }
        })
        setMovies(response.data.results)
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={{ flex: 1, height: screenHeight, }}>
                <View style={styles.moviesContainer}>
                    {loading ?
                        <FlatList
                            horizontal
                            data={movies}
                            renderItem={_renderItem}
                            keyExtractor={(item, index) => index}

                        />
                        :

                        <View style={{ flex: 1, alignItems: "center", marginTop: 100 }} >
                            <Image style={{ width: 150, height: 150 }} source={{ uri: 'https://thumbs.gfycat.com/GleamingMildLarva-max-1mb.gif' }} />
                        </View>
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1E21'

    },
    title: {
        marginLeft: 55,
        marginTop: 70,
        color: "rgba(195,130,195,1)",
        fontSize: 55,
        fontFamily: "alfa",
    },
    form: {
        flex: 1,
    },

    moviesContainer: {

        marginTop: 150,

    },
    imgFlat: {
        alignSelf: "center",
        width: 250,
        height: 350,
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,

    },
    release_date: {
        fontSize: 14,
        fontFamily: 'regular',
        color: '#87919E'
    },
    titleMovie: {
        fontSize: 18,
        fontFamily: "bold",
        marginTop: 15,
        color: '#040507',
        height: 30
    },
    movieImg: {
        backgroundColor: '#E5E9EC',
        borderBottomEndRadius: 12,
        borderBottomStartRadius: 12,
        padding: 20
    },

    description: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    containerMovie: {
        borderRadius: 12,
        margin: 10,
        width: 250,
    }
})
