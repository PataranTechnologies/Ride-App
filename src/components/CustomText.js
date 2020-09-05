import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DefaultTheme from '../constants/DefaultTheme';

const { card, primary } = DefaultTheme.colors;

const CustomText = ({ containerStyle, content }) => (
    <View style={[styles.container, containerStyle]}>
        <Text
            style={styles.text}
> {content}</Text>
    </View>
);

export default CustomText;

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
    text: {
        flex: 1,
        padding: 0,
        fontFamily: 'Sarabun-Medium',
        fontSize: 16
    }
});