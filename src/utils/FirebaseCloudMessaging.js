import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import { saveDeviceTokenApi } from './APIs';
import APIKit from './APIKit';
import { showMessage, hideMessage } from "react-native-flash-message";

//1
export const getAndSaveFCMToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const authStatus = await messaging().requestPermission();
    let enabled;
    if(Platform.OS === 'ios'){
        enabled =
            authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;
    } else {
        enabled = authStatus;
    }

    if (enabled) {
        getFCMToken();
       
    }else {

    }
}

//3
const getFCMToken = async () => {
    let fcmToken;
    fcmToken = await AsyncStorage.getItem('@ride/fcmToken');
    if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
            saveDeviceToken(fcmToken);
        }
    }
    console.log('FCM TOKEN: ', fcmToken);
}

const saveDeviceToken = async (fcmToken) => {

    const response = await saveDeviceTokenApi(fcmToken);
    console.log('RESPONSE FCM TOKEN: ', response);
    if (response.success === 'FCM Actualizado' || response.success === 'FCM Creado') {
           // Se guarda el token de notificación en el dispositivo
            await AsyncStorage.setItem('@ride/fcmToken', fcmToken);
        } else {
            console.log('ERROR FCM TOKEN: ', response);
            console.log(JSON.stringify(response));
            console.log(response?.response?.data);

            showMessage({
                message: "Algo salio mal: FCM TOKEN",
                description: response.message,
                duration: 3000,
                type: "danger",
            });
        }
} 