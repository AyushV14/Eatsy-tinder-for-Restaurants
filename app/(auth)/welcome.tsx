import { FlatList, StyleSheet, View, ViewToken } from 'react-native'
import React from 'react'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import RenderItem from '@/components/RenderItem'
import data, { OnboardingData } from '@/data/data'
import Pagination from '@/components/Pagination'
import CustomButton from '@/components/CustomButton'

const Index = () => {

  const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatlistIndex = useSharedValue(0);

  // On viewable items change, update the index
  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index !== undefined) {
      flatlistIndex.value = viewableItems[0].index;
    }
  }

  // Scroll handler to update x value based on scroll position
  const onscroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    }
  })

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatlistRef}
        onScroll={onscroll}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} x={x} />
        }}
        keyExtractor={item => String(item.id)}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} flatlistIndex={flatlistIndex} />
        <CustomButton
          flatlistRef={flatlistRef}
          flatlistIndex={flatlistIndex}
          dataLenght={data.length}
          x={x}
        />
      </View>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
})
