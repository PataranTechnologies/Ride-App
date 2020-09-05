import React from 'react';
import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DefaultTheme from '../constants/DefaultTheme';
import Fontisto from 'react-native-vector-icons/Fontisto';

const { header, secondary, text } = DefaultTheme.colors;

const DrawerItem = ({
    disable, iconName, iconSize, iconType, label, onPress, showBorder,
}) => (
        <View style={[styles.drawerItemContainer, showBorder && styles.border]}>
        <TouchableOpacity onPress={onPress}>
            <View style={styles.drawerItem}>
                { iconType === 'material-community' && <MaterialCommunityIcons
                    name={iconName}
                    color={header}
                    size={iconSize}
                /> }
                { iconType === 'entypo' && <Entypo 
                    name={iconName}
                    color={ disable ? secondary : header}
                    size={iconSize}
                /> }
                { iconType === 'material-icons' && <MaterialIcons
                        name={iconName}
                        color={header}
                        size={iconSize}
                    /> }
                { iconType === 'ionicons' && <Ionicons
                    name={iconName}
                    color={header}
                    size={iconSize}
                /> }
                { iconType === 'font-awesome5' && <FontAwesome5
                        name={iconName}
                        color={header}
                        size={iconSize}
                    /> }
                { iconType === 'fontisto' && <Fontisto
                    name={iconName}
                    color={header}
                    size={iconSize}
                />}
                <Text style={[styles.label, disable && { color: secondary }]}>{ label }</Text>
            </View>
        </TouchableOpacity>
    </View>
);

DrawerItem.defaultProps = {
    iconSize: 20,
    iconType: 'material-community', 
    label: 'Label', 
    onPress: () => {},
    showBorder: true,
}

DrawerItem.propTypes = {
    iconName: PropTypes.string.isRequired,
    iconSize: PropTypes.number,
    iconType: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    showBorder: PropTypes.bool, 
}

export default DrawerItem;

const styles = StyleSheet.create({
    border: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    drawerItemContainer: {
        paddingHorizontal: 10,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
    label: {
        marginLeft: 10,
        fontFamily: 'Sarabun-Medium',
        fontSize: 16,
        color: text,
    },
});