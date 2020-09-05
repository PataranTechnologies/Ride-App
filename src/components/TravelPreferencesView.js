import React , { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DefaultTheme from '../constants/DefaultTheme';
import PrimaryButton from './PrimaryButton';
import Icon2 from 'react-native-vector-icons/Ionicons'
const { card, header, primary, secondary, text } = DefaultTheme.colors;
const { width } = Dimensions.get('screen');

const babyIcon = {
    active: require('../../assets/images/bebes_white.png'),
    inactive: require('../../assets/images/bebes.png')
}
const petsIcon = {
    active: require('../../assets/images/pets_white.png'),
    inactive: require('../../assets/images/pets.png')
}

const AddressRow = ({iconRed, text}) => (
    <View style={styles.row}>
        <Fontisto
            name="map-marker-alt"
            color={ iconRed ? header : primary}
            size={20}
        />
        <Text style={styles.addressText}>{text.split(',')[0]}</Text>
    </View>
)

const TravelPreferencesButton = ({title, active, showBabyIcon, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={[active ? styles.button : styles.buttonOutline ]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                { showBabyIcon ? <Image
                    style={{ width: 14, height: 14 }}
                    resizeMode={'contain'}
                    source={active ? babyIcon.active : babyIcon.inactive}
                /> : <Image
                        style={{ width: 14, height: 14 }}
                        resizeMode={'contain'}
                        source={active ? petsIcon.active : petsIcon.inactive}
                    /> }
                
                <Text style={[styles.buttonTitle, active && { color: card }]}>{title}</Text>
            </View>
        </View>
    </TouchableOpacity>
)

const TravelPreferencesView = ({ addressesArray, onChange, onPressNextButton ,onGoBack}) => {
    const [preferences, setPreferences] = useState({
        babys: false,
        pets: false
    });
    const onPressPetsButton = () => {
        let newPreferences = {
            ...preferences,
            pets: !preferences.pets
        }
        setPreferences(newPreferences);
    }
    const onPressBabysButton = () => {
        let newPreferences = {
            ...preferences,
            babys: !preferences.babys
        }
        setPreferences(newPreferences);
    }
    const onPressButton = () => {
        onPressNextButton(preferences);
    }

    return (
        <View style={styles.container}>
<View style={styles.goBack}>
    <Icon2 style={styles.backIcon} onPress={()=>{onGoBack()}} name='arrow-back-circle' />
</View>
            { addressesArray.map((address, index) => (
                <AddressRow key={index} iconRed={index == 0 ? false : true} text={address.format_address} />
                ))}
            <View style={[styles.row, { marginVertical: 20 }]}>
                <View style={styles.preferencesBtnContainer}>
                    <TravelPreferencesButton 
                    title={'Viajo con Mascotas'}
                    active={preferences.pets == true ? true : false}
                    onPress={onPressPetsButton} 
                    />
                </View>
                <View style={styles.preferencesBtnContainer}>
                    <TravelPreferencesButton 
                    showBabyIcon 
                    title={'Viajo con un Bebé'} 
                    active={preferences.babys == true ? true : false} 
                    onPress={onPressBabysButton}
                    />
                </View>
            </View>
            <PrimaryButton
                title="Siguiente"
                onPress={onPressButton}
            />
        </View>
    );
}

export default TravelPreferencesView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: card,
        padding: 20,
        elevation: 3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        /*position:'absolute',
        bottom: 0,*/
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addressText: { 
        marginLeft: 10, 
        fontFamily: 'Sarabun-Medium', 
        color: text, 
        fontSize: 16 
    },
    buttonOutline: {
        height: 36,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: secondary,
        width: '100%',
    },
    button: {
        height: 36,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 18,
        backgroundColor: secondary,
        width: '100%',
    },
    buttonTitle: {
        color: secondary,
        fontFamily: 'Sarabun-Regular',
        fontSize: 14,
        marginLeft: 5
    },
    preferencesBtnContainer: { 
        width: '50%', 
        paddingRight: 5 
    },
    goBack:{
        marginBottom:5,
        width:50,
        },
        backIcon:{
            fontSize:40,
            color:'red',
        },
});