import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([
    {
      id: "1",
      name: "Cappuccino",
      description: "With Steamed Milk",
      rating: 4.5,
      reviews: 6879,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb5bqC7IA8JdjL19Ko8baj61wNE8Qlab3GWw&s",
      tags: ["Coffee", "Milk", "Medium Roasted"],
    },
    {
      id: "2",
      name: "Espresso",
      description: "Strong and Bold",
      rating: 4.8,
      reviews: 9250,
      image: "https://bizweb.dktcdn.net/100/270/753/files/su-khac-nhau-giua-cafe-espresso-va-capuchino-2.png?v=1728701941913",
      tags: ["Coffee", "Dark Roasted"],
    },
  ]);

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.header} onPress={() => router.push("/setting")}>
          <Image style={{ width: 40, height: 40 }} source={require('@/assets/images/Menu.png')} />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: "white" }}>FAVORITE</Text>
          <Ionicons name="person-circle-outline" size={35} color="#fff" />
        </TouchableOpacity>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.heartButton}>
              <Ionicons name="heart" size={24} color="red" />
            </TouchableOpacity>

            <View style={styles.info}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.description}</Text>

              <View style={styles.row}>
                <Ionicons name="star" size={16} color="#FFA500" />
                <Text style={styles.rating}>{item.rating} ({item.reviews})</Text>
              </View>

              <View style={styles.tags}>
                {item.tags.map((tag, index) => (
                  <Text key={index} style={styles.tag}>{tag}</Text>
                ))}
              </View>

              <Text style={styles.description}>
                {item.name} is a delicious coffee option with a unique taste that coffee lovers enjoy.
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141414", padding: 15 },
  card: { backgroundColor: "#1E1E1E", borderRadius: 15, padding: 10, marginBottom: 15 },
  image: { width: "100%", height: 150, borderRadius: 10 },
  heartButton: { position: "absolute", top: 10, right: 10 },
  info: { padding: 10 },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  subtitle: { color: "#ccc", fontSize: 14, marginBottom: 5 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  rating: { color: "#fff", fontSize: 14, marginLeft: 5 },
  tags: { flexDirection: "row", marginBottom: 10 },
  tag: { backgroundColor: "#333", color: "#fff", padding: 5, borderRadius: 5, marginRight: 5, fontSize: 12 },
  description: { color: "#ccc", fontSize: 14 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    margin: 10,
  },
});

export default FavoritesScreen;
