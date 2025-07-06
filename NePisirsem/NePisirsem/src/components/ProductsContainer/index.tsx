import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../../../assets/FireBase/FireStore';
import { collection, getDocs } from 'firebase/firestore';
import ProductItem from '../ProdectItem'; 

interface Product {
  id: string;
  Images: string;
  MalzemeIsmı: string;
  MalzemeTuru: string;
}

interface ProductsContainerProps {
  name: string;
}

const ProductsContainer: React.FC<ProductsContainerProps> = ({ name }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'MalzemeIsımleri'));
        const productList: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          Images: doc.data().Images,
          MalzemeIsmı: doc.data().MalzemeIsmı,
          MalzemeTuru: doc.data().MalzemeTuru,
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Firestore'dan veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const matchedProducts = products.filter((product) =>
    product.MalzemeIsmı.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}></Text>
      ) : matchedProducts.length > 0 ? (
        <FlatList
          data={matchedProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductItem
              id={item.id}
              image={item.Images} 
              name={item.MalzemeIsmı} 
             
            />
          )}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <Text style={styles.noDataText}>
          Üzgünüz, "{name}" ile eşleşen bir ürün  bulunamadı.
        </Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  noDataText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: '#616161',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProductsContainer;
