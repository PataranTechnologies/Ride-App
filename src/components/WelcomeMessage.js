import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DefaultTheme from '../constants/DefaultTheme';

const { primary, secondary, text, card } = DefaultTheme.colors;

const { width } = Dimensions.get('screen');

const WelcomeMessage = ({ onIconPress, name }) => (
    <View style={styles.container}>
        <Text style={{ flex: 1 }}>
            <Text style={styles.title}>¡Buenas tardes, {name}!</Text>{"\n"}
            <Text style={styles.description}>¿A dónde deseas ir?</Text>
        </Text>
        <Ionicons.Button
            name="ios-arrow-forward"
            size={28}
            color={primary}
            backgroundColor={card}
            onPress={onIconPress}
        />
    </View>
);

WelcomeMessage.propTypes = {
    name: PropTypes.string.isRequired,
    onIconPress: PropTypes.func.isRequired,
}

export default WelcomeMessage;



const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: card,
        borderRadius: 25,
        elevation: 3,
        paddingVertical: 18,
        paddingLeft: 18,
        paddingRight: 10,
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: (width - 40) 
    },
    title: { 
        fontFamily: 'Sarabun-SemiBold', 
        fontSize: 20, 
        color: text 
    },
    description: { 
        fontFamily: 'Sarabun-Medium', 
        color: secondary, 
        fontSize: 16 
    }
});