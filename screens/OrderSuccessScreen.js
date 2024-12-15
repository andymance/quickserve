// OrderSuccessScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const OrderSuccessScreen = ({ navigation, route }) => {
    const { orderId } = route.params; // Get orderId from route params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Placement Successful!</Text>
            <Text style={styles.message}>Order ID: {orderId}</Text>
            <Text style={styles.message}>Payment has been received by the vendor.</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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
});

export default OrderSuccessScreen;
