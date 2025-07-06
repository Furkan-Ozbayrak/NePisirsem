import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Image, Text, Dimensions, View } from 'react-native';
import { Category } from '../../models';

const { width, height } = Dimensions.get('window');

type CategoryItemProps = {
  item: Category;
};

function Index({ item }: CategoryItemProps) {
  const navigation = useNavigation();

  return (
    <View> 
     
      <View style={{ height: 10 }} />


      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CategoryDetails', { category: item.name }); 
        }}
        style={{
          width: width * 0.31,
          height: width * 0.31,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            width: width * 0.25,
            height: width * 0.25,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
     
            backgroundColor: '#fff', 
            
          }}
          source={{ uri: item.src }}
        />
        <Text
          style={{
            fontSize: 13,
            color: '#616161',
            fontWeight: '500',
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Index;
