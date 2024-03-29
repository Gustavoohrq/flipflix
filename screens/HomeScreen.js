import React, { useState, useEffect, useRef } from 'react'
import ReactNative, { View, StyleSheet, ScrollView, StatusBar, Dimensions, Image, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import api from '../services/api'
import Icon from "react-native-vector-icons/Feather";


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


export default function HomeScreen() {
    const [movies, setMovies] = useState(['']);
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [categories, setCategories] = useState([''])
    const [selectedCategory, setSelectedCategory] = useState(28);



    var key = '50e1d8ffed136011850ab0daf22650c0';
    var lg = 'en-US'

    const changeCategory = (category) => {
        setSelectedCategory(category)
        // gamesRef.current.scrollToOffset({ x: 0, y: 0 });
    };

    const _renderItemMovie = ({ item, index }) => {
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

    const _renderItemCategory = ({ item, index }) => {
        return (
            <>
                {selectedCategory === item.id ?

                    <TouchableOpacity style={styles.categoryActive} onPress={() => changeCategory(item.id)}>
                        <Text style={styles.categoryNameActive}>{item.name}</Text>
                    </TouchableOpacity>

                    :

                    <TouchableOpacity style={styles.category} onPress={() => changeCategory(item.id)}>
                        <Text style={styles.categoryName}>{item.name}</Text>
                    </TouchableOpacity>
                }



            </>
        )
    }
    useEffect(() => {
        api.get(`3/movie/popular`, {
            params: {
                api_key: key,
                language: lg,
            }
        }).then(response => {
            setMovies(response.data.results)
        });

        api.get(`3/genre/movie/list`, {
            params: {
                api_key: key,
                language: lg,
            }
        }).then(response => {
            setCategories(response.data.genres)
        });

        setTimeout(() => {
            setLoading(true)
        }, 5000);

    }, [])

    async function handleAddMovies() {
        setLoading(false)
        var response = await api.get(`3/search/movie`, {
            params: {
                api_key: key,
                language: lg,
                query: searchText,
            }
        })
        setSearchText('')
        setSelectedCategory(28)
        setMovies(response.data.results)
        setTimeout(() => {
            setLoading(true)
        }, 4000);
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.searchContainer}>
                <TextInput style={styles.inputSearch} placeholder='Search for a movie...' placeholderTextColor="#566068" value={searchText} onChangeText={e => setSearchText(e)} />
                <TouchableOpacity onPress={handleAddMovies} style={styles.searchIcon}>
                    <Icon name='search' color='#566068' size={20} />
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                data={categories}
                renderItem={_renderItemCategory}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
            />
            <View style={{ flex: 1, height: screenHeight, }}>
                <View style={styles.moviesContainer}>
                    {loading ?
                        <FlatList
                            horizontal
                            data={movies.filter(movie => {
                                return movie.genre_ids.includes(selectedCategory) || selectedCategory === 28;
                            })}
                            renderItem={_renderItemMovie}
                            keyExtractor={(item, index) => index}
                            showsHorizontalScrollIndicator={false}

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
    searchContainer: {
        position: 'relative',
        backgroundColor: '#29313A',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
    },
    inputSearch: {
        color: '#566068',
        fontFamily: 'regular',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,

    },
    searchIcon: {
        position: 'absolute',
        right: 16
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
    },
    category: {
        alignItems: 'center',
        marginHorizontal: 16,
        borderColor: '#566068',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    categoryName: {
        color: '#566068',
        fontFamily: 'bold'
    },

    categoryActive: {
        alignItems: 'center',
        marginHorizontal: 16,
        borderColor: '#819ee5',
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    categoryNameActive: {
        color: '#819ee5',
        fontFamily: 'bold'
    },

})
