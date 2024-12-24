import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CartContext } from '../CartContext'; // Make sure CartContext is imported
import Footer from './Footer';

const PaymentScreen = ({ navigation, route }) => {
    const { total, items } = route.params;
    const { clearCart } = useContext(CartContext); // Get clearCart from context
    const [isCancelDisabled, setIsCancelDisabled] = useState(false);
    const [timer, setTimer] = useState(60);

    // Set header options to center the title
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Payment',
            headerTitleAlign: 'center',
        });
    }, [navigation]);

    const handlePayment = () => {
        navigation.navigate('Order Success', { orderId: '001', items });
    };

    const handleCancelOrder = () => {
        Alert.alert(
            'Cancel Order',
            'Are you sure you want to cancel your order?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        clearCart(); // Clear the cart after canceling the order
                        navigation.navigate('Cart'); // Navigate to the Cart screen
                    },
                },
            ],
            { cancelable: false }
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    setIsCancelDisabled(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Payment</Text>

                <View style={styles.itemsContainer}>
                    {items.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>
                                    <Text>{item.name}</Text>
                                    <Text style={styles.itemQuantity}> x {item.quantity}</Text>
                                </Text>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.itemPrice}>
                                    <Text>₱{(item.price * item.quantity).toFixed(2)}</Text>
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>
                        <Text>Total: </Text>
                        <Text>₱{total.toFixed(2)}</Text>
                    </Text>
                </View>

                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>
                        <Text>Cancel available for: </Text>
                        <Text>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</Text>
                    </Text>
                </View>

                <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                    <Text style={styles.payButtonText}>Place Order</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.cancelButton, isCancelDisabled && styles.disabledButton]}
                    onPress={handleCancelOrder}
                    disabled={isCancelDisabled}
                >
                    <Text style={styles.cancelButtonText}>
                        {isCancelDisabled ? 'Cancel' : 'Cancel Order'}
                    </Text>
                </TouchableOpacity>
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
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
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
    itemDetails: {
        flex: 2,
    },
    itemName: {
        fontSize: 20,
        fontWeight: '500',
    },
    itemQuantity: {
        fontWeight: 'normal',
    },
    priceContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    itemPrice: {
        fontSize: 16,
        color: '#888',
    },
    totalContainer: {
        marginBottom: 20,
    },
    totalText: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    timerContainer: {
        marginBottom: 10,
    },
    timerText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    payButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#a5a5a5',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PaymentScreen;