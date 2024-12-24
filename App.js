import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './CartContext';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import OrderTrackingScreen from './screens/OrderTrackingScreen';
import OrdersScreen from './screens/OrdersScreen';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import { validateEmail, validatePassword } from './utils/validation'; // Corrected import path

const Stack = createNativeStackNavigator();

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = (navigation) => {
    setModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome, UBians!' }],
    });
  };

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome, UBians!"
          screenOptions={{
            headerStyle: { backgroundColor: '#800000' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          {/* Welcome screen */}
          <Stack.Screen
            name="Welcome, UBians!"
            component={WelcomeScreen}
            options={{
              headerLeft: () => null, // Remove back button
              headerBackVisible: false,
            }}
          />

          {/* Registration screen */}
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              headerLeft: () => null, // Remove back button
            }}
          />

          {/* Home screen */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerLeft: () => null, // Remove back button
              headerBackVisible: false,
              headerRight: () => (
                <>
                  {/* Logout Icon */}
                  <TouchableOpacity
                    style={styles.logoutIcon}
                    onPress={() => setModalVisible(true)}
                  >
                    <Icon name="logout" size={30} color="#ffffff" />
                  </TouchableOpacity>

                  {/* Custom Logout Modal */}
                  {modalVisible && (
                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => setModalVisible(false)}
                    >
                      <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                          <Text style={styles.modalTitle}>Log Out</Text>
                          <Text style={styles.modalMessage}>
                            Are you sure you want to logout?
                          </Text>
                          <View style={styles.modalButtons}>
                            <TouchableOpacity
                              style={[styles.button, styles.cancelButton]}
                              onPress={() => setModalVisible(false)}
                            >
                              <Text style={styles.buttonText}>NO</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[styles.button, styles.okButton]}
                              onPress={() => handleLogout(navigation)}
                            >
                              <Text style={styles.buttonText}>YES</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  )}
                </>
              ),
            })}
          />

          {/* Other screens */}
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Order Success" component={OrderSuccessScreen} />
          <Stack.Screen name="Order Track" component={OrderTrackingScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  logoutIcon: {
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#800000',
  },
  okButton: {
    backgroundColor: '#800000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});