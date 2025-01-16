import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  BackHandler,
  Alert,
  Image,
} from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (modalVisible) {
        Alert.alert(
          'Thông báo',
          'Bạn đã tắt modal bằng nút back của thiết bị',
          [
            {
              text: 'OK',
              onPress: () => setModalVisible(false),
            },
          ],
        );
        return true; 
      }
      return false; 
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); 
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <Button
        title="Hiển thị Modal"
        onPress={() => setModalVisible(true)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert(
            'Thông báo',
            'Bạn đã tắt modal bằng nút back của thiết bị',
            [
              {
                text: 'OK',
                onPress: () => setModalVisible(false),
              },
            ],
          );
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Đây là nội dung của Modal</Text>
            <Image style={styles.containerImg}
              source={{
              uri: 'https://mediacms.thethaovanhoa.vn/Upload/qPf4BjfjvkrFearu8hrw/files/2020/12/NKK_1620.jpg',
              }}
             />
            <Button
              title="Ẩn Modal"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  containerImg: {
    width: '95%',
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    margin: 10,
  },
});

export default App;
