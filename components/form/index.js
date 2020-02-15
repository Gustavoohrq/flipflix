import React, { useState } from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import { StyleSheet, View, Text, TextInput, Alert } from "react-native";

function Form({ onSubmit }) {
  const [search, setSearch] = useState('')

  function handleSearch() {
    if (search === "") {
      Alert.alert('Required search field ')
    }
    else {
      onSubmit(search)
    }

  }
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputStyle} type="text" onChangeText={(text) => setSearch(text)} value={search} placeholder="Search..." placeholderTextColor="#d9d9d9"></TextInput>
      <FontAwesomeIcon name="search" style={styles.icon} onPress={handleSearch} ></FontAwesomeIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    margin: 30,
    flexDirection: "row",

  },
  inputStyle: {
    width: 60,
    flex: 1,
    color: "#d9d9d9",
    alignSelf: "stretch",
    paddingTop: 14,
    paddingRight: 5,
    paddingBottom: 8,
    paddingLeft: 7,
    borderColor: "rgba(21,31,40,1)",
    fontSize: 16,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    marginRight: 10,
    fontFamily: "light",
  },
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 24,
    marginLeft: 15,
    marginTop: 10
  },
});

export default Form;
