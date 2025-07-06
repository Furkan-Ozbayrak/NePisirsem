import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface ProductItemProps {
  id: string;
  name: string;
  image: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ id, name, image }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('BasketDetails', { product: { id, name, image } })
      }
    >
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.iconContainer}>
          <Entypo name="plus" size={20} color="#fff" />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, 
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: width * 0.4,
    borderRadius: 12,
    overflow: 'hidden', 
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f2f2f2',
  },
  textContainer: {
    marginTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
  },
  iconContainer: {
    position: 'absolute',
    top: 0, 
    right: 0,
    backgroundColor: '#DB8000',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default ProductItem;
