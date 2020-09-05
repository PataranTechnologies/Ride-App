import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import DefaultTheme from '../constants/DefaultTheme';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { card, primary, header, text } = DefaultTheme.colors;

const GooglePlacesInput = React.forwardRef(({ containerStyle, pinRed, onPressIcon, onPressMapMarker, onPressRemoveIcon, minusIcon, showRightIcon, ...props }, ref) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.inputContainer}>
                <TouchableHighlight underlayColor={'#c8c7cc'} style={styles.pinIconContainer} onPress={onPressMapMarker}>
                    <Fontisto
                        name="map-marker-alt"
                        color={pinRed ? header : primary}
                        size={20}
                    />
                </TouchableHighlight>
                <TextInput
                    {...props}
                    ref={ref}
                    style={styles.input}
                />
            </View>
            <View style={{ width: 40 }}>
                {showRightIcon == true ? <TouchableOpacity
                    onPress={onPressIcon}
                    style={styles.iconContainer}>
                    <Entypo
                        name={minusIcon ? 'minus' : 'plus'}
                        size={28}
                        color={primary}
                    />
                </TouchableOpacity> : null}
            </View>
        </View>
    );
});

GooglePlacesInput.defaultProps = {
    onPressIcon: () => {},
    onPressMapMarker: () => {},
    onPressRemoveIcon: () => {},
    minusIcon: false,
    showRightIcon: true,
}

export default GooglePlacesInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: card,
        height: 46,
        elevation: 3,
        borderRadius: 25,
        flex: 1
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Sarabun-Medium',
        padding: 0,
        marginLeft: 0,
        marginRight: 20,
        width: '100%'
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    pinIconContainer: { 
        paddingLeft: 6, 
        width: 40, 
        height: 46, 
        borderTopLeftRadius: 23, 
        borderBottomLeftRadius: 23, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    closeIconContainer: {
        paddingRight: 6,
        width: 30,
        height: 46,
        borderTopRightRadius: 23,
        borderBottomRightRadius: 23,
        alignItems: 'center',
        justifyContent: 'center'
    }
});