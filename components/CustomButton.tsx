import { FlatList, Image, StyleSheet, Text, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Animated, { AnimatedRef, interpolateColor, SharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { OnboardingData } from '@/data/data';
import { Redirect, useRouter } from 'expo-router';

type Props = {
    dataLenght : number;
    flatlistIndex: SharedValue<number>;
    flatlistRef: AnimatedRef<FlatList<OnboardingData>>;
    x:SharedValue<number>;
}

const CustomButton = ({dataLenght, flatlistIndex, flatlistRef ,x}: Props) => {

    const {width: SCREEN_WIDTH} =useWindowDimensions();
    const router = useRouter()

    const buttonAnimationStyle = useAnimatedStyle(()=>{
        return{
            width: flatlistIndex.value === dataLenght - 1 
                ? withSpring(140)
                : withSpring(60),
            height:60,
        }
    });

    const arrowAnimationStyle = useAnimatedStyle(()=>{
        return{
            width:30,
            height:30,
            opacity: flatlistIndex.value === dataLenght -1 ? withTiming(0) : withTiming(1),
            transform:[
                {
                    translateX: flatlistIndex.value === dataLenght -1
                    ? withTiming(100)
                    : withTiming(0)
                }
            ]
        }
    });

    const textAnimationStyle = useAnimatedStyle(()=>{
        return {
            opacity : flatlistIndex.value === dataLenght - 1
            ? withTiming(1)
            : withTiming(0),
            transform:[
                {
                    translateX: flatlistIndex.value === dataLenght - 1
                                ? withTiming(0)
                                : withTiming(-100)
                }
            ]
        }
    })

    
    const animatedColor = useAnimatedStyle(()=>{
        const backgroundColor = interpolateColor(
            x.value,
            [0,SCREEN_WIDTH, 2* SCREEN_WIDTH],
            ['#005b4f','#1e2169','#f15937']
        );
        return{
            backgroundColor: backgroundColor
        }
    });


  return (
    <TouchableWithoutFeedback 
        onPress={()=>{
            if(flatlistIndex.value < dataLenght -1){
                flatlistRef.current?.scrollToIndex({index:flatlistIndex.value+1})
            }else {
                router.replace('/(auth)/sign-in')
                
            }
        }}
    >
      <Animated.View style={[styles.container, animatedColor , buttonAnimationStyle]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>Get Started</Animated.Text>
        <Animated.Image source={require('@/assets/images/ArrowIcon.png')}
        style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        padding:10,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        width:60,
        height:60,
    },
    arrow:{
        position:'absolute',
        width:30,
        height:30,
    },
    textButton:{
        color: 'white',
        fontSize:18,
        fontWeight:'700',
        position:'absolute'
    }
})