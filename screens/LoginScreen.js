import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [department, setDepartment] = useState('');

    const handleContinue = () => {
        const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name && emailPattern.test(email) && studentNumber.length === 7 && department ){
            navigation.navigate('Home');
            
        }   
        else {
            Alert.alert('Invalid Login', 'Please fill all the fields. You must use UBMail');
        }
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customer Login</Text>
            <TextInput placeholder="Name" style={styles.input} onChangeText={setName} />
            <TextInput placeholder="UBmail" style={styles.input} onChangeText={setEmail} />
            <TextInput placeholder="Student/Employee Number" style={styles.input} onChangeText={setStudentNumber} />
            <TextInput placeholder="Department" style={styles.input} onChangeText={setDepartment} />
            
            <Button title="Continue" onPress={handleContinue} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 22, marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default LoginScreen;
