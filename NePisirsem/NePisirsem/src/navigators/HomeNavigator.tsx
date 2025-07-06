import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, StyleSheet, View } from 'react-native';
import HomeScreen from "../screens/HomeScreens";
import CategoryFilterScreen from "../screens/CategoryFilterScreen";
import YemekListScreen from "../screens/YemekListScreen";
import BasketDetailsScreen from "../screens/BasketDetailsScreen";
import YemekDetailsScreen from "../screens/YemekDetailsScreen";
import yemekDeScreens from '../screens/yemekDeScreens';

const Stack = createStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: { backgroundColor: "#DB5F00", height: 60 },
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Ne Pişirsem</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CategoryDetails"
        component={CategoryFilterScreen}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: "#DB5F00", height: 60 },
          headerTitle: () => (
            <Text style={styles.headerText}>
              Elimizdeki Ürünlerin Listesi
            </Text>
          ),
          headerTitleAlign: 'center', 
        }}
      />
      <Stack.Screen
        name="BasketDetails"
        component={BasketDetailsScreen}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: "#DB5F00", height: 60 },
          headerTitle: () => (
            <Text style={styles.headerText}>
              Ürün Listesi
            </Text>
          ),
          headerTitleAlign: 'center', 
        }}
        
      />
    
      <Stack.Screen
        name="YemekList"
        component={YemekListScreen}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: "#DB5F00", height: 60 },
          headerTitle: () => (
            <Text style={styles.headerText}>
              Önerilen Yemekler
            </Text>
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Yemekdetayları"
        component={YemekDetailsScreen}
        options={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: "#DB5F00", height: 60 },
          headerTitle: () => (
            <Text style={styles.headerText}>
              Yemek Detayları
            </Text>
          ),
          headerTitleAlign: 'center', 
        }}
      />
  <Stack.Screen
    name="yemekDeScreens"
    component={yemekDeScreens}
    options={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: "#DB5F00", height: 60 },
      headerTitle: () => (
        <Text style={styles.headerText}>Yemek Detayları Listesi</Text>
      ),
      headerTitleAlign: 'center',
    }}
  />  

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
});

export default HomeNavigator;
