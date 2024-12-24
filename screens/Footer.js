import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.footer}>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        width: '112%', // Make the footer span the entire width
        backgroundColor: '#800000', // Maroon color
        paddingVertical: 25, // Adjust padding for vertical spacing
        alignItems: 'center', // Center the content inside the footer
        position: 'absolute', // Position the footer at the bottom
        bottom: 0, // Align the footer to the bottom
    }
});

export default Footer;