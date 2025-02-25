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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingScreen from "./setting";
import CoffeeBeans from "./coffeebeans"
import { router } from "expo-router";

const Tab = createBottomTabNavigator();
const ICONS_MENU = {
    Coffe: "https://cdn-icons-png.flaticon.com/512/2935/2935413.png", 
    CoffeeBeans: "https://cdn-icons-png.flaticon.com/512/2843/2843882.png",
    Settings: "https://cdn-icons-png.flaticon.com/512/2099/2099058.png", 
  };
  
const API_URL = "http://10.24.50.243:3000/product";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

const AdminProductScreen = () => {
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
    if (!name || !description || !price || !image) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, image }),
      });
  
      if (response.ok) {
        reset();
        await fetchProducts();
  
        Alert.alert("Thành công", "Sản phẩm đã được thêm!");
      } else {
        throw new Error("Thêm sản phẩm thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm.");
    }
  };
  const reset = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImage("");

  }
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
      <Text style={styles.title}>LIST COFFEE</Text>

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

const Admin = () => {
    return(
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FF6C22',
          tabBarLabelStyle: {flexDirection: 'row'}
        }}
        >
        <Tab.Screen 
          name = "Coffee"
          component={AdminProductScreen}
          options={{
            tabBarIcon: props => RenderIcon(ICONS_MENU.Coffe, props),
            tabBarLabel: props => RenderLabal(props)
          }}
        />
        <Tab.Screen 
          name = "Coffee beans"
          component={CoffeeBeans}
          options={{
            tabBarIcon: props => RenderIcon(ICONS_MENU.CoffeeBeans, props),
            tabBarLabel: props => RenderLabal(props)
          }}
        />
        <Tab.Screen 
          name = "Setting"
          component={Setting}
          options={{
            tabBarIcon: props => RenderIcon(ICONS_MENU.Settings, props),
            tabBarLabel: props => RenderLabal(props)
          }}
        />
      </Tab.Navigator>
    );
  }
  
  const RenderLabal = ( props: {
    focused: boolean,
    color: string,
    children: string
  }) => 
    props.focused ? (
      <Text style={[styles.labal,{color: props.color}]}>{props.children}</Text>
  ):null;
  
  const RenderIcon = ( 
    icon: string,
    props: {
      focused: boolean,
      color: string,
      size: number
  }) => (
      <Image source={{uri: icon}} tintColor={props.color} height={16} width={16}/>
  )

const Setting = () => {
    const logout = () => {
          try {
            Alert.alert('Thông báo', 'Bạn muốn đăng xuất', [
              {
                text: 'Không',
                style: 'cancel',
              },
      
              {
                text: 'Có',
                onPress: () => {
                  router.push("/login")
                },
              },
            ]);
          } catch (error) {
            Alert.alert("error");
          }
        };
    return(
        <View style={{flex: 1}}>
            <View style={{marginTop:40}}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: "center"}}>Setting</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: "gray", marginVertical: 10 }} />
                <View style={styles.bgr}>
                    <View style={styles.bgr1}>
                    <Image style={styles.img} source={require('../assets/images/logout.png')} />
                        <TouchableOpacity onPress={logout}>
                            <Text style={styles.txt}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff", 
    marginTop: 30 
},
  modalContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(0,0,0,0.5)" 
},
  modalContent: { 
    width: "80%", 
    backgroundColor: "#fff", 
    padding: 20, 
    borderRadius: 10, 
    alignItems: "center" 
},
  modalTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10 
},
  cancelButton: { 
    backgroundColor: "gray", 
    padding: 10, 
    borderRadius: 5,
    alignItems: "center", 
    marginTop: 10 
},
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 10 
},
  input: { 
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5, 
    width: "99%"
},
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
    bgr: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'space-between',
      },
      bgr1: {
        flexDirection: 'row',
        marginLeft: 20,
      },
      txt: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 20,
      },
      img: {
        height: 30,
        width: 30,
        marginRight: 30,
      },
});

export default Admin;
