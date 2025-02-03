import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, interpolateColor, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    index: number;
    x:SharedValue<number>;
}

const Dot = ({index, x}: Props) => {

    const {width: SCREEN_WIDTH} = useWindowDimensions();

    const animatedDotStyle = useAnimatedStyle(()=>{
        const widthANimation = interpolate(
            x.value,
            [
                (index - 1)* SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
            ],
            [10,20,10],
            Extrapolate.CLAMP
        );
        const opacityANimation = interpolate(
            x.value,
            [
                (index - 1)* SCREEN_WIDTH,
                index * SCREEN_WIDTH,
                (index + 1) * SCREEN_WIDTH
            ],
            [0.5,1,0.5],
            Extrapolate.CLAMP
        );
        return{
            width: widthANimation,
            opacity:opacityANimation
        }
    })

    const animatedColor = useAnimatedStyle(()=>{
        const backgroundCOlor = interpolateColor(
            x.value,
            [0,SCREEN_WIDTH, 2* SCREEN_WIDTH],
            ['#005b4f','#1e2169','#f15937' ]
        );
        return{
            backgroundColor:backgroundCOlor
        }
    })

  return   <Animated.View style={[styles.dotContainer, animatedDotStyle , animatedColor]}/>
}

export default Dot

const styles = StyleSheet.create({
    dotContainer:{
        height:10,
        marginHorizontal: 10,
        borderRadius:5
    }
})