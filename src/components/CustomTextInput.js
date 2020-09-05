import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import DefaultTheme from '../constants/DefaultTheme';

const { card, primary } = DefaultTheme.colors;

const CustomTextInput = ({ containerStyle, ...rest }) => (
    <View style={[styles.container, containerStyle]}>
        <TextInput
            {...rest}
            style={styles.textInput}
            placeholderTextColor={primary}
        />
    </View>
);

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        backgroundColor: card,
        height: 46,
        paddingHorizontal: 20,
        width: '100%',
        elevation: 3,
        borderRadius: 25,
        marginTop: 20,
    },
    textInput: {
        flex: 1,
        padding: 0,
        fontFamily: 'Sarabun-Medium',
        fontSize: 16
    }
});