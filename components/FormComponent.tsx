import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import LottieView from 'lottie-react-native';

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

    return (
        <View style={styles.modal}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Complete Your Profile</Text>

                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter your username"
                    placeholderTextColor="#888"
                />

                <Text style={styles.label}>Choose Avatar</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.avatarContainer}>
                    {avatars.map((avatar) => (
                        <TouchableOpacity
                            key={avatar.id}
                            onPress={() => setSelectedAvatar(avatar.source)}
                            style={[styles.avatarWrapper, selectedAvatar === avatar.source && styles.selectedAvatar]}
                        >
                            <LottieView source={avatar.source} style={styles.avatar} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={styles.label}>Location</Text>
                <TouchableOpacity style={styles.dropdownButton} onPress={() => setDropdownVisible(!dropdownVisible)}>
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
                    onPress={() => {
                        // Log the values when the button is pressed
                        console.log('Username:', username);
                        console.log('Selected Avatar:', selectedAvatar);
                        console.log('Selected City:', selectedCity);
                    }}
                >
                    <Text style={styles.submitText}>Save Profile</Text>
                </TouchableOpacity>

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
});
