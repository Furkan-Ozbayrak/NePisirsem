import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome } from '@expo/vector-icons';
import HomeNavigator from "./HomeNavigator"; 
import BasketScreen from "../screens/BasketScreen";
import  SearchScreen  from '../screens/SearchScreen';
import yemekDeScreens from '../screens/yemekDeScreens';

const Tab = createBottomTabNavigator();

function RootNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="AnaSayfa"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#DB5F00",
        tabBarInactiveTintColor: "#959595",
        headerShown: false,
        tabBarStyle: {
          height: 40,
        },
      }}
    >
      <Tab.Screen
        name="AnaSayfa"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-basket" size={24} color={color} />
          ),
        }}
      />
    <Tab.Screen
  name="yemekDeScreens"
  component={yemekDeScreens}
  options={{
    tabBarButton: () => null, 
    headerShown: false, 
  }}
/>
      
    </Tab.Navigator>
  );
}

export default RootNavigator;
