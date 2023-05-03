import React, { Fragment, useState, useRef } from 'react'
import { View, Text, Image, Pressable, Dimensions, FlatList, } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import AppHeader from '../AppHeader/AppHeader'
import { data, banners } from '../Data'

const HomeScreen = () => {
  const [activeDot, setActiveDot] = useState(1)
  const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');



  return (
    <Fragment>
      <FocusAwareStatusBar backgroundColor={'#8ab4f8'} />
      <AppHeader style={{ backgroundColor: '#8ab4f8', }}>
        <View style={{ flexGrow: 1 }} />
        <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }}>Home</Text>
        <View style={{ flexGrow: 1 }} />
      </AppHeader>

      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <FlatList
          // contentContainerStyle={{ paddingTop: headerHeight / 2 }}
          ListHeaderComponent={() => {
            return (
              <Fragment>
                <Carousel
                  data={banners}
                  renderItem={({ item, index }) => {
                    return (
                      <Fragment>
                        <Pressable key={index} style={{ height: 200, width: '100%', borderRadius: 10, overflow: 'hidden', paddingHorizontal: 15 }}>
                          <Image source={{ uri: item.image }} resizeMode='stretch' style={{ height: '100%', borderRadius: 10 }} />
                        </Pressable>
                      </Fragment>
                    )
                  }}

                  sliderWidth={viewportWidth}
                  itemWidth={viewportWidth}
                  hasParallaxImages={false}
                  firstItem={1}
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                  // inactiveSlideShift={20}
                  containerCustomStyle={{
                    marginTop: 15,
                    overflow: 'visible'
                  }}
                  contentContainerCustomStyle={{ paddingVertical: 10 }}
                  loop={false}
                  loopClonesPerSide={2}
                  autoplay={false}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => { setActiveDot(index) }}
                />
                <View>
                  <Pagination
                    dotsLength={banners?.length}
                    activeDotIndex={activeDot}
                    containerStyle={{ paddingVertical: 0, paddingBottom: 15 }}
                    dotColor={'#475AD7'}
                    dotStyle={{ width: 15, height: 15, borderRadius: 50, }}
                    inactiveDotColor={'#F3F4F6'}
                    inactiveDotOpacity={30}
                  // inactiveDotScale={2}
                  />
                </View>
              </Fragment>
            )
          }}

          viewabilityConfig={{}}
          onEndReachedThreshold={0.10}
          onEndReached={() => console.log('click')}
          initialNumToRender={5}
          numColumns={2}
          ItemSeparatorComponent={() => (<View style={{ height: 15 }} />)}
          data={banners}
          renderItem={({ item, index }) => {

            return (
              <Animatable.View animation='slideInUp' delay={300} style={{ paddingHorizontal: 15, width: '50%' }}>
                <Pressable style={{ backgroundColor: '#8ab4f8', height: 190, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, overflow: 'hidden', }}>
                  <Image source={{ uri: item?.image }} resizeMode='stretch' style={{ width: '100%', height: '100%' }} />
                </Pressable>
                <Text style={{ color: '#8ab4f8', fontSize: 14, fontFamily: 'OpenSans-SemiBold', }}>{item?.name}</Text>
              </Animatable.View>
            )
          }}
          keyExtractor={(item) => item?.id}
        />

      </View>
    </Fragment>
  )
}

export default HomeScreen;

