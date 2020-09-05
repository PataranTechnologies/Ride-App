import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';
import DefaultTheme from '../constants/DefaultTheme';

const { card, header } = DefaultTheme.colors;


const ButtonMenu = () => {
    const navigation = useNavigation();
    
    return (
        <View style={[styles.menuContainer, styles.menuSubContainer]}>
            <TouchableOpacity style={styles.menuSubContainer} onPress={() => navigation.openDrawer()}>
                <Entypo
                    name="menu"
                    size={28}
                    color={header}
                />
            </TouchableOpacity>
        </View>
    );
}

export default ButtonMenu;

const styles = StyleSheet.create({
    menuContainer: {
        backgroundColor: card,
        position: 'absolute',
        top: 20,
        left: 20,
        elevation: 3,

    },
    menuSubContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});