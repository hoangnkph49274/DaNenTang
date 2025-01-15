import {  Image, Platform } from 'react-native';

import React,{useState} from "react";
import { Button,ScrollView, StyleSheet, TextInput, View } from "react-native";
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const handleClear = () => {
    setName('');       
    setPhone('');      
    setPassword('');   
  };
  return(
    <ScrollView>
        <View style={styles.container}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nhập họ tên"
            style={styles.tipStyle}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            style={styles.tipStyle}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Nhập mật khẩu"
            secureTextEntry={true}
            style={styles.tipStyle}
          />
          <Button title="Đăng ký"  onPress={handleClear}/>
        </View>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: 700,
    width: 400,
    alignSelf: 'center',
    marginTop: 40,
  },
  tipStyle: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  }
});


