import React, { useState } from 'react'
import ReactNative, { View, StyleSheet, ScrollView  } from 'react-native'
import api from '../services/api'
import Form from '../components/form/index'
import Card from '../components/card/index'

export default function HomeScreen() {
    const [movies, setMovies] = useState(['']);
    const [nulll, setNull] = useState(false);
    var key = 'SUA_KEY';
    var lg = 'en-US'
    
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

        <View style={styles.container}>
                    <ScrollView>

            <ReactNative.Text style={styles.title}>FLIPFLIX</ReactNative.Text>
            <View style={styles.form}>
                <Form onSubmit={handleAddMovies} />
            </View>
           

            {movies.map((movie, i) => (
                <Card
                    key={i}
                    movie={movie}
                />
            ))}

</ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(21,31,40,1)",
        flex: 1,
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

})
