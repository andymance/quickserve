import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const PaymentScreen = ({ navigation, route }) => {
    // Receive cart details via route params
    const { total, items } = route.params;

    const handlePayment = () => {
        // Simulate payment process
        navigation.navigate('OrderSuccess', { orderId: '001' }); // Navigate to a success screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment</Text>

            {/* Display Cart Items */}
            <View style={styles.itemsContainer}>
                {items.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.itemName}>{item.name} x {item.quantity}</Text>
                        <Text style={styles.itemPrice}>₱{(item.price * item.quantity).toFixed(2)}</Text>
                    </View>
                ))}
            </View>

            {/* Total Price */}
            <Text style={styles.totalText}>Total: ₱{total.toFixed(2)}</Text>

            {/* Pay Button */}
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                <Text style={styles.payButtonText}>Place order</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
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
    itemName: {
        fontSize: 16,
        fontWeight: '500',
    },
    itemPrice: {
        fontSize: 16,
        color: '#888',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    payButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PaymentScreen;
