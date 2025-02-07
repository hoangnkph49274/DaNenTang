import React, { useState } from 'react';
import { StyleSheet, Platform, ScrollView, StatusBar, Text, RefreshControl } from 'react-native';

export default function TabTwoScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [barStyle, setBarStyle] = useState<'light-content' | 'dark-content'>('dark-content');

  const onRefresh = () => {
    setRefreshing(true);
    setBarStyle(prevStyle => (prevStyle === 'dark-content' ? 'light-content' : 'dark-content'));

    setTimeout(() => {
      setRefreshing(false);
    }, 1500); 
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <StatusBar barStyle={barStyle} translucent backgroundColor="transparent" />
      <Text style={styles.text}>Kéo xuống để đổi màu StatusBar</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84fba6',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
