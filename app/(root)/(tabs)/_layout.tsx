import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar'

const TabLayout = () => {
  return (
    <Tabs tabBar={props => <TabBar {...props}/>}>
        <Tabs.Screen name='index' options={{ headerShown: false }} />
        <Tabs.Screen name='explore' options={{ headerShown: false }} />
        <Tabs.Screen name='profile' options={{ headerShown: false }} />
    </Tabs>
  )
}

export default TabLayout