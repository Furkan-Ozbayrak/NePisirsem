import React from 'react';
import { TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

function Button() {
  const navigation = useNavigation(); 

  return (
    <TouchableOpacity onPress={() => navigation.navigate("YemekList")}>
      <View style={{ marginTop: 40, width: '100%', height: height * 0.1 }}>
        <View
          style={{
            backgroundColor: '#DB5F00',
            height: height * 0.06,
            width: height * 0.4,
            marginHorizontal: '6%',
            borderRadius: 10,
            justifyContent: 'center', 
            alignItems: 'center', 
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>
            Yemek Arama
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Button;
