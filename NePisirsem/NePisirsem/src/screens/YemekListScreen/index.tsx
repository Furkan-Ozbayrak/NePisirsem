import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { db } from '../../../assets/FireBase/FireStore';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const YemekListScreen = () => {
  const [recipes, setRecipes] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigation = useNavigation();


  const fetchAndCompareRecipes = async () => {
    setIsLoading(true); 
    try {

      const basketSnapshot = await getDocs(collection(db, 'SepettekiUrunler'));
      const basketItems = basketSnapshot.docs.map((doc) => doc.data().name); 
    
      
      const recipesSnapshot = await getDocs(collection(db, 'YemekTarifi'));
      const recipeData = recipesSnapshot.docs.map((doc) => {
        const gerekenMalzemeler = doc.data().gerekenMalzemeler;

        const normalizedIngredients = Array.isArray(gerekenMalzemeler) ? gerekenMalzemeler : [];
        return {
          id: doc.id,
          yemekName: doc.data().name, 
          gerekenMalzemeler: normalizedIngredients,
        };
      });


      const results = recipeData.map((recipe) => {
        const matchedIngredients = recipe.gerekenMalzemeler.filter((item: string) =>
          basketItems.includes(item) 
        ); 

       
        return {
          ...recipe,
          similarity: matchedIngredients.length / recipe.gerekenMalzemeler.length, 
          matchedIngredients, 
        };
      });


      results.sort((a, b) => b.similarity - a.similarity);

   
      setRecipes(results);
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchAndCompareRecipes();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {isLoading ? (
        <Text style={styles.loadingText}>Yükleniyor...</Text> 
      ) : recipes.length === 0 ? (
        <Text style={styles.noResultsText}>Henüz tarif bulunamadı.</Text> 
      ) : (
        recipes.map((recipe, index) => (
            <TouchableOpacity 
            key={recipe.id} 
            style={styles.recipeContainer}
            onPress={() => {
 
              navigation.navigate('Yemekdetayları', { yemekName: recipe.yemekName });
            }}
          >
            <Text style={styles.recipeTitle}>{`${index + 1}. ${recipe.yemekName}`}</Text>
            <Text style={styles.recipeDetails}>
              Elimizdeki Malzemeler: {recipe.matchedIngredients.join(', ')}
            </Text>
            <Text style={styles.recipeDetails}>
              Gereken Malzemeler: {recipe.gerekenMalzemeler.join(', ')}
            </Text>
          </TouchableOpacity>
          
        ))
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  recipeContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});

export default YemekListScreen;
