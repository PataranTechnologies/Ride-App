import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DefaultTheme from '../constants/DefaultTheme';

const { primary, secondary } = DefaultTheme.colors;

const CheckBox = ({
    checked, onPress,
}) => (
    <TouchableOpacity onPress={onPress}>
        <Ionicons
            name={checked ? "md-checkbox" : 'md-square-outline'}
            color={primary}
            size={22}
        />
    </TouchableOpacity>
);

export default CheckBox;
