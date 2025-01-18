import React,{useEffect} from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    const time = setTimeout(() =>{
      router.push("/login")
    },3000);
    return 
  },[]);
    console.log("Welcome screen rendered");
    return (
      <SafeAreaView >
        <ScrollView style={styles.container}>
          <Image style={styles.img}
          source={require('@/assets/images/logo-coffee.png')}
        />
        </ScrollView>
      </SafeAreaView>
    );
  }
  
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#0C0F14',
      height: '100%',
    },
    img: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        alignSelf: 'center',
        marginTop: 280,
    }
})