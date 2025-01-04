import React, { useState, useContext, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert, Platform, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CartContext } from '../CartContext';
import Footer from './Footer';

// Move menu items to a separate config file in practice
const menuItems = [
    { id: '1', name: 'Bottled Water', price: 20, image: require('../screens/images/water.png') },
    { id: '2', name: 'Burger', price: 30, image: require('../screens/images/burger.png') },
    { id: '3', name: 'Fries', price: 35, image: require('../screens/images/fries.png') },
    { id: '4', name: 'Churros', price: 30, image: require('../screens/images/churros.png') },
];

const HomeScreen = ({ navigation }) => {
    const { addToCart, cart } = useContext(CartContext);

    // Calculate cart quantity using useMemo for performance
    const cartQuantity = useMemo(() => (
        cart.reduce((total, item) => total + item.quantity, 0)
    ), [cart]);

    const showNotification = (message) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            Alert.alert('Added to Cart', message);
        }
    };

    const handleAddToCart = (item) => {
        addToCart(item);
        showNotification(`${item.name} added to cart!`);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image
                source={item.image}
                style={styles.itemImage}
                resizeMode="cover"
                accessibilityLabel={`Image of ${item.name}`}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name} numberOfLines={1}>
                    {item.name || 'No Name'}
                </Text>
                <Text style={styles.price}>
                    ₱{item.price?.toFixed(2) ?? '0.00'}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
                activeOpacity={0.7}
                accessibilityLabel={`Add ${item.name} to cart`}
                accessibilityHint="Adds this item to your shopping cart"
            >
                <Text style={styles.addButtonText}>ADD TO CART</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Orders')}
                        accessibilityLabel="View Orders"
                    >
                        <Icon name="assignment" size={30} color="#FFA500" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('Cart')}
                        accessibilityLabel="View Cart"
                    >
                        <Icon name="shopping-cart" size={30} color="#FFA500" />
                        {cartQuantity > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cartQuantity}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.title}>MENU</Text>
        </>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderHeader}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    listContainer: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginHorizontal: 10,
        padding: 5, // Increased touch target
    },
    badge: {
        position: 'absolute',
        right: -5,
        top: -5,
        backgroundColor: '#ff5c5c',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    addButton: {
        backgroundColor: '#ff5c5c',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default HomeScreen;