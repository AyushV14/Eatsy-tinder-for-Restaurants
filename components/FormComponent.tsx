import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import { useUser } from '@clerk/clerk-expo';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

type Props = {}

const avatars = [
    { id: 1, source: require('@/assets/animations/avatar1.json') },
    { id: 2, source: require('@/assets/animations/avatar2.json') },
    { id: 3, source: require('@/assets/animations/avatar3.json') },
    { id: 4, source: require('@/assets/animations/avatar4.json') },
];

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];

const FormComponent = (props: Props) => {
    const [username, setUsername] = useState<string>('');
    const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const {user} = useUser()
    const createUser = useMutation(api.user.createUser);

    

    const handleSubmit = async () => {
        setErrorMessage('');
        
        if (!username.trim() || !selectedAvatar || !selectedCity) {
          setErrorMessage('All fields are required');
          return;
        }
        
        if (!user?.primaryEmailAddress?.emailAddress) {
          setErrorMessage('Email is required');
          return;
        }
    
        try {
          await createUser({
            name: user.firstName || username,
            userName: username,
            email: user.primaryEmailAddress.emailAddress,
            location: selectedCity,
            avatar: selectedAvatar,
          });
          // Optional: Add success handling here
          console.log('User created successfully!');
        } catch (error) {
          console.error('Error creating user:', error);
          setErrorMessage('Failed to save profile. Please try again.');
        }
      };

    return (
        <View style={styles.modal}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Complete Your Profile</Text>

                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={(text) => {
                        setUsername(text);
                        setErrorMessage('');
                    }}
                    placeholder="Enter your username"
                    placeholderTextColor="#888"
                />

                <Text style={styles.label}>Choose Avatar</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.avatarContainer}>
                    {avatars.map((avatar) => (
                        <TouchableOpacity
                            key={avatar.id}
                            onPress={() => {
                                setSelectedAvatar(avatar.id);
                                setErrorMessage('');
                            }}
                            style={[styles.avatarWrapper, selectedAvatar === avatar.id && styles.selectedAvatar]}
                        >
                            <LottieView source={avatar.source} style={styles.avatar} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={styles.label}>Location</Text>
                <TouchableOpacity 
                    style={styles.dropdownButton} 
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                    <Text style={styles.dropdownText}>
                        {selectedCity ? selectedCity : 'Select a city'}
                    </Text>
                </TouchableOpacity>

                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <FlatList
                            data={cities}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setSelectedCity(item);
                                        setDropdownVisible(false);
                                        setErrorMessage('');
                                    }}
                                >
                                    <Text style={styles.dropdownItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitText}>Save Profile</Text>
                </TouchableOpacity>

                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
            </View>
        </View>
    );
};

export default FormComponent;
const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: 0,
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 80
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#444',
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
    },
    avatarContainer: {
        gap: 1,
        paddingBottom: 10,
        marginBottom: 20,
    },
    avatarWrapper: {
        borderRadius: 30,
        padding: 0,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedAvatar: {
        borderColor: '#3b82f6',
    },
    avatar: {
        width: 90,
        height: 80,
        borderRadius: 30,
    },
    submitButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    submitText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dropdownButton: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        justifyContent: 'center',
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 10,
        // borderWidth:1,
        padding:5,
        elevation: 5,
        position: 'absolute',
        top: 370,
        left:50,
        width: '100%',
        maxHeight: 150,
        overflow: 'hidden',
        zIndex: 1000,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
});
