import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { db } from '../../../assets/FireBase/FireStore';
import { collection, query, where, getDocs } from 'firebase/firestore';

const YemekDeScreens: React.FC = () => {
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
        setRecipe(null);
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
        <Text style={styles.loadingText}>Yükleniyor...</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Ne Pişirsem</Text>
      </View>
      
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
    backgroundColor: '#F9F9F9',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 100, 
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#5C3EBC',
    marginTop: 10,
  },
  recipeTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
  },
  recipeImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    marginBottom: 15,
  },
  details: {
    fontSize: 18,
    color: '#555',
    lineHeight: 25,
    letterSpacing: 0.5,
    marginBottom: 40,
  },
  notFoundText: {
    fontSize: 18,
    color: '#FF4D4D',
    fontWeight: 'bold',
  },
});

export default YemekDeScreens;
