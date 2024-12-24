import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { CartContext } from '../CartContext'; // Import the CartContext
import Footer from './Footer';

const OrderTrackingScreen = ({ navigation, route }) => {
    const { orderId, items } = route.params;
    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        // Set options to remove the back button
        navigation.setOptions({
            headerLeft: () => null,
        });

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleCancelOrder();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup timer on component unmount
    }, [navigation]);

    const handleCancelOrder = () => {
        Alert.alert('Order Canceled', `Order ID: ${orderId} has been canceled due to timeout.`);
        clearCart();
        navigation.navigate('Home');
    };

    const handleClaimOrder = () => {
        clearCart();
        Alert.alert('Order Claimed', `Order ID: ${orderId} has been claimed at the stall.`);
        navigation.navigate('Home');
    };

    const handleBackToHome = () => {
        clearCart();
        navigation.navigate('Home');
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Tracking</Text>
            <Text style={styles.message}>Order ID: {orderId}</Text>
            <Text style={styles.message}>Status: In Progress</Text>
            <Text style={styles.message}>Time Left: {formatTime(timeLeft)}</Text>
            <View style={styles.itemsContainer}>
                {items.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text>{item.name} x {item.quantity}</Text>
                        <Text>₱{(item.price * item.quantity).toFixed(2)}</Text>
                    </View>
                ))}
            </View>
            <Button title="Claim Order" onPress={handleClaimOrder} color="#28a745" />
            <View style={styles.buttonSpacing} />
            <Button title="Back to Home" onPress={handleBackToHome} color="#FFA500" />

            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    itemsContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    buttonSpacing: {
        marginBottom: 20,
    },
});

export default OrderTrackingScreen;