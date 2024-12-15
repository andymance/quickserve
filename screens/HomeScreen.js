import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { CartContext } from '../CartContext'; // Import the CartContext

const menuItems = [
    { id: '1', name: 'Bottled Water', price: 20 },
    { id: '2', name: 'Regular Burger', price: 25 },
    { id: '3', name: 'Fries', price: 35 },
    { id: '4', name: 'Churros', price: 35 },
    { id: '5', name: 'Ginataang Paniki', price: 35 },
    { id: '6', name: 'Kalderetang Aso', price: 20 },
    { id: '7', name: 'Ginisang Cannabis w/ Salmon', price: 20 },
    { id: '8', name: 'Ginisang Marijuana  Tofu and Pork', price: 20 },
];

const HomeScreen = ({ navigation }) => {
    const { addToCart } = useContext(CartContext); // Access addToCart function

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₱{item.price}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu</Text>
            <FlatList data={menuItems} renderItem={renderItem} keyExtractor={(item) => item.id} />
            <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 22, marginBottom: 10 },
    item: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    name: { fontSize: 18 },
    price: { fontSize: 16, color: '#888' },
});

export default HomeScreen;
