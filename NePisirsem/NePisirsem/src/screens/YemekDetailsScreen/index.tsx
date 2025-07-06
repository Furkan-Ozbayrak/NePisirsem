import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { db } from '../../../assets/FireBase/FireStore';
import { collection, query, where, getDocs } from 'firebase/firestore';

const YemekDetailsScreen: React.FC = () => {
  const route = useRoute(); 
  const { yemekName } = route.params as { yemekName: string }; 

  const [recipe, setRecipe] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
      
        const recipeQuery = query(
          collection(db, 'DetaylıYemekTarifi'),
          where('YemekName', '==', yemekName)
        );
        const querySnapshot = await getDocs(recipeQuery);

        if (!querySnapshot.empty) {
          const recipeData = querySnapshot.docs[0].data();
          setRecipe(recipeData);
        } else {
          console.log('Yemek bulunamadı.');
          setRecipe(null);
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [yemekName]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5C3EBC" />
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.notFoundText}>Tarif bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.recipeTitle}>{recipe.YemekName}</Text>
      {recipe.Image && (
        <Image style={styles.recipeImage} source={{ uri: recipe.Image }} />
      )}
      <Text style={styles.sectionTitle}>Tarif Adımları:</Text>
      <Text style={styles.details}>{recipe.Detay}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  recipeImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  notFoundText: {
    fontSize: 18,
    color: '#FF0000',
    fontWeight: 'bold',
  },
});

export default YemekDetailsScreen;
