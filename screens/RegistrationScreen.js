import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { registerUser } from '../MyUtils/MyDB';



const RegistrationScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const showAlert = (title, message, success = false) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setIsSuccess(success);
        setAlertVisible(true);
    };

    const handleContinue = async () => {
        const emailPattern = /^[0-9]{7}@ub\.edu\.ph$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!name || !email || !password || !department) {
            showAlert('Missing Information', 'Please fill in all fields.');
            return;
        }

        if (!emailPattern.test(email)) {
            showAlert('Invalid Email', 'Please use your valid UB email (7-digit student number@ub.edu.ph).');
            return;
        }

        if (!passwordPattern.test(password)) {
            showAlert('Invalid Password', 'Password must be at least 8 characters long and contain:\n- One uppercase letter\n- One lowercase letter\n- One number');
            return;
        }

        try {
            const response = await registerUser(name, email, password, department);
            console.log(response.data);
            if (response.success) {
                showAlert('Registration Successful', response.message, true);
            } else {
                showAlert('Registration Failed: ' + response.message);
            }
        } catch (error) {
            showAlert('Registration Failed', 'An error occurred while creating your account. Please try again later.');
            console.log(error);
        }
    };



    const handleAlertClose = () => {
        setAlertVisible(false);
        if (isSuccess) {
            navigation.navigate('Welcome, UBians!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.modal}>
                <Text style={styles.title}>Registration</Text>
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                />
                <TextInput
                    placeholder="UBMail"
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Department"
                    style={styles.input}
                    onChangeText={(text) => setDepartment(text.toUpperCase())}
                    value={department}
                    autoCapitalize="characters"
                />
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Welcome, UBians!')}
                >
                    <Text style={styles.backButtonText}>Back to Login</Text>
                </TouchableOpacity>
            </View>

            {/* Custom Alert Modal */}
            <Modal
                visible={alertVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.alertContainer}>
                        <Text style={styles.alertTitle}>{alertTitle}</Text>
                        <Text style={styles.alertMessage}>{alertMessage}</Text>
                        <TouchableOpacity
                            style={styles.alertButton}
                            onPress={handleAlertClose}
                        >
                            <Text style={styles.alertButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8DC'
    },
    modal: {
        width: '80%',
        padding: 20,
        backgroundColor: '#FFA500',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#800000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#800000',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
    },
    button: {
        backgroundColor: '#800000',
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        minWidth: 100,
    },
    buttonText: {
        color: '#FFA500',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#800000',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertContainer: {
        backgroundColor: '#FFA500',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxWidth: 300,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#800000',
    },
    alertTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#800000',
        marginBottom: 10,
        textAlign: 'center',
    },
    alertMessage: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 20,
        textAlign: 'center',
    },
    alertButton: {
        backgroundColor: '#800000',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    alertButtonText: {
        color: '#FFA500',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegistrationScreen;