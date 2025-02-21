import React, { useState, useRef } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const layout = Dimensions.get("window");

const FavoriteScreen = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>Màn hình Yêu Thích</Text>
  </View>
);

const PopularScreen = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>Màn hình Phổ Biến</Text>
  </View>
);

const LiveScreen = () => (
  <View style={styles.scene}>
    <Text style={styles.text}>Màn hình Trực Tiếp</Text>
  </View>
);

const renderScene = SceneMap({
  favorite: FavoriteScreen,
  popular: PopularScreen,
  live: LiveScreen,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicatorStyle} 
    style={styles.tabBar} 
    labelStyle={styles.labelStyle} 
  />
);

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "favorite", title: "YÊU THÍCH" },
    { key: "popular", title: "PHỔ BIẾN" },
    { key: "live", title: "TRỰC TIẾP" },
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

const styles = StyleSheet.create({
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
});

export default App;
