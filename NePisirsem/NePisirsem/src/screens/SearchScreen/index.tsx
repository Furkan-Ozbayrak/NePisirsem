import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../../assets/FireBase/FireStore'; 
import { collection, getDocs } from 'firebase/firestore'; 
import { useNavigation } from '@react-navigation/native'; 

// Tarif türünü tanımlayın
type Recipe = {
  Detay: string;      
  Image: string;    
  YemekName: string;  

};


const SearchScreen = () => {
  const [queryText, setQueryText] = useState<string>(''); 
  const [results, setResults] = useState<Recipe[]>([]); 
  const [error, setError] = useState<string | null>(null); 

  const navigation = useNavigation(); 


  const handleSearch = async () => {
    setError(null); 
  
    if (queryText.trim() === '') {
      setResults([]);
      setError('Lütfen bir yemek adı girin.');
      return;
    }
  
    const lowerCaseQuery = queryText.toLowerCase(); 
  
    try {
      const querySnapshot = await getDocs(collection(db, 'DetaylıYemekTarifi'));
  
      const data: Recipe[] = querySnapshot.docs.map(doc => doc.data() as Recipe);
  
      
      const filteredResults = data.filter(item =>
        item.YemekName.toLowerCase().includes(lowerCaseQuery) 
      );
  
      if (filteredResults.length === 0) {
        setError('Malesef uygun yemek tarifi bulunamadı.');
      } else {
        setResults(filteredResults); 
      }
    } catch (error) {
      console.error('Firebase sorgu hatası:', error);
      setError('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };


  const handleRecipePress = (item: Recipe) => {
    if (!item.YemekName) {
      console.error('YemekName parametresi eksik!');
      return;
    }
  
    try {
  
      setQueryText('');
      setResults([]);
  

      navigation.navigate('yemekDeScreens', { yemekName: item.YemekName });
    } catch (error) {
      console.error('Navigation Error:', error);
    }
  };
  ;
  return (
    <View style={styles.container}>
       <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Ne Pişirsem</Text>
          </View>
        
      <TextInput
        placeholder="Yemek adı ara..."
        value={queryText}
        onChangeText={setQueryText} 
        style={styles.input}
      />
      
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Ara</Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>} 
      
      <FlatList
  data={results}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.recipeName}>{item.YemekName}</Text> 
      
      <TouchableOpacity onPress={() => handleRecipePress(item)}>
        <Image
          source={{ uri: item.Image }}
          style={styles.recipeImage}
        />
      </TouchableOpacity> 
    </View>
  )}
/>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 100, 
    paddingHorizontal: 20, 
  },
  input: {
    borderColor: '#CCCCCC', 
    borderWidth: 1,
    borderRadius: 8, 
    padding: 12,
    marginBottom: 10,
    backgroundColor: 'white', 
    fontSize: 16,
  },
  errorText: {
    color: '#FF5A5F', 
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8, 
    backgroundColor: 'white', 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, 
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333', 
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  searchButton: {
    backgroundColor: '#DB5F00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#DB5F00', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, 
    shadowColor: '#000', 
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, 
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});


export default SearchScreen;
