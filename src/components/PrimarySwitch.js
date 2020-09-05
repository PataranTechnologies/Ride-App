import React from 'react';
import { Switch } from 'react-native';
import DefaultTheme from '../constants/DefaultTheme';

const { card, primary } = DefaultTheme.colors;

const PrimarySwitch = ({
    value, onValueChange, trackColorTrue
}) => (
        <Switch
            trackColor={{ false: "#E1E1E1", true: trackColorTrue ? trackColorTrue: card }}
            thumbColor={value ? primary : "#758592"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onValueChange}
            value={value}
        />
);

export default PrimarySwitch;
