import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to QuickServe! UBian's Canteen Ordering System</Text>
            <Button title="Order now" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default WelcomeScreen;
