import {Button,Text,View,FlatList,StyleSheet, Alert} from "react-native";
import * as React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import axios from "axios";

const createAlert = (titre, message) =>
    Alert.alert(
        titre,
        message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );


function Cart() {

    const [articles, setArticles] = useState()
    useEffect(()=> {
        const refresh = async function(){
            const json = await AsyncStorage.getItem("@article");
            setArticles(JSON.parse(json || "[]"))
        }
        refresh();
    }, [])
    
    async function Commander(){
        articles.forEach(async commande=> {
            await axios.post("http://localhost:4000/api/v1/commandes/", commande)
        })
        createAlert("Réussite", "Votre commande a bien été passée.");
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
          </View>
        </View>
      );
    };
    return (
      <View style={styles.background}>
        {!articles ? 
        <View><Text>Votre Cart est vide.</Text></View>
        :
        <>
        <FlatList
        data={articles || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.code_article}
        />
        <View style={styles.card}>
            <Text style={styles.total}>
                Total : {articles?.reduce((acc, article)=> acc+article.prix_vente, 0)}
            </Text>
            <Button
                    onPress={()=> Commander()}
                    title="Confirmer"
                    color="#1976d2"
            />
        </View>
        </>
        }
      </View>
    );
  }
  
const styles = StyleSheet.create({
    total : {
        fontSize: 35,
        color: "red",
        fontWeight: "bold"
    },
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

export default Cart;
  