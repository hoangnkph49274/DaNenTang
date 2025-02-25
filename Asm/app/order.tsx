import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const OrderHistoryScreen = () => {
    type OrderItem = {
        id: string;
        timestamp: string;
        totalPrice: number;
        items: {
          id: string;
          productId: string;
          name: string;
          image: string;
          price: string;
          size: string;
          quantity: number;
        }[];
      };
      
    const [orders, setOrders] = useState<OrderItem[]>([]);
      
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
    fetch("http://10.24.50.243:3000/order")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to fetch orders");
        setLoading(false);
      });
  }, []));

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => router.push("/setting")}>  
        <Image style={{ width: 40, height: 40 }} source={require('@/assets/images/Menu.png')} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: "white" }}>ORDER HISTORY</Text>
        <Ionicons name="person-circle-outline" size={35} color="#fff" />
      </TouchableOpacity>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderDate}>Order Date: {new Date(item.timestamp).toLocaleString()}</Text>
              
            </View>
            
            {item.items.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>${product.price}</Text>
                  <Text style={styles.itemSize}>Size: {product.size}</Text>
                  <Text style={styles.itemQuantity}>Quantity: {product.quantity}</Text>
                </View>
              </View>
            ))}
            <Text style={styles.orderTotal}>Total Amount: ${item.totalPrice.toFixed(2)}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadText}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141414", padding: 15 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  orderCard: { backgroundColor: "#1E1E1E", borderRadius: 10, padding: 10, marginBottom: 15 },
  orderHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  orderDate: { color: "#ccc", fontSize: 14 },
  orderTotal: { color: "#FFA500", fontSize: 14, fontWeight: "bold" },
  productCard: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  productImage: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
  productInfo: { flex: 1 },
  productName: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  productPrice: { color: "#FFA500", fontSize: 16, fontWeight: "bold" },
  itemSize: { color: "#ccc", fontSize: 14 },
  itemQuantity: { color: "#FFA500", fontSize: 14 },
  downloadButton: {
    backgroundColor: "#FFA500",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  downloadText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default OrderHistoryScreen;
