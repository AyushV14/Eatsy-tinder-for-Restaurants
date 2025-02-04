import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/context/theme.context'
import useUserData from '@/hooks/useUserData'
import { LinearGradient } from 'expo-linear-gradient'
import { IsAndroid, IsHaveNotch, IsIPAD } from '@/theme/app.constants'
import {moderateScale, verticalScale , } from 'react-native-size-matters'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {}

const WelcomHeader = (props: Props) => {
    const {theme} = useTheme()
    const { userData: dbUser, isLoading } = useUserData();
    const insets = useSafeAreaInsets();
    
  return (
    <LinearGradient
        colors={
            theme.dark
            ? ["#3c43485c","#3c43485c","#3c43485c"]
            : ["#75ABFC","#0047AB"]
        }
        start={theme.dark ? {x:1, y:1}:{x:1, y:1} }
        end={theme.dark ? {x:0, y:1}:{x:0, y:1} }
        style={[
            styles.headerWrapper,
            {
                paddingTop: insets.top,
            }
            
        ]}
    >
      
    </LinearGradient>
  )
}

export default WelcomHeader

const styles = StyleSheet.create({
    headerWrapper:{
        height: (IsHaveNotch
        ? IsIPAD ? verticalScale(175) : verticalScale(155)
        : IsAndroid ? verticalScale(168) : verticalScale(162)),
        paddingHorizontal: moderateScale(25),
        borderBottomLeftRadius:moderateScale(40),
        borderBottomRightRadius:moderateScale(40),
        paddingTop: IsAndroid ? verticalScale(10) : verticalScale(0), 

        
    }
})