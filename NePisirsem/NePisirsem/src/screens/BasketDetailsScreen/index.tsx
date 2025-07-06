import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { db } from '../../../assets/FireBase/FireStore';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../../components/Button';

const { width } = Dimensions.get('window');

interface ProductInfo {
  id?: string; 
  name: string;
  image: string;
}

interface BasketDetailsRouteParams {
  product: ProductInfo;
}

const BasketDetailsScreen = () => {
  const route = useRoute<RouteProp<{ BasketDetails: BasketDetailsRouteParams }, 'BasketDetails'>>();
  const [products, setProducts] = useState<ProductInfo[]>([]);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'SecilenItemler'));
    const fetchedProducts: ProductInfo[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const newProduct = { id: doc.id, name: data.name, image: data.image };

      if (!fetchedProducts.some((product) => product.name === newProduct.name)) {
        fetchedProducts.push(newProduct);
      }
    });
    setProducts(fetchedProducts);
  };

  const addProductToFirestore = async (product: ProductInfo) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'SecilenItemler'));
      let isProductExist = false;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.name === product.name) {
          isProductExist = true;
        }
      });

      if (!isProductExist) {
        const docRef = await addDoc(collection(db, 'SecilenItemler'), {
          name: product.name,
          image: product.image,
        });

        await addDoc(collection(db, 'SepettekiUrunler'), {
          name: product.name, 
        });

        setProducts((prevProducts) => [...prevProducts, { ...product, id: docRef.id }]);
      }
    } catch (error) {
      console.error('Veri gönderme hatası:', error);
    }
  };

  const deleteProductFromFirestore = async (productId: string, productName: string) => {
    try {
      await deleteDoc(doc(db, 'SecilenItemler', productId));
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));

      const q = query(collection(db, 'SepettekiUrunler'), where('name', '==', productName));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error('Ürün silme hatası:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
    }, [])
  );

  useEffect(() => {
    if (route.params?.product) {
      const { name, image } = route.params.product;
      addProductToFirestore({ name, image });
    }
  }, [route.params?.product]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.length === 0 ? (
        <Text style={styles.emptyMessage}>Henüz sepetinizde ürün bulunmamaktadır.</Text>
      ) : (
        products.map((product, index) => (
          <View key={index} style={styles.productContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <Image style={styles.productImage} source={{ uri: product.image }} />

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => deleteProductFromFirestore(product.id!, product.name)}
            >
              <Ionicons name="trash-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ))
      )}
      <Button />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#DB8000',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  productContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  productImage: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default BasketDetailsScreen;
