import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import anaSayfaVeri from '../../../../assets/anaSayfaVeri'
import { Category } from '../../../models'
import CategoryItem from '../../../components/CategoryItem'


function index() {
    const [categories, setCategories] = useState<Category[]>(anaSayfaVeri)
    return (
        <View>
            <View style={ styles.listContainer}>
                {

                    categories.map((item) => (

                        <CategoryItem key={item.id} item={item} />

                    ))

                }

            </View>

        </View>
    )
    
}
const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "white",
        width: "100%",
    },


});
export default index
