import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';
import { db } from '../../../assets/FireBase/FireStore';
import { collection, getDocs } from 'firebase/firestore';
import ProductsContainer from '../ProductsContainer';

interface CategoryFilterProps {
  category: string;
}

const { height, width } = Dimensions.get('window');


const CategoryBox = ({
  active,
  item,
  onPress,
}: {
  active: string;
  item: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress} 
      style={[
        styles.categoryBox,
        item === active && styles.activeCategoryBox, 
      ]}
    >
      <Text style={styles.categoryText}>{item}</Text>
    </Pressable>
  );
};

function CategoryFilter({ category }: CategoryFilterProps): JSX.Element {
 
  const [malzemeTurleri, setMalzemeTurleri] = useState<string[]>([]); 
  const [activeCategory, setActiveCategory] = useState<string>(category || ''); 
  const [malzemeler, setMalzemeler] = useState<any[]>([]); 

  useEffect(() => {
    const fetchMalzemeTurleri = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'MalzemeIsımleri'));
        const turler: string[] = [];
        const malzemeListesi: any[] = [];

        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          malzemeListesi.push({
            MalzemeTuru: data.MalzemeTuru,
            MalzemeIsmı: data.MalzemeIsmı,
            Images: data.Images || '', 
          });

          if (data.MalzemeTuru) {
            turler.push(data.MalzemeTuru);
          }
        });

       
        const uniqueTurler = Array.from(new Set(turler));

        setMalzemeTurleri(uniqueTurler); 

        
        if (category && uniqueTurler.includes(category)) {
          setActiveCategory(category);
        } else {
          setActiveCategory(uniqueTurler[0] || ''); 
        }

        setMalzemeler(malzemeListesi); 
      } catch (error) {
        console.error('Veri çekme hatası: ', error);
      }
    };

    fetchMalzemeTurleri();
  }, [category]);


  const filteredMalzemeler = malzemeler.filter(
    (item) => item.MalzemeTuru === activeCategory
  );


  const renderMalzemeItem = ({ item }: { item: any }) => (
    <ProductsContainer name={item.MalzemeIsmı} />
  );

  return (
    <View style={{ flex: 1 }}>
  
      <FlatList
        style={styles.FlatList}
        data={malzemeTurleri}
        renderItem={({ item }) => (
          <CategoryBox
            key={item}
            item={item}
            active={activeCategory}
            onPress={() => setActiveCategory(item)} 
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item} 
      />

      {filteredMalzemeler.length > 0 ? (
        <FlatList
          style={styles.malzemeList}
          data={filteredMalzemeler}
          renderItem={renderMalzemeItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} 
        />
      ) : (
        <Text style={styles.noDataText}></Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  FlatList: {
    width: '100%',
    backgroundColor: '#DB8000',
    height: height * 0.065,
  },
  categoryBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  activeCategoryBox: {
    borderBottomColor: 'red',
    borderBottomWidth: 2.5,
  },
  categoryText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  malzemeList: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  noDataText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CategoryFilter;
