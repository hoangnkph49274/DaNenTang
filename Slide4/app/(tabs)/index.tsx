import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from "react-native";

const ViewComponent = () => {
  return (
    <View
      style={{
        backgroundColor: 'blue',
        height: 200,
        width: 400,
        alignSelf: 'center',
        marginTop: 50,
      }}
    >
      <TextComponent />
    </View>
  );
};

export const TextComponent = () => {
  return (
    <SafeAreaView>
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.container}>
        {/* Line 1 */}
        <Text style={styles.baseText}>
          Em vào đời bằng{' '}
          <Text style={[styles.boldText, { color: 'red' }]}>vàng đỏ</Text>
          {' '}anh vào đời bằng{' '}
          <Text style={[styles.boldText, { color: 'yellow' }]}>nước trà</Text>
          {'\n'}
          {'\n'}
          Bằng cơn mưa thơm{' '}
          <Text style={[styles.boldText, { color: 'white',fontSize:26 }]}>mùi đất</Text>  và{' '}
          <Text style={[styles.baseText, { color: 'white',fontSize:16 }]}>bằng hoa dại mọc trước nhà</Text> {'\n'} {'\n'}
          <Text style={[styles.baseText, { color: 'gray' }]}>Em vào đời bằng kế hoạch anh vào đời bằng mộng mơ</Text>{'\n'} {'\n'}
          Lý trí em là{' '}
          <Text style={[styles.boldText, { color: 'white',textDecorationLine:"underline", letterSpacing: 25}]}> công cụ </Text>  còn trái tim anh là{' '}
          <Text style={[styles.boldText, { color: 'white',textDecorationLine:"underline", letterSpacing: 25}]}> động cơ </Text> {'\n'} {'\n'}
          <View style={{ flex: 1, width: '100%' }}>
            <Text style={[styles.baseText, { textAlign: "right" }]}>
              Em vào đời nhiều đồng nghiệp anh vào đời nhiều thân tình {'\n'} {'\n'}
            </Text>
            <Text style={[styles.baseText, { textAlign: "center", color: 'orange' }]}>
              Anh chỉ muốn chân mình đạp đất không muốn đạp ai dưới chân mình
            </Text>
           
          </View>
           {'\n'} {'\n'}
           <Text style={[styles.boldText, { color: 'black' }]}>
              Em vào đời bằng
            </Text>{' '}
            <Text style={[styles.boldText, { color: 'white' }]}>
              mây trắng
            </Text>{' '}
            <Text style={[styles.boldText, { color: 'black' }]}>
              em vào đời bằng 
            </Text>{' '}
            <Text style={[styles.boldText, { color: 'yellow' }]}>
              nắng xanh
            </Text>  {'\n'} {'\n'}
            <Text style={[styles.boldText, { color: 'black' }]}>
              Em vào đời bằng
            </Text>{' '}
            <Text style={[styles.boldText, { color: 'yellow' }]}>
              đại lộ
            </Text>{' '}
            <Text style={[styles.boldText, { color: 'black' }]}>
              và con đường đó giờ
            </Text>{' '}
            <Text style={[styles.boldText, { color: 'white' }]}>
              vắng anh
            </Text> 
              {'\n'} {'\n'}
        </Text>
        
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'blue',
    height: 700,
    width: 400,
    alignSelf: 'center',
    marginTop: 10,
  },
  baseText: {
    fontSize: 20,
    color: 'white',
  },
  boldText: {
    fontWeight: 'bold',
  },
  
});

export default ViewComponent;
