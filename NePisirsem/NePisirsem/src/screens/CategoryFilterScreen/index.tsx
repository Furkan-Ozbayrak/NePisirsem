import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import CategoryFiltering from '../../components/CategoryFiltering';

function CategoryFilterScreen() {
  const route = useRoute(); 
  const { category } = route.params as { category: string }; 

  const data = [
    {
      id: '1',
      component: <CategoryFiltering category={category} />, 
    },
  ];

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <View style={styles.item}>{item.component}</View>}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
  },
});

export default CategoryFilterScreen;
