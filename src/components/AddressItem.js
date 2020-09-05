import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import PropTypes from 'prop-types';
import DefaultTheme from '../constants/DefaultTheme';

const { card, header, textInput } = DefaultTheme.colors;

const AddressItem = ({ containerStyle, name, address, onPress, }) => {

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, containerStyle]}>
            <View>
                <View style={styles.row}>
                    <Fontisto
                        name="map-marker-alt"
                        color={header}
                        size={20}
                    />
                    <Text style={styles.name}>{name}</Text>
                </View>
                <Text style={styles.address}>{address.split(',')[0]}</Text>
            </View>
        </TouchableOpacity>
    );
}

AddressItem.propTypes = {
    address: PropTypes.string,
    containerStyle: PropTypes.object,
    name: PropTypes.string,
    onPress: PropTypes.func,
}

AddressItem.defaultProps = {
    onPress: () => {}
}

export default AddressItem;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: card,
        elevation: 3,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        fontFamily: 'Sarabun-SemiBold', 
        fontSize: 18, 
        marginLeft: 10 
    },
    address : {
        fontFamily: 'Sarabun-Regular',
        color: textInput,
        fontSize: 14,
    }
});