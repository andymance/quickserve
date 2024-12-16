import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './CartContext'; // Import the CartProvider
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import { Button,Alert,Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} options={({ navigation }) => ({ headerLeft: () => <Text> </Text>})}/>
          <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({ headerLeft: () => <Text> </Text>, headerRight: () => ( <Button title="Logout" onPress={() => Alert.alert( 'Log out', 'Are you sure you want to logout?', [ { text: 'Cancel', style: 'cancel' }, { text: 'OK', onPress: () => navigation.navigate('Login') }, ], { cancelable: false } ) } color="#ff5c5c" /> ), })} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} options={({ navigation }) => ({ headerLeft: () => <Text> </Text>})}/>
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
