import React from 'react';
import {  StyleSheet, TextInput, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DefaultTheme from '../constants/DefaultTheme';
import { Header } from 'react-native/Libraries/NewAppScreen';

const { card, primary, header } = DefaultTheme.colors;

const TextInputIconLeft = ({containerStyle, iconRed, ...props}) => (
    <View style={[styles.inputContainer, containerStyle]}>
        <Fontisto
            name="map-marker-alt"
            color={ iconRed ? header : primary}
            size={20}
        />
        <TextInput
            {...props}
            style={styles.input}
        />
    </View>
);

export default TextInputIconLeft;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: card,
        height: 46,
        paddingHorizontal: 20,
        elevation: 3,
        borderRadius: 25,
        marginTop: 20,
    },
    input: { 
        flex: 1, 
        fontSize: 16, 
        fontFamily: 'Sarabun-Medium', 
        padding: 0, 
        marginLeft: 10,
        width: '100%' 
    }
});