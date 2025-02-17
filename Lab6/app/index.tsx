import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, Button, Modal, Alert, ActivityIndicator } from "react-native";
import api from "../api"; 

export default function Bai1() {
  type ContactType = {
    id: string;
    name: string;
    avatar: string;
    dob: string;
  };

  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState<ContactType | null>(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [avatar, setAvatar] = useState("");

  // Gọi API lấy danh sách user
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users");
      setContacts(response.data);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lấy dữ liệu từ API");
    } finally {
      setLoading(false);
    }
  };

  // Thêm liên hệ mới
  const handleAddContact = async () => {
    try {
      const newContact = { name, dob, avatar };
      const response = await api.post("/users", newContact);
      setContacts([...contacts, response.data]);
      setModalVisible(false);
      resetForm();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể thêm liên hệ");
    }
  };

  // Chỉnh sửa liên hệ
  const handleEditContact = async () => {
    if (!currentContact) return;

    try {
      const updatedContact = { name, dob, avatar };
      await api.put(`/users/${currentContact.id}`, updatedContact);
      setContacts(contacts.map(contact => (contact.id === currentContact.id ? { ...contact, ...updatedContact } : contact)));
      setModalVisible(false);
      resetForm();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật liên hệ");
    }
  };

  // Xóa liên hệ
  const handleDeleteContact = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      Alert.alert("Lỗi", "Không thể xóa liên hệ");
    }
  };

  // Hiển thị hộp thoại xác nhận xóa
  const confirmDeleteContact = (id: string) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa liên hệ này không?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", style: "destructive", onPress: () => handleDeleteContact(id) },
      ],
      { cancelable: true }
    );
  };

  const resetForm = () => {
    setName("");
    setDob("");
    setAvatar("");
    setCurrentContact(null);
  };

  const openEditModal = (contact: ContactType) => {
    setCurrentContact(contact);
    setName(contact.name);
    setDob(contact.dob);
    setAvatar(contact.avatar);
    setModalVisible(true);
  };

  const ContactItem = ({ item }: { item: ContactType }) => (
    <View style={styles.contactContainer}>
      <Image source={{ uri: item.avatar }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.position}>Ngày sinh: {new Date(item.dob).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity style={styles.callButton} onPress={() => openEditModal(item)}>
        <Text style={styles.callText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteContact(item.id)}>
        <Text style={styles.callText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Danh Bạ</Text>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <FlatList data={contacts} renderItem={({ item }) => <ContactItem item={item} />} keyExtractor={(item) => item.id} />
        )}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalWindow}>
            <Text style={styles.modalTitle}>{currentContact ? "Edit Contact" : "Add Contact"}</Text>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="DOB (YYYY-MM-DD)" value={dob} onChangeText={setDob} />
            <TextInput style={styles.input} placeholder="Avatar URL" value={avatar} onChangeText={setAvatar} />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title={currentContact ? "Save" : "Add"} onPress={currentContact ? handleEditContact : handleAddContact} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#f8f8f8", 
    marginBottom: 30 
  },
  title: { 
    textAlign: "center", 
    fontSize: 30, 
    fontWeight: "900", 
    marginTop: 30 
  },
  container: { 
    padding: 16 
  },
  contactContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#fff", 
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 10, 
    elevation: 3 
  },
  image: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 12 
  },
  textContainer: { 
    flex: 1 
  },
  name: { 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  position: { 
    fontSize: 14, 
    color: "gray" 
  },
  callButton: { 
    backgroundColor: "#007bff", 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 6, 
    marginRight: 10 
  },
  deleteButton: { 
    backgroundColor: "#dc3545", 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 6 
  },
  callText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
  addButton: { 
    position: "absolute", 
    bottom: 20, right: 20,
    backgroundColor: "#007bff", 
    width: 50, height: 50, 
    borderRadius: 25, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  addButtonText: { 
    color: "#fff", 
    fontSize: 24, 
    fontWeight: "bold" 
  },
  modalOverlay: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(0, 0, 0, 0.5)" 
  },
  modalWindow: { 
    width: "80%", 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    padding: 20 
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center" 
  },
  input: { 
    height: 40, 
    borderColor: "#ccc", 
    borderWidth: 1, 
    borderRadius: 6, 
    paddingHorizontal: 10, 
    marginBottom: 16 
  },
  modalButtons: { 
    flexDirection: "row", 
    justifyContent: "space-around" 
  },
});
