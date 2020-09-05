import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DefaultTheme from '../constants/DefaultTheme';

const { primary, card } = DefaultTheme.colors;

const PrimaryButton = ({
    title, onPress, containerStyle, buttonStyle
}) => (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
        <View style={[styles.button, buttonStyle]}>
          <Text style={styles.title}>{title}</Text>
        </View>
    </TouchableOpacity>
);

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: primary
    },
    title: {
        color: card,
        fontFamily: 'Sarabun-Bold',
        fontSize: 16,
    }
});
