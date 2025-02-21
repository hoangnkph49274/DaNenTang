import React from "react";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const ICONS_MENU = {
  Home: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
  Contacts: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
  Chat: "https://cdn-icons-png.flaticon.com/512/783/783117.png",
  Settings: "https://cdn-icons-png.flaticon.com/512/3524/3524638.png",
};

const Bai1 = () => {
  
  return(
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6C22',
        tabBarLabelStyle: {flexDirection: 'row'}
      }}
      >
      <Tab.Screen 
        name = "Home"
        component={Home}
        options={{
          tabBarIcon: props => RenderIcon(ICONS_MENU.Home, props),
          tabBarLabel: props => RenderLabal(props)
        }}
      />
      <Tab.Screen 
        name = "Contact"
        component={ContactsScreen}
        options={{
          tabBarIcon: props => RenderIcon(ICONS_MENU.Contacts, props),
          tabBarLabel: props => RenderLabal(props)
        }}
      />
      <Tab.Screen 
        name = "Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: props => RenderIcon(ICONS_MENU.Chat, props),
          tabBarLabel: props => RenderLabal(props)
        }}
      />
      <Tab.Screen 
        name = "Setting"
        component={SettingScreen}
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

const Home = () => {
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Màn hình Trang Chủ</Text>
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
  labal: { 
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    },
});

export default Bai1;