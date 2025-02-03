import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { OnboardingData } from '@/data/data'
import LottieView from 'lottie-react-native';
import Animated, { Extrapolate, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    item: OnboardingData;
    index:number;
    x: SharedValue<number>;
}

const RenderItem = ({item, index , x}: Props) => {

    const {width : SCREEN_WIDHT} = useWindowDimensions();
    const lottieAnimationStyle = useAnimatedStyle(()=>{
        const translateYAnimation = interpolate(
            x.value,
            [
                (index - 1)* SCREEN_WIDHT,
                index * SCREEN_WIDHT,
                (index + 1) * SCREEN_WIDHT
            ],
            [200,0,-200],
            Extrapolate.CLAMP,
        );
        return{
            transform:[{translateY: translateYAnimation}]
        }
    })

    const circleAnimation = useAnimatedStyle(()=>{
        const scale = interpolate(
            x.value,
            [
                (index - 1)* SCREEN_WIDHT,
                index * SCREEN_WIDHT,
                (index + 1) * SCREEN_WIDHT
            ],
            [1,4,4],
            Extrapolate.CLAMP,
        );
        return {
            transform: [{scale: scale}]
        }
    })

  return (
    <View style={[styles.itemContainer , {width: SCREEN_WIDHT}]}>
        <View style={styles.circleContainer}>
            <Animated.View 
                style={[{
                    width: SCREEN_WIDHT ,
                    height: SCREEN_WIDHT, 
                    backgroundColor: item.backgroundColor ,
                    borderRadius: SCREEN_WIDHT / 2
                },
                circleAnimation,
            ]}/>
        </View>
        <Animated.View style={lottieAnimationStyle}>
            <LottieView source={item.animation} 
            style={{width: SCREEN_WIDHT * 0.9 , height: SCREEN_WIDHT * 0.9}}
            autoPlay
            loop
            />
        </Animated.View>
      <Text style={[styles.itemText, {color: item.textColor}]}>{item.text}</Text>
    </View>
  )
}

export default RenderItem

const styles = StyleSheet.create({
    itemContainer:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center',
        marginBottom:128,
    },
    itemText:{
        textAlign:'center',
        fontSize: 37,
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    circleContainer:{
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent:'flex-end'
    }
})