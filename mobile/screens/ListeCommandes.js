import {Button,Text,View,FlatList, Alert} from "react-native";
import * as React from "react";
import useGet from "../hooks/useGet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from "react-native";
const createAlert = (titre, message) =>
    Alert.alert(
        titre,
        message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );


function ListeCommandes() {
    const {data: articles} = useGet("http://localhost:4000/api/v1/articles/")  

    async function AddOrder(order){
        let value = await AsyncStorage.getItem("@article") || []
        if (typeof value  === 'string') value = JSON.parse(value);
        if (value.some(article => article.code_article===order.code_article)) {
            return createAlert("erreur", "Cet article est déjà dans votre Cart");
        }
        value.push(order);
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@article", jsonValue);
        return createAlert("confirmation", "L'article a bien été ajouté");
    }

  
    const renderItem = function ({ item : article }) {
      return (
        <View key={article.code_article}>
          <View style={[styles.article, styles.card]}>
            <View>
                <Text style={[styles.text]}>
                    Marque : {article.marque} {"\n"} 
                    Libelle : {article.libelle} {"\n"} 
                    Prix : {article.prix_vente} {"\n"}
                    Référence : {article.code_article} {"\n"}
                </Text>
            </View>
            <View>
                <View style={[styles.card]}>
                    <Button
                    onPress={()=> AddOrder(article)}
                    title="Commander"
                    color="#1976d2"
                    />
                </View>
            </View>
          </View>
        </View>
      );
    };
    return (
      <View style={styles.background}>
          <FlatList
            data={articles?.body || []}
            renderItem={renderItem}
            keyExtractor={(item) => item.code_article}
          />
      </View>
    );
  }
  
const styles = StyleSheet.create({
    background : {
        backgroundColor: "#79b1f1",
        flex : 1
    },
    article: {
        marginTop: 24,
        padding: 10,
        backgroundColor: "#fff",
    },
    card: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "90%",
        alignSelf: "center",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
      flex: 3,
      color: "grey",
      fontSize: 18,
      marginLeft: "auto",
      paddingLeft: 20,
    },
    qtt: {
      backgroundColor: "#1976d2",
      flex: 3,
      color: "white",
      fontSize: 20,
      marginLeft: "auto",
    },
    ButtonMoin: {
      flex: 3,
    },
});

export default ListeCommandes;
  