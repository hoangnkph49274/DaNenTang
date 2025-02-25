import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CartItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
};

const API_URL = "http://10.24.50.243:3000/cart";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(API_URL);
      const text = await response.text();
  
      if (!text || text.trim() === "null" || text.trim() === "undefined") {
        setCartItems([]); 
        return;
      }
  
      try {
        const data = JSON.parse(text);
        setCartItems(Array.isArray(data) ? data : []);
      } catch (jsonError) {
        console.error("Lỗi khi parse JSON:", jsonError);
        setCartItems([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
      setCartItems([]); 
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchCartItems();
    }, [])
  );

  const removeItemFromCart = async (id: any) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        Alert.alert("Xóa thành công!", "Sản phẩm đã được xóa khỏi giỏ hàng.");
        fetchCartItems(); // Cập nhật lại danh sách giỏ hàng
      } else {
        Alert.alert("Lỗi!", "Không thể xóa sản phẩm.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItemFromCart(id);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        fetchCartItems();
      } else {
        Alert.alert("Lỗi!", "Không thể cập nhật số lượng.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error);
    }
  };
  const handlePay = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Giỏ hàng trống!", "Không có sản phẩm nào để thanh toán.");
      return;
    }
  
    try {
      const orderData = {
        items: cartItems,
        totalPrice,
        timestamp: new Date().toISOString(),
      };
  
      const orderResponse = await fetch("http://10.24.50.243:3000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
  
      if (!orderResponse.ok) {
        throw new Error("Lỗi khi lưu vào lịch sử đơn hàng!");
      }
  
      for (const item of cartItems) {
        await fetch(`${API_URL}/${item.id}`, { method: "DELETE" });
      }
  
      Alert.alert("Cảm ơn!", "Bạn đã thanh toán thành công.", [{ text: "OK" }]);
      setCartItems([]); 
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      Alert.alert("Lỗi!", "Có lỗi xảy ra khi thanh toán.");
    }
  };
  
  
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1), 0);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => router.push("/setting")}>
        <Image style={{ width: 40, height: 40 }} source={require("@/assets/images/Menu.png")} />
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>CART</Text>
        <Ionicons name="person-circle-outline" size={35} color="#fff" />
      </TouchableOpacity>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.size}>{item.size}</Text>
              <Text style={styles.price}>${(item.price || 0)}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.quantityButton}>
                  <Ionicons name="remove-circle-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.quantityButton}>
                  <Ionicons name="add-circle-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(item.id)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#141414", padding: 15 },
  cartItem: { flexDirection: "row", alignItems: "center", marginBottom: 15, backgroundColor: "#1E1E1E", padding: 10, borderRadius: 10 },
  image: { width: 60, height: 60, borderRadius: 10 },
  details: { flex: 1, marginLeft: 10 },
  name: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  size: { color: "#999", fontSize: 14 },
  price: { color: "#FF6C22", fontSize: 16, fontWeight: "bold", marginTop: 5 },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  quantityButton: { padding: 5 },
  quantity: { color: "#fff", fontSize: 16, fontWeight: "bold", marginHorizontal: 10 },
  deleteButton: { padding: 10, backgroundColor: "#FF3B30", borderRadius: 5 },
  footer: { borderTopWidth: 1, borderTopColor: "#333", paddingTop: 10, marginTop: 10, alignItems: "center" },
  totalPrice: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  payButton: { backgroundColor: "#FF6C22", padding: 12, borderRadius: 10, marginTop: 10, width: "80%", alignItems: "center" },
  payButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 20 },
});

export default CartScreen;
