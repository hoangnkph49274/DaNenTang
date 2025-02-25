import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  Modal,
} from "react-native";

const API_URL = "http://10.24.50.243:3000/productBeans";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

const CoffeeBeans = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editPrice, setEditPrice] = useState<string>("");
  const [editImage, setEditImage] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !description || !price || !image) return;
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, image }),
      });
      if (response.ok) {
        fetchProducts();
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct) return;
    try {
      const response = await fetch(`${API_URL}/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, description: editDescription, price: editPrice, image: editImage }),
      });
      if (response.ok) {
        fetchProducts();
        setEditingProduct(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Lỗi khi sửa sản phẩm:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
              if (response.ok) {
                Alert.alert("Thành công", "Sản phẩm đã được xóa!", [
                  { text: "OK", onPress: () => fetchProducts() },
                ]);
              }
            } catch (error) {
              console.error("Lỗi khi xóa sản phẩm:", error);
              Alert.alert("Lỗi", "Không thể xóa sản phẩm.");
            }
          },
        },
      ]
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LIST COFFEE BEANS</Text>
<TextInput style={styles.input} placeholder="Tên sản phẩm" value={name}  onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Mô tả" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Giá" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="URL hình ảnh" value={image} onChangeText={setImage} />

      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Thêm</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productText}>{item.name} - {item.price}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                        setEditingProduct(item);
                        setEditName(item.name);
                        setEditDescription(item.description);
                        setEditPrice(item.price);
                        setEditImage(item.image);
                        setModalVisible(true);
                    }}
                  >
                    <Text style={styles.buttonText}>Sửa</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProduct(item.id)}>
                    <Text style={styles.buttonText}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}

        <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Chỉnh sửa sản phẩm</Text>
                <TextInput style={styles.input} placeholder="Tên sản phẩm" value={editName} onChangeText={setEditName} />
                <TextInput style={styles.input} placeholder="Mô tả" value={editDescription} onChangeText={setEditDescription} />
                <TextInput style={styles.input} placeholder="Giá" value={editPrice} onChangeText={setEditPrice} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="URL hình ảnh" value={editImage} onChangeText={setEditImage} />
                <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.editButton} onPress={handleEditProduct}>
                    <Text style={styles.buttonText}>Cập nhật</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>
                </View>
            </View>
            </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff", marginTop: 30 },
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContent: { width: "80%", backgroundColor: "#fff", padding: 20, borderRadius: 10, alignItems: "center" },
    modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    cancelButton: { backgroundColor: "gray", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 },
    title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, width: "99%"},
    button: { backgroundColor: "blue", padding: 10, borderRadius: 5, alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold", padding: 5, borderRadius: 5 },
    productItem: { padding: 10, borderBottomWidth: 1, flexDirection: "row", alignItems: "center" },
    productImage: { width: 50, height: 50, marginRight: 10 },
    productInfo: { flex: 1 },
    productText: { fontSize: 16, fontWeight: "bold" },
    productDescription: { fontSize: 14, color: "gray" },
    buttonGroup: { flexDirection: "row" },
    editButton: { backgroundColor: "orange", padding: 5, marginRight: 5 },
    deleteButton: { backgroundColor: "red", padding: 5 },
    labal: { 
      fontSize: 12,
      fontWeight: "bold",
      textAlign: "center",
      },
  });

export default CoffeeBeans;