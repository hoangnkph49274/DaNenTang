import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TextInput, Button, Modal, Alert } from "react-native";

export default function Bai1() {
  type ContactType = {
    name: string;
    email: string;
    position: string;
    photo: string;
  };

  const names = ["Hoang", "Hieu", "Hung", "Phuong", "Tuan"];
  const positions = ["Dev", "Tester", "SM"];
  const photos = [
    "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9eDR87r3p64w_TkB2yGvWzwxYWfx9QvWuA&s",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hydrochoeris_hydrochaeris_in_Brazil_in_Petr%C3%B3polis%2C_Rio_de_Janeiro%2C_Brazil_09.jpg/640px-Hydrochoeris_hydrochaeris_in_Brazil_in_Petr%C3%B3polis%2C_Rio_de_Janeiro%2C_Brazil_09.jpg",
  ];

  const getRandomItem = (array: any[]) => array[Math.floor(Math.random() * array.length)];

  const initialData = Array.from({ length: 10 }, (_, index) => ({
    name: getRandomItem(names),
    email: `user${index + 1}@gmail.com`,
    position: getRandomItem(positions),
    photo: getRandomItem(photos),
  }));

  const [contacts, setContacts] = useState<ContactType[]>(initialData);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentContact, setCurrentContact] = useState<ContactType | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [photo, setPhoto] = useState("");

  const handleAddContact = () => {
    const newContact = {
      name,
      email,
      position,
      photo,
    };
    setContacts([...contacts, newContact]);
    setModalVisible(false);
    resetForm();
  };

  const handleEditContact = () => {
    if (currentContact) {
      const updatedContacts = contacts.map((contact) =>
        contact.email === currentContact.email ? { ...contact, name, email, position, photo } : contact
      );
      setContacts(updatedContacts);
      setModalVisible(false);
      resetForm();
    }
  };

  const handleDeleteContact = (email: string) => {
    const updatedContacts = contacts.filter((contact) => contact.email !== email);
    setContacts(updatedContacts);
  };

  const confirmDeleteContact = (email: string) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa liên hệ này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => handleDeleteContact(email),
        },
      ],
      { cancelable: true }
    );
  };
  const resetForm = () => {
    setName("");
    setEmail("");
    setPosition("");
    setPhoto("");
    setCurrentContact(null);
  };

  const openEditModal = (contact: ContactType) => {
    setCurrentContact(contact);
    setName(contact.name);
    setEmail(contact.email);
    setPosition(contact.position);
    setPhoto(contact.photo);
    setModalVisible(true);
  };

  const ContactItem = ({ item }: { item: ContactType }) => (
    <View style={styles.contactContainer}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.position}>{item.position}</Text>
      </View>
      <TouchableOpacity style={styles.callButton} onPress={() => openEditModal(item)}>
        <Text style={styles.callText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteContact(item.email)}>
        <Text style={styles.callText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "900", marginTop: 30 }}>Danh Bạ</Text>
      <View style={styles.container}>
        <FlatList
          data={contacts}
          renderItem={({ item }) => <ContactItem item={item} />}
          keyExtractor={(item) => item.email}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalWindow}>
            <Text style={styles.modalTitle}>{currentContact ? "Edit Contact" : "Add Contact"}</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Position"
              value={position}
              onChangeText={setPosition}
            />
            <TextInput
              style={styles.input}
              placeholder="Photo URL"
              value={photo}
              onChangeText={setPhoto}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button
                title={currentContact ? "Save" : "Add"}
                onPress={currentContact ? handleEditContact : handleAddContact}
              />
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
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  callText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalWindow: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});