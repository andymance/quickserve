import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartContext } from '../CartContext';
import Footer from './Footer';

const OrderSuccessScreen = ({ navigation, route }) => {
    const { orderId } = route.params;
    const { clearCart } = useContext(CartContext);

    // Configure header
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: null, // Explicitly remove the back button
            title: 'Order Success',
            headerStyle: {
                backgroundColor: '#800000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerBackVisible: false, // Ensure back button is hidden
        });
    }, [navigation]);

    // Handle hardware back button
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            handleGoToHome();
            return true;
        });

        return () => backHandler.remove();
    }, []);

    const handleGoToHome = () => {
        clearCart();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    // Updated navigation handler for Orders screen
    const handleViewOrders = () => {
        navigation.navigate('Orders', { fromOrderSuccess: true });
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Thanks for your order!</Text>
                <Icon name="check-circle" size={80} color="#4CAF50" style={styles.icon} />
                <Text style={styles.message}>Order ID: {orderId}</Text>
                <Text style={styles.message}>Payment has been received by the vendor.</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.viewOrdersButton]} 
                        onPress={handleViewOrders}
                    >
                        <Text style={styles.buttonText}>View Orders</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, styles.homeButton]} 
                        onPress={handleGoToHome}
                    >
                        <Text style={styles.buttonText}>Go to Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    icon: {
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
        marginTop: 20,
    },
    button: {
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    viewOrdersButton: {
        backgroundColor: '#FFA500',
    },
    homeButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default OrderSuccessScreen;