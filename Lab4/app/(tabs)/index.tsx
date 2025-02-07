import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";

export default function bai1() {
  type ContactType = {
    name: string;
    email: string;
    position: string;
    photo: string;
  }
  const data = [
    {
      name: "Hoang",
      email: "hoang@gmail.com",
      position: "Giam doc",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Hoan",
      email: "hoan@gmail.com",
      position: "Nhan vien",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Hoa",
      email: "hoa@gmail.com",
      position: "IT",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Ho",
      email: "ho@gmail.com",
      position: "Ke toan",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Nam",
      email: "nam@gmail.com",
      position: "Bao ve",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Hoang1",
      email: "hoa1ng@gmail.com",
      position: "Giam doc",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Hoan1",
      email: "ho11an@gmail.com",
      position: "Nhan vien",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Hoa1",
      email: "ho11a@gmail.com",
      position: "IT",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Ho1",
      email: "ho11@gmail.com",
      position: "Ke toan",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Nam1",
      email: "nam11@gmail.com",
      position: "Bao ve",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Hoang2",
      email: "hoang2@gmail.com",
      position: "Giam doc",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Hoan2",
      email: "hoan3@gmail.com",
      position: "Nhan vien",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Hoa2",
      email: "hoa4@gmail.com",
      position: "IT",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Ho2",
      email: "ho5@gmail.com",
      position: "Ke toan",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
    {
      name: "Nam2",
      email: "nam5@gmail.com",
      position: "Bao ve",
      photo: "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    },
  ];

  const ContactItem = ({ item }: { item: ContactType }) => (
    <View style={styles.contactContainer}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.position}>{item.position}</Text>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Text style={styles.callText}>Call</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
        <Text style={{textAlign: "center", fontSize: 30, fontWeight: 900, marginTop: 30}}>Danh Bạ</Text>
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({ item }) => <ContactItem item={item} />}
            keyExtractor={(item) => item.email}
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  container: {
    padding: 16,
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  position: {
    fontSize: 14,
    color: "gray",
  },
  callButton: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  callText: {
    color: "#fff",
    fontWeight: "bold",
  },
});