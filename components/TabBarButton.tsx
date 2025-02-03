import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { icon } from '@/constants/icon';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = {
    onPress:((event: GestureResponderEvent) => void) | null | undefined;
    onLongPress:((event: GestureResponderEvent) => void) | null | undefined;
    isFocused:boolean
    routeName:string;
    color:string;
    label:any;
}   


const TabBarButton = ({onPress,onLongPress,isFocused,routeName,color,label}: Props) => {


    const scale = useSharedValue(0);

    useEffect(()=>{
        scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1: 0) : isFocused ,
        {duration:350}
    )
    },[scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(()=>{
        const scaleValue = interpolate(scale.value , [0,1], [1,1.2]);
        const top = interpolate( scale.value , [0,1],[0,9])
        return{
            transform:[{
                scale: scaleValue
            }],
            top: top
        }
    })

    const animatedTextStyle = useAnimatedStyle(() =>{
        const opacity = interpolate(scale.value, [0,1] , [1,0])
        return {
            opacity
        }
    })


  return (
    <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
    >   
    <Animated.View style={animatedIconStyle}>
        {icon[routeName]({
                  color: isFocused ? "#FFF" : '#222'
        })}
    </Animated.View>
        <Animated.Text style={[animatedTextStyle,{ color: isFocused ? '#FFF' : '#222' , fontSize: 12}]}>
          {label}
        </Animated.Text>
    </Pressable>
  )
}

export default TabBarButton

const styles = StyleSheet.create({
    tabBarItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:5,
    }
})