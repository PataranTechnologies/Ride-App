import React, { useEffect, useState } from 'react';
import { Alert, Linking, Text, View } from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Notifications } from 'react-native-notifications';

import appConfig from '../../../app.json';

import SharedStyles from '../../constants/SharedStyles';
import HomeScreen from './HomeScreen';
import Home from './Home';

const AppLoadingScreen = (props) => {
    const [region, setRegion ] = useState(null);
    useEffect(() => {
      
        // Assume a message-notification contains a "type" property in the data payload of the screen to open

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            //navigation.navigate(remoteMessage.data.type);
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }
                //setLoading(false);
            });
        getLocation()
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('REMOTE MESSAGE: ');
            console.log(remoteMessage);
            const { title, body } = remoteMessage.notification;
            /*Notifications.postLocalNotification({
                title: title,
                body: body,
                channelId:'',
                extra: "data",
                priority: "high"
            });*/
            showMessage({
                message: title,
                description: body,
                autoHide: false,
                backgroundColor: '#ffffff',
                color: '#111111',
                style: { margin: 4, borderRadius: 8, elevation: 3 },
                textStyle: { fontFamily: 'Sarabun-Regular'},
                titleStyle: { fontFamily: 'Sarabun-Medium' }
            });
        });

        return unsubscribe;
    },[])

    const getLocation = async () => {
        let status = await requestLocationPermisions();
        if (status == 'granted') {
            Geolocation.getCurrentPosition(
                (position) => {
                    //console.log('Position: ', position);
                    const { coords: { latitude, longitude } } = position;
                    setRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134,
                    });
                },
                (error) => {
                    // See error code charts below.
                    console.log('** ERRORES: ')
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
        if (status === 'denied') {
            Alert.alert('Permiso de ubicación denegado', 'Para mejorar la experiencia de usuario es necesario este permiso');
        }

        if (status === 'unavailable' || status === 'blocked') {
            Alert.alert(
                'Active los servicios de ubicación',
                `Para permitir que "${appConfig.displayName}" determine su ubicación.`,
                [
                    { text: 'Ir a la Configuración', onPress: openSetting },
                    { text: "No usar Ubicación", onPress: () => { } },
                ],
            );
        }
    }

    const requestLocationPermisions = async () => {
        const locationStatus = await request(
            Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            }));
        return locationStatus;
    }

    const openSetting = () => {
        Linking.openSettings().catch(() => {
            Alert.alert('Unable to open settings');
        });
    };
    
    if(region === null ) {
        return (
            <View style={[SharedStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>Configurando..</Text>
            </View>
        );
    }

    return (
            <Home region={region} /> 
    );
}

export default AppLoadingScreen;
