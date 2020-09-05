import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Modal from "react-native-modal";
import * as axios from 'axios';
import DefaultTheme from '../constants/DefaultTheme';
import SharedStyles from '../constants/SharedStyles';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PrimaryButton from './PrimaryButton';
import Fontisto from 'react-native-vector-icons/Fontisto';



const { background, header } = DefaultTheme.colors;

const ChooseLocationModal = ({ isVisible, onBackButtonPress, defaultLocation, defaultRegion, onConfirmPressed }) => {
    const [location, setLocation] = useState({
        format_address: '',
        latitude: defaultRegion.latitude,
        longitude: defaultRegion.longitude
    });
    const [region, setRegion] = useState({
        latitude: defaultRegion.latitude,
        longitude: defaultRegion.longitude,
        latitudeDelta: 0.010, 
        longitudeDelta: 0.00806
    });
    const [address, setAddress] = useState('');
    const [isMonted, setIsMounted] = useState(false);

    useEffect(() => {
        if(isVisible === true) {
            console.log('Default location: ', defaultLocation);
            if (defaultLocation.latitude !== "") {
                setLocation(defaultLocation);
                setAddress(defaultLocation.format_address);
                setRegion({
                    latitude: defaultLocation.latitude,
                    longitude: defaultLocation.longitude,
                    latitudeDelta: 0.007814373305325972,
                    longitudeDelta: 0.004634521901607513
                })
                setIsMounted(true)
            }
            if (defaultLocation.format_address === '' || defaultLocation.latitude === '') {
                setLocation({
                    format_address: '',
                    latitude: defaultRegion.latitude,
                    longitude: defaultRegion.longitude
                });
                setAddress(defaultLocation.format_address);
                setIsMounted(true)
            }
        } else {
            setIsMounted(false);
        }
    },[isVisible]);

    const selectDestination = (data, details = null) => {
        console.log('*****Details: ', details);
        console.log('***** Data: ', data); 
        const latDelta = Number(details.geometry.viewport.northeast.lat) - Number(details.geometry.viewport.southwest.lat)
        const lngDelta = Number(details.geometry.viewport.northeast.lng) - Number(details.geometry.viewport.southwest.lng)
        let newRegion = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta
        };
        setRegion(newRegion);
        setLocation({
            format_address: data.description,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
        });
    }

    const handleDragEnd = (coordinate) => {
        setIsMounted(false);
        const { latitude, longitude } = coordinate;
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDhqFKc_cJv7x-PRtMMss0_u-sJ8OIZSBs`)
            .then(({ data }) => {
                const latDelta = Number(data.results[0].geometry.viewport.northeast.lat) - Number(data.results[0].geometry.viewport.southwest.lat)
                const lngDelta = Number(data.results[0].geometry.viewport.northeast.lng) - Number(data.results[0].geometry.viewport.southwest.lng)
                setAddress(data.results[0].formatted_address);
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: latDelta,
                    longitudeDelta: lngDelta
                });
                setLocation({
                    format_address: data.results[0].formatted_address,
                    latitude,
                    longitude
                });
                setIsMounted(true);
            })
            .catch(error => {
                console.log('GEOCODING ERROR');
                console.log(JSON.stringify(error));
                Alert.alert('GEOCODING ERROR', JSON.stringify(error));
            })
    }

    const handleOnConfirmPressed = () => {
        onConfirmPressed(location);
    }
    const onRegionChangeComplete = (newRegion) => {
        if (isMonted == true) {
            console.log('New Region: ', newRegion);
            setIsMounted(false);
            const { latitude, longitude } = newRegion;
            setRegion(newRegion);
            setLocation({
                ...location,
                latitude,
                longitude
            });
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDhqFKc_cJv7x-PRtMMss0_u-sJ8OIZSBs`)
                .then(({ data }) => {
                    const latDelta = Number(data.results[0].geometry.viewport.northeast.lat) - Number(data.results[0].geometry.viewport.southwest.lat)
                    const lngDelta = Number(data.results[0].geometry.viewport.northeast.lng) - Number(data.results[0].geometry.viewport.southwest.lng)
                    setAddress(data.results[0].formatted_address);
                    setLocation({
                        format_address: data.results[0].formatted_address,
                        latitude,
                        longitude
                    });
                    setIsMounted(true);
                })
                .catch(error => {
                    console.log('GEOCODING ERROR');
                    console.log(JSON.stringify(error));
                    Alert.alert('GEOCODING ERROR', JSON.stringify(error));
                })
        }
    }

    return (
        <Modal
        isVisible={isVisible}
        onBackButtonPress={onBackButtonPress}
            style={{ margin: 0, backgroundColor: background }}
            >
            <View style={[SharedStyles.container, { alignItems: 'center', justifyContent: 'center'}]}>
                <MapView
                    style={styles.mapView}
                    region={region}
                    onRegionChangeComplete={onRegionChangeComplete}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    loadingEnabled
                />
                <Fontisto
                    name="map-marker-alt"
                    color={header}
                    size={30}
                />
                <View style={{ position: 'absolute', top: 0, width: '100%'}}>
                    { isMonted === true  && <GooglePlacesAutocomplete
                        placeholder='escriba aquí'
                        textInputProps={{
                            selectTextOnFocus: true,
                            multiline: true,
                            numberOfLines: 2,
                        }}
                        getDefaultValue={() => address }
                        enablePoweredByContainer={false}
                        minLength={5}
                        returnKeyType={'search'}
                        listViewDisplayed={address != '' ? 'false' : 'auto'}
                        fetchDetails={true}
                        onPress={selectDestination}
                        query={{
                            key: 'AIzaSyDhqFKc_cJv7x-PRtMMss0_u-sJ8OIZSBs',
                            language: 'es',
                            location: location.latitude + ',' + location.longitude,
                            radius: '10000',
                            types: ''
                        }}
                        styles={{
                            textInputContainer: styles.placesTextInputContainer,
                            textInput: styles.placesTextInput,
                            listView: styles.placesListView,
                        }}
                    /> 
                    }
                </View>
                <View style={{ paddingHorizontal: 20, position: 'absolute', bottom: 20, width: '100%' }}>
                    <PrimaryButton
                        containerStyle={{}}
                        title="Aceptar"
                        onPress={handleOnConfirmPressed}
                    />
                </View>
                
            </View>
        </Modal>
    );

}

export default ChooseLocationModal;

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    mapView: {
        ...StyleSheet.absoluteFillObject,
    },
    placesTextInputContainer: {
        width: '100%',
        height: 80,
        backgroundColor: background,
        borderTopWidth: 0,
    },
    placesTextInput: {
        height: 60,
        backgroundColor: 'white',
        borderRadius: 23,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'Sarabun-Medium',
    },
    placesListView: {
        backgroundColor: background
    },
});