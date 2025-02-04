import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import FormComponent from '@/components/FormComponent'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import HomeScreen from '@/components/HomeScreen'

const Home = () => {
  const { user, isLoaded: clerkLoaded } = useUser();
  const { signOut } = useAuth()
  const router = useRouter()
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    if (!user) {
      router.replace('/(auth)/sign-in');
    }
  }, [user, router]);

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/sign-in'); 
  }

  const dbUser = useQuery(api.user.getUserByEmail, 
    userEmail ? { email: userEmail } : 'skip'
  );

  if (!clerkLoaded || dbUser === undefined) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }


  if (!dbUser) {
    return (
      <SafeAreaView style={styles.container}>
        <FormComponent />
      </SafeAreaView>
    );
  }

  // Main render
  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'bottom']}>
      <HomeScreen />
      {/* <View style={styles.content} >
        <Text style={styles.greetingText}>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Text style={styles.signOutbtn} onPress={handleSignOut}>SignOut</Text>
      </View> */}
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    height:'100%'
  },
})
