import React from 'react'
import HeaderMain from "../../components/HeaderMain"
import MainCategories from "../../components/CategoryItem/MainCategories"
import { ScrollView } from 'react-native'
import BannerCarousel from "../../components/BannerCarousel"

 function HomeScreens() {
  return (
    <ScrollView stickyHeaderIndices={[0]}>
       <HeaderMain/>
       <BannerCarousel/>
       
        <MainCategories />
      

    </ScrollView>
      )
}
export default HomeScreens