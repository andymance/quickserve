import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import { CartContext } from '../CartContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from './Footer';

const CartScreen = () => {
    const navigation = useNavigation();
    const { cart, removeFromCart } = useContext(CartContext);
    const [hoveredRemove, setHoveredRemove] = useState(null);
    const [hoveredCheckout, setHoveredCheckout] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Cart',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={{ marginLeft: 15, paddingRight: 20 }}
                >
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const handleCheckout = () => {
        const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        const tracking = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
        const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        navigation.navigate('Payment', { 
            items: cart, 
            total, 
            orderId, 
            tracking 
        });
    };

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemQuantity}>x {item.quantity}</Text>
                                <Text style={styles.itemPrice}>
                                    <Text>₱{(item.price * item.quantity).toFixed(2)}</Text>
                                </Text>
                            </View>
                            <View style={styles.removeButton}>
                                <TouchableOpacity
                                    style={[styles.removeButtonBase, hoveredRemove === item.id && styles.removeButtonHovered]}
                                    onPress={() => removeFromCart(item.id)}
                                    onMouseEnter={() => setHoveredRemove(item.id)}
                                    onMouseLeave={() => setHoveredRemove(null)}
                                >
                                    <Text style={styles.removeButtonText}>REMOVE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.empty}>Your cart is empty.</Text>
                )}
                <View style={styles.totalContainer}>
                    <Text style={styles.total}>
                        Total: <Text>₱{total.toFixed(2)}</Text>
                    </Text>
                </View>
                <TouchableOpacity
                    style={[styles.checkoutButton, hoveredCheckout && styles.checkoutButtonHovered, cart.length === 0 && styles.checkoutButtonDisabled]}
                    onPress={handleCheckout}
                    disabled={cart.length === 0}
                    onMouseEnter={() => setHoveredCheckout(true)}
                    onMouseLeave={() => setHoveredCheckout(false)}
                >
                    <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    contentContainer: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 30,
        marginBottom: 10
    },
    item: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc' 
    },
    itemDetails: {
        flexDirection: 'column',
        flex: 2
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    itemQuantity: {
        fontSize: 16,
        color: '#555'
    },
    itemPrice: {
        fontSize: 16,
        color: '#888'
    },
    removeButton: {
        flex: 1,
        alignItems: 'flex-end'
    },
    removeButtonBase: {
        backgroundColor: '#ff5c5c',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    removeButtonHovered: {
        backgroundColor: '#d94c4c',
        transform: [{ scale: 1.05 }]
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    totalContainer: {
        marginTop: 20
    },
    total: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    empty: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginVertical: 20
    },
    checkoutButton: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    checkoutButtonHovered: {
        backgroundColor: '#218838',
        transform: [{ scale: 1.05 }]
    },
    checkoutButtonDisabled: {
        backgroundColor: '#d6d6d6',
        opacity: 0.6
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default CartScreen;