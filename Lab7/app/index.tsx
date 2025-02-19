import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, ImageBackground } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';


export type RootStackParamList = {
  Home: undefined;
  Details: { id: number; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const Bai1 = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
  );
};

const HomeScreen: FC<NativeStackScreenProps<RootStackParamList, "Home">> = ({ navigation }) => {
  const [name, setName] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Màn hình chính</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên của bạn"
        value={name}
        onChangeText={setName}
      />
      <Button
        title="Đi tới màn hình chi tiết"
        onPress={() => navigation.navigate("Details", { id: Math.floor(Math.random() * 1000), name })}
      />
    </SafeAreaView>
  );
};


const DetailsScreen: FC<NativeStackScreenProps<RootStackParamList, "Details">> = ({ route, navigation }) => {
  const { id, name } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Màn hình chi tiết</Text>
      <Text>ID: {id}</Text>
      <Text>Tên: {name}</Text>
      <Button title="Quay lại" onPress={() => navigation.goBack()} />
      <Button title="Reset về Home" onPress={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })} />
      <Button title="Pop 1 màn hình" onPress={() => navigation.pop()} />
      <Button title="Quay về Home (popToTop)" onPress={() => navigation.popToTop()} />
    </SafeAreaView>
  );
};

const ContactsScreen = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Màn hình Bài viết</Text>
    </SafeAreaView>
  );
  
  const ChatScreen = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Màn hình Tin nhắn</Text>
    </SafeAreaView>
  );
  
  const SettingScreen = () => (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Màn hình Cài đặt</Text>
    </SafeAreaView>
  );

  
  const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground 
          source={require('@/assets/images/backGroudDrawer.webp')} 
          style={{ alignItems: 'center',  paddingVertical: 20, width: '100%', height: 200 }}
        >
          <Image 
            source={{ uri: 'https://www.allthingswild.co.uk/wp-content/uploads/2022/01/capy-2-2.jpg' }} 
            style={styles.avatar} 
          />
          <Text style={styles.username}>Nguyễn Văn A</Text>
          <Text style={styles.email}>nguyenvana@gmail.com</Text>
        </ImageBackground>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </SafeAreaView>
    );
  };

const Bai2 = () => {
    return(
        <Drawer.Navigator 
          drawerContent={CustomDrawerContent}
          >
            
            <Drawer.Screen
                name="HomeDrawer"
                component={Bai1}
                options={{
                drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="home" size={size} color={color} />
                ),
                }}
            />
            <Drawer.Screen
                name="Article"
                component={ContactsScreen}
                options={{
                drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="article" size={size} color={color} />
                ),
                }}
            />
            <Drawer.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="chat" size={size} color={color} />
                ),
                }}
            />
            <Drawer.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                drawerIcon: ({ color, size }) => (
                    <MaterialIcons name="settings" size={size} color={color} />
                ),
                }}
            />
        </Drawer.Navigator>
    );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 16 
    },
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10 
    },
  input: { 
    width: "80%", 
    borderWidth: 1, 
    padding: 8, 
    marginBottom: 10,
    borderRadius: 5 
    },
  avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 20,
    },
  username: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  email: {
      fontSize: 14,
      color: '#888',
    },
});

export default Bai2;
