import React, { useState, useEffect } from 'react';
import { Dimensions, KeyboardAvoidingView, FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, TextInput } from 'react-native';
import Modal from "react-native-modal";
import Header from '../../components/Header';
import axios from 'axios';
import SharedStyles from '../../constants/SharedStyles';
import GooglePlacesInput from '../../components/GooglePlacesInput.js';
import DefaultTheme from '../../constants/DefaultTheme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AddressItem from '../../components/AddressItem';
import PrimaryButton from '../../components/PrimaryButton';
import CustomAlert from '../../components/CustomAlert';
import ChooseLocationModal from '../../components/ChooseLocationModal';
import { add } from 'react-native-reanimated';
import { SetMainActive } from '../../RideRedux/actions';


const WINDOW = Dimensions.get('window');
const { card, header, primary, text, secondary, background } = DefaultTheme.colors;

const myAddresses = [{
        name: 'Trabajo',
        format_address: 'Av Manuel J. Clouthier 263, Tangamanga, 78269 San Luis, S.L.P.',
        latitude: '22.1405556',
        longitude: '-101.0022222',
    }, 
    {
        name: 'Casa',
        format_address: 'Av Himno Nacional 4005, Himno Nacional, 78280 San Luis, S.L.P.',
        latitude: '22.1345165',
        longitude: '-100.982428',
    }]

const SelectAddressScreen = ({region, isVisible, setIsVisible, setDirectionsSource}) => {
    const defaultAddresses = [{
        format_address: '',
        latitude: '',
        longitude: '',
    }, {
        format_address: '',
        latitude: '',
        longitude: '',
    }];
    const [dataSource, setDataSource] = useState([]);
    const [addresses, setAddresses] = useState(defaultAddresses);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [alertData, setAlertData] = React.useState({
        isVisible: false,
        title: '',
        description: '',
        showConfirmButton: true,
        showProgress: false,
        onConfirmPressed: hideAlert
    });
    const [locationModal, setLocationModal] = useState({
        isVisible: false,
        location: {
            format_address: '',
            latitude: '',
            longitude: '',
        }
    });

    useEffect(() => {
        if(isVisible==true) {
           const { latitude, longitude } = region;
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDhqFKc_cJv7x-PRtMMss0_u-sJ8OIZSBs`)
                .then(({ data }) => {
                    let auxAddresses = defaultAddresses;
                    auxAddresses[0].format_address = data.results[0].formatted_address;
                    auxAddresses[0].latitude = latitude;
                    auxAddresses[0].longitude = longitude;
                    setAddresses([...auxAddresses]);
                })
                .catch(error => {
                    console.log('GEOCODING ERROR');
                    console.log(JSON.stringify(error));
                })
        }
    },[isVisible]);

    const hideAlert = () => {
        setAlertData({ ...alertData, isVisible: false });
    };

    const handleInputChange = (text, index) => {
        /*let auxAddresses = addresses;
        auxAddresses[index] = {
            format_address: '',
            latitude: '',
            longitude: '',
        }
        setAddresses([...auxAddresses]);*/
        let auxAddresses = addresses;
        auxAddresses[index].format_address = text;
        setAddresses([...auxAddresses]);
        
        if(text.length>3) {
            request(text);
        }else {
            setDataSource([]);
        }
    }

    const request = (text) => {
        axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + encodeURIComponent(text) + '&location=' + encodeURIComponent(region.latitude) + ',' + encodeURIComponent(region.longitude) + '&radius=1000&key=AIzaSyDhqFKc_cJv7x-PRtMMss0_u-sJ8OIZSBs')
        .then(({data}) => {
            setDataSource(data.predictions);
        } ).catch(error => {
            console.log('Error: ', error);
        })
    }

    const keyGenerator = () => Math.random().toString(36).substr(2, 10)

    const _renderSeparator = (sectionID, rowID) => {
        if (rowID == dataSource.length - 1) {
            return null;
        }

        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={styles.separator}
            />
        );
    };

    const onPressRowData = (rowData) => {
        let auxAddresses = addresses;
        console.log('Row Data: ', )
        axios.get('https://maps.googleapis.com/maps/api/place/details/json?place_id=' + encodeURIComponent(rowData.place_id) + '&fields=geometry&key=AIzaSyDhqFKc_cJv7x-PRtMMss0_u-sJ8OIZSBs')
            .then(({ data }) => {
                console.log('Details: ', data.result.geometry.location);
                const { lat, lng } = data.result.geometry.location;
                auxAddresses[currentIndex]= { 
                    format_address: rowData.description,
                    latitude: lat,
                    longitude: lng,
                };
                setAddresses([...auxAddresses]);
                setDataSource([]);
            }).catch(error => {
                console.log('Error: ', error);
            })
    }

    const _renderRow = (rowData, rowID) => {
        return (
            <ScrollView
                key={rowID}
                style={{ flex: 1 }}
                scrollEnabled={true}
                keyboardShouldPersistTaps={'always'}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity
                    style={styles.rowDataContainer}
                    onPress={() => onPressRowData(rowData)}
                    underlayColor={'#c8c7cc'}
                >
                    <View
                        style={styles.row}
                    >
                        <Text style={styles.rowDataDescription}>{rowData.description}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    };

    const onPressAddresItem = (addressItem) => {
        let auxAddresses = addresses;
        auxAddresses[currentIndex] = {
            format_address: addressItem.format_address,
            latitude: Number(addressItem.latitude),
            longitude: Number(addressItem.longitude),
        }
        setAddresses([...auxAddresses]);
    }

    const _renderHeaderComponet = () => {
       // console.log('Current Index: ', currentIndex);
        if(addresses[currentIndex].format_address !== '') {
            return null
        }
        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                    <Fontisto
                        name="map-marker-alt"
                        color={secondary}
                        size={20}
                    />
                    <Text style={styles.savedAddressesText}>Direcciones guardadas</Text>
                </View>
                { myAddresses.map((item, index) => <AddressItem
                                                        key={index} 
                                                        address={item.format_address} 
                                                        name={item.name}
                                                        onPress={() => onPressAddresItem(item)}
                                                        />)}
            </View>
        );
    }

    const addAddress = () => {
        if(addresses.length<5) {
            const newAddress = {
                format_address: '',
                latitude: '',
                longitude: '',
            };
            let auxAddresses = addresses;
            auxAddresses.push(newAddress);
            setAddresses([...auxAddresses]);
        }
    }

    const removeAddress = (index) => {
        let auxAddresses = addresses;
        auxAddresses.pop();
        setAddresses([...auxAddresses]);
    }

    const validate = () => {
        if(addresses[0].latitude == '') {
            setAlertData({
                isVisible: true,
                title: 'Punto de partida inválido',
                description: 'Asegurese de haber ingresado el punto de partida',
                showConfirmButton: true,
                showProgress: false,
                onConfirmPressed: hideAlert
            }); 
            return;
         }
        if (addresses[1].latitude == '') {
            setAlertData({
                isVisible: true,
                title: 'Destino inválido',
                description: 'Asegurese de haber ingresado el destino',
                showConfirmButton: true,
                showProgress: false,
                onConfirmPressed: hideAlert
            }); 
            return;
        }
        setIsVisible(false);
        //setMainActive(false)
        setDirectionsSource(addresses);
        //setAddresses(defaultAddresses);
    }

    const hideLocationModal = () => {
        setLocationModal({
            ...locationModal,
            isVisible: false
        })
    }
 
    return (
        <Modal
            isVisible={isVisible}
            style={{ margin: 0, backgroundColor: background }}
            onBackButtonPress={() =>setIsVisible(false)}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}

                style={SharedStyles.container}
            >
                <View style={SharedStyles.container}>
                    <Header title="¿A dónde deseas ir?" enableBackButton={false} customOnPress={() => setIsVisible(false)} />
                    <ScrollView>
                        <View style={styles.body}>
                            <View style={{marginBottom: 20}}>
                            { addresses.map((item, index) => {
                                    return (
                                        <GooglePlacesInput
                                            key={index}
                                            pinRed={index == 0 ? false : true}
                                            showRightIcon={index == 0 ? false : true}
                                            minusIcon={index == (addresses.length -1) ? false : true}
                                            placeholder={index == 0 ? 'Punto de Partida' : index == (addresses.length - 1) ? 'Destino' : 'Parada ' + (index) }
                                            onFocus={() => { 
                                                setCurrentIndex(index);
                                                setDataSource([]);
                                                }}
                                            onPressIcon={() => {
                                                if(index == (addresses.length - 1)) {
                                                    addAddress();
                                                } else {
                                                    removeAddress(index);
                                                }
                                            }}
                                            onChangeText={(text) => handleInputChange(text, index)}
                                            value={item.format_address}
                                            
                                        />
                                    );
                            })
                            }
                                {/*<GooglePlacesInput region={region} />*/}
                            </View>
                            <View style={{ borderTopWidth: 1, borderTopColor: 'gray', paddingTop: 12 }}>
                                { _renderHeaderComponet() }
                                { dataSource.map(_renderRow) }
                                <TouchableOpacity style={styles.rowDataContainer} onPress={() => {
                                    setLocationModal({
                                        isVisible: true,
                                        location: addresses[currentIndex]
                                    });
                                    console.log('Current Index: ', currentIndex);
                                    console.log('Location: ', addresses[currentIndex] );
                                }}>
                                    <View style={styles.row}>
                                        <Text style={styles.rowDataDescription}>Colocar en el mapa</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <PrimaryButton
                                containerStyle={{ marginTop: 20, marginBottom: 20}}
                                title={'Aceptar'}
                                onPress={validate}
                            />
                        </View>
                    </ScrollView>
                    <CustomAlert
                        isVisible={alertData.isVisible}
                        title={alertData.title}
                        description={alertData.description}
                        onBackButtonPress={hideAlert}
                        onConfirmPressed={alertData.onConfirmPressed}
                        showProgress={alertData.showProgress}
                        showConfirmButton={alertData.showConfirmButton}
                    />
                    {
                        locationModal.isVisible?
                    <ChooseLocationModal
                        isVisible={locationModal.isVisible}
                        defaultLocation={locationModal.location}
                        defaultRegion={region}
                        onBackButtonPress={hideLocationModal}
                        onConfirmPressed={(location) => {
                            let auxAddresses = addresses;
                            auxAddresses[currentIndex] = location;
                            setAddresses([...auxAddresses]);
                            hideLocationModal();
                        }}
                    />:null
}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

export default SelectAddressScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        margin: 20,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#c8c7cc',
        marginVertical: 2
    },
    row: {
        padding: 10,
        flexDirection: 'row',
    },
    addDestinationContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 16 
    },
    addIconContainer: { 
        width: 40, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    savedAddressesText: {
        fontSize: 16, 
        fontFamily: 'Sarabun-SemiBold',
        color: text,
        marginLeft: 10,
    },
    rowDataContainer: {
        backgroundColor: card,
        elevation: 3,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        marginBottom: 5,
        marginHorizontal: 2
    },
    rowDataDescription: { 
        fontFamily: 'Sarabun-Regular', 
        color: text 
    }
});