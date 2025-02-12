import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HoiAnScreen() {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={'rgba(0, 0, 0, 0)'} />
      <ImageBackground
        style={styles.background}
        source={require('@/assets/images/hoian.jpg')}
        resizeMode="cover"
      >
        <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
        <View style={styles.overlay}>
            <Text style={styles.title}>PHỐ CỔ HỘI AN</Text>
            <View style={styles.rank}>
                <MaterialIcons name="star" size={24} color="yellow" />
                <Text style={styles.ratingText}>5.0</Text>
            </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.heartIcon} onPress={() => setIsFavorite(!isFavorite)}>
                <Ionicons
                name={isFavorite ? "heart" : "heart-outline"} 
                size={30}
                color={isFavorite ? "red" : "#000"} 
                />
            </TouchableOpacity>
          </View>
          
        </View>
      </ImageBackground>

      <View style={styles.body}>
        <Text style={styles.location}><Ionicons name="location-sharp" size={26} color="blue" /> Quảng Nam</Text>
        <Text style={styles.sectionTitle}>Thông tin chuyến đi</Text>
        <Text style={styles.description} numberOfLines={6} ellipsizeMode='tail'>
          Hội An là một thành phố trực thuộc tỉnh Quảng Nam, Việt Nam. Phố cổ Hội An từng là một thương cảng quốc tế sầm uất, được UNESCO công nhận là di sản văn hóa thế giới từ năm 1999. Hội An nổi tiếng với những ngôi nhà cổ kiến trúc đặc sắc…
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>$100<Text style={styles.perDay}>/Ngày</Text></Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đặt ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 7,
  },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    },
  iconButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",

    },
  overlay: {
    height: 200,
    marginTop: 400,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
  },
  headerIcons: {
    position: 'absolute',
    top: 70,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5
  },
  rank: {
    marginLeft: 120,
    flexDirection: 'row',
  },
  ratingText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  heartIcon: {
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 225)',
    padding: 15,
    borderRadius: 50,
    zIndex: 10,
    elevation: 5
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold'
  },
  body: {
    flex: 3,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  location: {
    color: 'blue',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 24
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 5,
    
  },
  description: {
    color: '#666',
    fontSize: 16
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    backgroundColor: '#04488f',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  },
  perDay: {
    fontWeight: 'normal',
    fontSize: 14,
    color: '#fff'
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#',
    fontWeight: 'bold',
  }
});
