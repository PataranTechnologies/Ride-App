import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpPhoneScreen from '../screens/auth/SignUpPhoneScreen';
import SignUpScreen from '../screens/auth/SignUpScreen'; 
import SplashScreen from '../screens/auth/SplashScreen';
import SignUpVerifiedPhoneScreen from '../screens/auth/SignUpVerifiedPhoneScreen';
import PaymentMethodScreen from '../screens/auth/PaymentMethodScreen';


const Stack = createStackNavigator();

const AuthStack = ({ navigation }) => (
    <Stack.Navigator initialRouteName="SignIn" headerMode="none">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUpPhone" component={SignUpPhoneScreen} />
        <Stack.Screen name="SignUpVerifiedPhone" component={SignUpVerifiedPhoneScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
    </Stack.Navigator>
);

export default AuthStack;