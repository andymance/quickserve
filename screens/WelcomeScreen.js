import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, TextInput, Alert } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Footer from './Footer';
import { registerUser, loginUser } from '../MyUtils/MyDB';
import { validateEmail, validatePassword } from '../utils/validation';

const WelcomeScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Animation setup
    const wave1Animation = useRef(new Animated.Value(0)).current;
    const wave2Animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(wave1Animation, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.timing(wave2Animation, {
                toValue: 1,
                duration: 5000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const wave1TranslateX = wave1Animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-1500, 0],
    });

    const wave2TranslateX = wave2Animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -1500],
    });

    const validateForm = () => {
        const newErrors = {};

        // UBMail validation
        if (!formData.email) {
            newErrors.email = 'UBMail is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid UBMail (7-digit student number@ub.edu.ph)';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    const handleLogin = async () => {
        try {
            if (!validateForm()) {
                return;
            }
            console.log('Form Data:', formData); // Log form data

            setIsLoading(true);

            // Call the loginUser  function from MyDB.js
            const response = await loginUser(formData.email, formData.password);

            // Check if the response indicates success
            if (response.success) {
                // Successful login
                console.log('Login Successful:', response);
                navigation.navigate('Home', { user: response.registration });
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert(
                'Login Failed',
                error.message || 'Please check your UBMail and password and try again.',
                [{ text: 'OK' }]
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>QuickServe!</Text>
                <Image
                    source={require('../screens/images/logoo.png')}
                    style={styles.logo}
                    accessible={true}
                    accessibilityLabel="QuickServe Logo"
                />
                <View style={styles.formContainer}>
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        placeholder="UBMail"
                        value={formData.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    <TextInput
                        style={[styles.input, errors.password && styles.inputError]}
                        placeholder="Password"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                    <TouchableOpacity
                        style={[styles.loginButton, isLoading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonText}>{isLoading ? 'Logging In...' : 'Login'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={() => navigation.navigate('Registration')}
                    >
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Animated.View
                style={[styles.waveContainer, { transform: [{ translateX: wave1TranslateX }] }]}>
                <Svg height={200} width={3000} viewBox="0 0 3000 320">
                    <Path
                        fill="#FFEE93"
                        d="M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,218.7C672,213,768,171,864,138.7C960,107,1056,85,1152,90.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </Svg>
            </Animated.View>

            <Animated.View
                style={[styles.waveContainer, { transform: [{ translateX: wave2TranslateX }] }]}>
                <Svg height={200} width={3000} viewBox="0 0 3000 320">
                    <Path
                        fill="#FFA500"
                        d="M0,128L48,149.3C96,171,192,213,288,218.7C384,224,480,192,576,160C672,128,768,96,864,96C960,96,1056,128,1152,149.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </Svg>
            </Animated.View>

            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8DC',
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#800000',
    },
    logo: {
        width: 300,
        height: 150,
        marginBottom: 30,
        resizeMode: 'cover',
    },
    formContainer: {
        width: '100%',
        maxWidth: 300,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
        width: '100%',
    },
    inputError: {
        borderColor: '#ff0000',
    },
    errorText: {
        color: '#ff0000',
        fontSize: 12,
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#800000',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    registerButton: {
        backgroundColor: '#800000',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        maxWidth: 300,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    waveContainer: {
        position: 'absolute',
        width: 3000,
        height: 200,
        bottom: 0,
    },
});

export default WelcomeScreen;