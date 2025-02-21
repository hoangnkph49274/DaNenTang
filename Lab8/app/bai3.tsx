import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Dimensions, SafeAreaView, Image, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';


const Tab = createBottomTabNavigator();
const ICONS_MENU = {
  Home: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
  Contacts: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
  Chat: "https://cdn-icons-png.flaticon.com/512/783/783117.png",
  Settings: "https://cdn-icons-png.flaticon.com/512/3524/3524638.png",
};
const ICONS_TOP_TAB = {
  favorite: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  popular: "https://cdn-icons-png.flaticon.com/512/1077/1077035.png",
  live: "https://cdn-icons-png.flaticon.com/512/2491/2491373.png",
};

const layout = Dimensions.get("window");

const FavoriteScreen = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>Màn hình Cho Bạn</Text>
  </View>
);

const PopularScreen = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>Màn hình Trực tiếp</Text>
  </View>
);

const LiveScreen = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>Màn hình Trò chơi</Text>
  </View>
);

const renderScene = SceneMap({
  favorite: FavoriteScreen,
  popular: PopularScreen,
  live: LiveScreen,
});

// Custom hiển thị của tabBar
const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle} 
    style={styles.tabBar} 
    renderLabel={({ route, focused }: { route: { key: string; title: string }, focused: boolean }) => (
      <View style={styles.tabItem}>
        <Image
            source={{ uri: ICONS_TOP_TAB[route.key as keyof typeof ICONS_TOP_TAB] }}
            style={[
              styles.icon,
              { tintColor: focused ? "#fff" : "#ddd" },
            ]}
            onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
          />
        <Text style={[styles.labelStyle, { color: focused ? "#fff" : "#ddd" }]}>
          {route.title}
        </Text>
      </View>
    )}
  />
);  

const Bai3 = () => {
  return(
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6C22',
        tabBarActiveBackgroundColor: "blue",
        tabBarLabelPosition: 'beside-icon'
      }}
      >
      <Tab.Screen 
        name = "Home"
        component={TopTabsScreen}
        options={{
          tabBarIcon: props => RenderIcon(ICONS_MENU.Home, props),
          tabBarLabel: props => RenderLabal(props),
          
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

const TopTabsScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "favorite", title: "Cho Bạn" },
    { key: "popular", title: "Trực Tiếp" },
    { key: "live", title: "Trò Chơi" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      
    />
  );
};

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
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  tabBar: {
    backgroundColor: "#FF6C22", 
    },
  labelStyle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white", 
    },
  indicatorStyle: {
    backgroundColor: "white", 
    height: 3,
    },
  tabItem: {
      flexDirection: "row",
      alignItems: "center",
    },
  icon: {
      width: 20,
      height: 20,
      marginRight: 5,
    },
});

export default Bai3;
