import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Detail from "./detail";
import DetailBeans from "./beans"
import CartScreen from "./cart";
import FavoritesScreen from "./favourite";
import OrderHistoryScreen from "./order";
import { router } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const ICONS_MENU = {
  Home: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png", 
  Cart: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png", 
  Favorites: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
  Order: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
};

const type = [
  { name: "All" },
  { name: "Cappuccino" },
  { name: "Espresso" },
  { name: "Americano" },
  { name: "Macchiato" },
];

const ManChinh = () => {
  const [coffeeData, setCoffeeData] = useState([]);
  const [beanData, setBeanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBean, setSelectedBean] = useState<Product | null>(null);

  interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCoffee = await fetch("http://10.24.50.243:3000/product");
        const resBeans = await fetch("http://10.24.50.243:3000/productBeans");
        const coffeeJson = await resCoffee.json();
        const beansJson = await resBeans.json();
        setCoffeeData(coffeeJson);
        setBeanData(beansJson);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (selectedProduct) {
    return <Detail productId={selectedProduct.id} onGoBack={() => setSelectedProduct(null)} />;
  }
  if (selectedBean) {
    return <DetailBeans productId={selectedBean.id} onGoBack={() => setSelectedBean(null)} />;
  }
  const handleAddToCart = async (item: Product) => {
    if (!item) return;
  
    try {
      const response = await fetch("http://10.24.50.243:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,  // Sửa lỗi 'id' chưa được khai báo
          name: item.name,
          image: item.image,
          price: item.price,
          size: "M",  // Mặc định size M nếu chưa chọn
          quantity: 1,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Thêm vào giỏ hàng thành công!");
      } else {
        alert(`Lỗi: ${data.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  
  const renderItem1 = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelectedProduct(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
          <Ionicons name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  const renderItem2 = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelectedBean(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
          <Ionicons name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
  

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.header} onPress={() => router.push('/setting')}>
          <Image style={{ width: 40, height: 40 }} source={require('@/assets/images/Menu.png')} />
          <Ionicons name="person-circle-outline" size={35} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Find the best coffee for you</Text>
        <View style={styles.searchContainer}>
          <Image style={styles.searchIcon} source={require('@/assets/images/search-normal.png')} />
          <TextInput style={styles.searchInput} placeholder="Find Your Coffee..." placeholderTextColor="#aaa" />
        </View>
        <FlatList data={type} renderItem={({ item }) => <Text style={styles.title}>{item.name}</Text>} horizontal keyExtractor={(item) => item.name} />
        <FlatList data={coffeeData} renderItem={renderItem1} horizontal keyExtractor={(item) => item.id} />
        <Text style={styles.sectionTitle}>Coffee beans</Text>
        <FlatList data={beanData} renderItem={renderItem2} horizontal keyExtractor={(item) => item.id} />
      </View>
    </SafeAreaView>
  );
};
const main = () => {
  
  return(
    
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6C22',
        tabBarLabelStyle: {flexDirection: 'row'},
        tabBarStyle: { backgroundColor: "#1E1E1E" },
      }}
      >
      <Tab.Screen 
        name = "Home"
        component={ManChinh}
        options={{
          tabBarIcon: props => RenderIcon(ICONS_MENU.Home, props),
          tabBarLabel: props => RenderLabal(props)
        }}
      />
      <Tab.Screen 
        name = "Cart"
        component={CartScreen}
        options={{
          tabBarIcon: props => RenderIcon(ICONS_MENU.Cart, props),
          tabBarLabel: props => RenderLabal(props)
        }}
      />
      <Tab.Screen 
        name = "Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: props => RenderIcon(ICONS_MENU.Favorites, props),
          tabBarLabel: props => RenderLabal(props)
        }}
      />
      <Tab.Screen 
        name = "History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: props => RenderIcon(ICONS_MENU.Order, props),
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

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#1e1e1e",
    flex: 1,
  },
  container: {
    backgroundColor: "#1e1e1e",
    padding: 15,
  },
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#aaa",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#2a2a2a",
    borderRadius: 10,
    marginRight: 16,
    padding: 10,
    width: 150,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 5,
  },
  description: {
    fontSize: 12,
    color: "#aaa",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#ff7f50",
    borderRadius: 5,
    padding: 5,
  },
  labal: { 
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default main;
