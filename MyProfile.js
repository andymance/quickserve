import React, { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const Profile = ({ userProfile, onUpdate, onLogout }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(userProfile);

    const handleSave = () => {
        if (!profileData.firstName || !profileData.lastName || !profileData.email) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }
        onUpdate(profileData);
        setIsEditing(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: profileData.profilePicture }} style={styles.avatar} />
            {isEditing ? (
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={profileData.firstName}
                        onChangeText={(text) => setProfileData({ ...profileData, firstName: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={profileData.lastName}
                        onChangeText={(text) => setProfileData({ ...profileData, lastName: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={profileData.email}
                        onChangeText={(text) => setProfileData({ ...profileData, email: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contact Number"
                        value={profileData.contactNumber}
                        onChangeText={(text) => setProfileData({ ...profileData, contactNumber: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={profileData.address}
                        onChangeText={(text) => setProfileData({ ...profileData, address: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Profile Picture URL"
                        value={profileData.profilePicture}
                        onChangeText={(text) => setProfileData({ ...profileData, profilePicture: text })}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.profileContainer}>
                    <Text style={styles.title}>Profile Information</Text>
                    <Text>First Name: {profileData.firstName}</Text>
                    <Text>Last Name: {profileData.lastName}</Text>
                    <Text>Email: {profileData.email}</Text>
                    <Text>Contact Number: {profileData.contactNumber}</Text>
                    <Text>Address: {profileData.address}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
    },
    profileContainer: {
        alignItems: 'flex-start',
        width: '100%',
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        height: 50,
        borderRadius: 10,
        marginBottom: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        width: '100%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    editButton: {
        backgroundColor: '#FFA500',
        width: '100%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        width: '100%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});