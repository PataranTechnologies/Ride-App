import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Linking, Platform, StyleSheet, View, Button} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import appConfig from '../../../app.json';
import DefaultTheme from '../../constants/DefaultTheme';
import ButtonMenu from '../../components/ButtonMenu';
import WelcomeMessage from '../../components/WelcomeMessage';
import { AuthContext } from '../../context/context';
import SelectAddressScreen from './SelectAddressScreen';
import TravelPreferencesView from '../../components/TravelPreferencesView';
import RequestTravelView from '../../components/RequestTravelView';
import CustomAlert from '../../components/CustomAlert';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const { card, header, primary, secondary, text } = DefaultTheme.colors;

const HomeScreen = (props) => {
    let mapView = React.createRef();
    let animatedView;
    const [region, setRegion] = useState(props.region);
    const [addresses, setAddresses] = useState(null);
    const [isVisibleSelectAddressScreen, setIsVisibleSelectAddressScreen] = useState(false);
    const [travelPreferences, setTravelPreferences] = useState({
        babys: false,
        pets: false
    })

    const [pageName, setPageName] = useState('welcomeMessage');
    const [alertData, setAlertData] = React.useState({
        isVisible: false,
        title: '',
        description: '',
        showConfirmButton: true,
        showProgress: false,
        onConfirmPressed: hideAlert
    });

    const hideAlert = () => {
        setAlertData({ ...alertData, isVisible: false });
    };

    const setDirectionsSource = (addressesArray) => {
        console.log('HOME ADDRESSES: ', addressesArray);
        setAddresses(addressesArray);
        setPageName('travelPreferences');
    }
    const { loginState } = React.useContext(AuthContext);

    const userData = loginState.userData;

    useEffect( () => {
        animatedView.fadeInRight(300);
    },[]);

    const getWayPoints = (unformattedWayPoints) => {
        let formattedWayPoints = [];
        unformattedWayPoints.forEach(element => {
            formattedWayPoints.push(element.format_address);
        });
        return formattedWayPoints;
    }

    const onReadyMapViewDirections = (result) => {
        console.log(`Distance: ${result.distance} km`)
        console.log(`Duration: ${result.duration} min.`)
        mapView.current.fitToCoordinates(result.coordinates, {
            edgePadding: {
                right: (width / 20),
                bottom: (height / 20),
                left: (width / 20),
                top: (height / 20),
            },
            animated: true,
        });
    }

    const onPressTravelPreferencesButton = (preferences) => {
        console.log('Travel Preferences: ', preferences);
        setPageName('requestTravel');
        animatedView.fadeInRight(300);
    }

    const onPressRequestButton = (result) => { 
        console.log('request Travel Result: ', result);
        setAlertData({
            isVisible: true,
            title: 'Buscando Conductor.\nEspere unos segundos',
            description: '',
            showConfirmButton: false,
            showProgress: true,
            onConfirmPressed: hideAlert
        });

        setTimeout(() => {
            hideAlert();
        }, 2000)
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.container}
                region={region}
                showsUserLocation={true}
                onRegionChangeComplete={(reg) => {
                    console.log('Nueva region: ', reg);
                    setRegion(reg)} }
                showsMyLocationButton={true}
                loadingEnabled
                ref={mapView}
            >
            { addresses !== null && <MapViewDirections
                origin={addresses[0].format_address}
                waypoints={(addresses.length > 2) ? getWayPoints(addresses.slice(1, -1)) : []}
                destination={addresses[addresses.length - 1].format_address}
                apikey={'AIzaSyDhqFKc_cJv7x-PRtMMss0_u-sJ8OIZSBs'}
                strokeWidth={3}
                strokeColor={header}
                onStart={(params) => {
                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }}
                onReady={onReadyMapViewDirections}
                onError={(errorMessage) => {
                    console.log('GOT AN ERROR');
                    console.log(errorMessage)
                }}
            /> }
            </MapView> 
            <ButtonMenu />
            { pageName === 'welcomeMessage' && <WelcomeMessage name={userData.name} onIconPress={() => {
                setIsVisibleSelectAddressScreen(true)
            }}/> }
            <Animatable.View ref={ref => animatedView = ref} style={styles.cardContainer}>
                { pageName === 'travelPreferences' && <TravelPreferencesView
                    addressesArray={addresses}
                    onChange={(travelSettings) => { setTravelPreferences(travelSettings) }}
                    onPressNextButton={onPressTravelPreferencesButton}
                />}
                { pageName === 'requestTravel' && <RequestTravelView 
                onPressButton={onPressRequestButton} /> }
            </Animatable.View>
            <SelectAddressScreen 
                region={region} 
                isVisible={isVisibleSelectAddressScreen} 
                setIsVisible={(visible) => setIsVisibleSelectAddressScreen(visible)} 
                setDirectionsSource={setDirectionsSource}
            />
            <CustomAlert
                isVisible={alertData.isVisible}
                title={alertData.title}
                description={alertData.description}
                onConfirmPressed={alertData.onConfirmPressed}
                showProgress={alertData.showProgress}
                showConfirmButton={alertData.showConfirmButton}
            />    
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
   container: {
       flex: 1
   },
});