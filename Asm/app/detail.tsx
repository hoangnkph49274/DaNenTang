import React, { useState } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Product {
  image: any; // Thay bằng `ImageSourcePropType` nếu bạn dùng ảnh từ thư viện
  name: string;
  description: string;
  price: string;
}

interface Props {
  product: Product;
  onGoBack: () => void;
}

const ManCoffeeData: React.FC<Props> = ({ product, onGoBack }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  if (!product) {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <Text style={styles.errorText}>No product data available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ImageBackground source={product.image} style={styles.imageBackground}>
        <View style={styles.overlay} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={24} color="#1e1e1e" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}
            onPress={() => setIsFavorite(!isFavorite)} // Cập nhật trạng thái yêu thích
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"} // Đổi biểu tượng
              size={24}
              color={isFavorite ? "red" : "#000"} // Đổi màu
            />
          </TouchableOpacity>
        </View>

        {/* Product Details */}
        <View style={styles.topSection}>
          <Text style={styles.title}>{product.name || "No Name"}</Text>
          <Text style={styles.rating}>
            <Ionicons name="star" size={14} color="#FFD700" /> 4.5 (6,879)
          </Text>
          <Text style={styles.description}>{product.description || "No Description"}</Text>
        </View>
      </ImageBackground>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.fullDescription}>
          Cappuccino is a latte made with more foam than steamed milk, often
          with a sprinkle of cocoa powder or cinnamon on top.
        </Text>

        {/* Size Selector */}
        <Text style={styles.sectionTitle}>Size</Text>
        <View style={styles.sizeContainer}>
          {["S", "M", "L"].map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size ? styles.activeSize : null,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={styles.sizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add to Cart */}
        <View style={styles.footer}>
          <Text style={styles.price}>{product.price || "$0.00"}</Text>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  imageBackground: {
    width: "100%",
    height: 500,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  iconButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
  },
  topSection: {
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: "#aaa",
    marginVertical: 10,
  },
  bottomSection: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  fullDescription: {
    fontSize: 14,
    color: "#aaa",
    marginVertical: 10,
  },
  sizeContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  sizeButton: {
    backgroundColor: "#444",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginRight: 15,
  },
  activeSize: {
    backgroundColor: "#ff7f50",
  },
  sizeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  addToCartButton: {
    backgroundColor: "#ff7f50",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ManCoffeeData;
