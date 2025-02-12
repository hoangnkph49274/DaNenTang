import React from "react";
import {  StyleSheet, Text, View, Image } from "react-native";

export default function Bai1 (){
  return(
    <View style={styles.container}>
      <Text style={styles.text}>ABCdef</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: 'Molle',
    fontSize: 20,
    
  }
})