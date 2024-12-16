import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CartContext } from '../CartContext'; // Import the CartContext

const CartScreen = ({ navigation }) => {
    const { cart, removeFromCart } = useContext(CartContext); // Access the cart state

    const handleCheckout = () => {
        const total = cart.reduce((total, item) => total + item.price * item.quantity, 0); // Calculate total price
        navigation.navigate('Payment', { items: cart, total }); // Pass cart and total to PaymentScreen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            {cart.map((item, index) => (
                <View key={index} style={styles.item}>
                    <Button title="Remove" onPress={()=>removeFromCart(item.id)} color="#ff5c5c" />
                    <Text>{item.name} x {item.quantity}</Text>
                    <Text>₱{item.price * item.quantity}</Text>
                    
                </View>
            ))}
            <Text style={styles.total}>
                Total: ₱{cart.reduce((total, item) => total + item.price * item.quantity, 0)}
            </Text>
            <Button title="Checkout" onPress={handleCheckout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 22, marginBottom: 10 },
    item: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    total: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
});

export default CartScreen;
