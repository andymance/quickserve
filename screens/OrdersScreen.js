import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, BackHandler } from 'react-native';
import Footer from './Footer';

const dummyOrders = [
    { id: '101', items: 'Burger, Fries', total: 65 },
    { id: '102', items: 'Churros, Bottled Water', total: 50 },
];

const OrdersScreen = ({ navigation, route }) => {
    // Check if coming from OrderSuccess screen
    const isFromOrderSuccess = route.params?.fromOrderSuccess || false;

    useEffect(() => {
        // Configure header based on navigation source
        navigation.setOptions({
            headerLeft: isFromOrderSuccess ? () => null : undefined,
            // If from OrderSuccess, remove back button. Otherwise, keep default back button
            headerStyle: {
                backgroundColor: '#800000', // Maroon header
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
        });

        // Only override back button behavior if coming from OrderSuccess
        if (isFromOrderSuccess) {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
                return true;
            });

            return () => backHandler.remove();
        }
    }, [navigation, isFromOrderSuccess]);

    const renderItem = ({ item }) => (
        <View style={styles.order}>
            <Text style={styles.orderId}>Order ID: {item.id}</Text>
            <Text style={styles.itemText}>Items: {item.items}</Text>
            <Text style={styles.totalText}>Total: ₱{item.total}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Your Orders</Text>
                <FlatList
                    data={dummyOrders}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContainer: {
        flexGrow: 1,
    },
    order: {
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 3,
    },
    totalText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
    },
});

export default OrdersScreen;