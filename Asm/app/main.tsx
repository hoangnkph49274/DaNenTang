import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useColorScheme,
  SafeAreaView,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { HapticTab } from "@/components/HapticTab";
import BlurTabBarBackground from "@/components/ui/TabBarBackground.ios";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Detail from "./detail";

const type = [{name: 'All'},{name:'Cappuccino'},{name:'Espresso'},{name:'Americano'},{name:'Macchiato'}]
const coffeeData = [
  {
    id: "1",
    name: "Cappuccino",
    description: "With Steamed Milk",
    price: "$4.20",
    rating: 4.5,
    image: require('@/assets/images/capuchino1.jpg'),
  },
  {
    id: "2",
    name: "Cappuccino",
    description: "With Foam",
    price: "$4.20",
    rating: 4.2,
    image: require('@/assets/images/capuchino2.jpg'),
  },
  {
    id: "3",
    name: "Cappuccino",
    description: "With Foam",
    price: "$4.20",
    rating: 4.2,
    image: require('@/assets/images/capuchino2.jpg'),
  },
];

const beanData = [
  {
    id: "1",
    name: "Robusta Beans",
    description: "Medium Roasted",
    price: "$4.20",
    image: require('../assets/images/hat1.jpg'),
  },
  {
    id: "2",
    name: "Cappuccino",
    description: "With Steamed Milk",
    price: "$4.20",
    image: require('@/assets/images/hat2.jpg'),
  },
  {
    id: "3",
    name: "Cappuccino",
    description: "With Steamed Milk",
    price: "$4.20",
    image:require('@/assets/images/hat2.jpg'),
  },
];

const ManChinh = () => {
  console.log('ManChinh component render'); // Log để kiểm tra số lần render
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (selectedProduct) {
    console.log('Returning early with selectedProduct'); // Log để debug return sớm
    return <Detail product={selectedProduct} onGoBack={() => setSelectedProduct(null)} />;
  }

  console.log('Rendering main UI');
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} onPress={()=> setSelectedProduct(item)}>
      <Image source={ item.image } style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.row}>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  const typeItem = ({ item }: any) => {
    return (
      <TouchableOpacity>
        <Text style={[styles.title , {paddingLeft: 20, fontSize: 18, }]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
      <View style={styles.header}>
        <Image style={{width:40,height:40}}
        source={require('@/assets/images/Menu.png')} />
        <Ionicons name="person-circle-outline" size={35} color="#fff" />
      </View><Text style={styles.headerText}>Find the best coffee for you</Text>
      <View style={styles.searchContainer}>
        <Image
            style={styles.searchIcon}
            source={require('@/assets/images/search-normal.png')}
        />
        <TextInput
            style={styles.searchInput}
            placeholder="Find Your Coffee..."
            placeholderTextColor="#aaa"
        />
    </View>
      <FlatList
        data={type}
        renderItem={typeItem}
        horizontal
        keyExtractor={(item) => item.name}
        style={styles.horizontalList}
      />
      <FlatList
        data={coffeeData}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.id}
        style={styles.horizontalList}
      />
      <Text style={styles.sectionTitle}>Coffee beans</Text>
      <FlatList
        data={beanData}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.id}
        style={styles.horizontalList}
      />
      <View style={{flexDirection: 'row',}}>
        <TouchableOpacity>
            <Image
            source={require("../assets/images/home.png")} 
            style={{width: 30, height: 30,marginLeft:20}}
            />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image
            source={require("../assets/images/bag-2.png")} 
            style={{width: 30, height: 30,marginLeft:70}}
            />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image
            source={require("../assets/images/heart.png")} 
            style={{width: 30, height: 30,marginLeft:70}}
            />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image
            source={require("../assets/images/notification.png")} 
            style={{width: 30, height: 30,marginLeft:70, }}
            />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView:{
    backgroundColor: "#1e1e1e",
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: "stretch", 
  },
  container: {
    backgroundColor: "#1e1e1e",
    paddingHorizontal: 16,
    marginTop: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#aaa', // Đổi màu ảnh nếu cần
    marginRight: 10,   // Khoảng cách giữa ảnh và TextInput
  },
  searchInput: {
    flex: 1, // Lấp đầy phần còn lại
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  horizontalList: {
    marginBottom: 10,
  },
  typeList: {
    
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
});

export default ManChinh;