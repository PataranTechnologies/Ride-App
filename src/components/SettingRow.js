import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimarySwitch from './PrimarySwitch';
import DefaultTheme from '../constants/DefaultTheme';

const { card, primary, text } = DefaultTheme.colors;

const SettingRow = ({
    value, onValueChange, title, iconName, iconType,
}) => (
        <View style={styles.container}>
                <View style={styles.row}>
                    <MaterialCommunityIcons
                        name="cash"
                        color={primary}
                        size={28}
                    />
                    <Text style={styles.optionText}> Efectivo</Text>
                </View>
                <PrimarySwitch
                    trackColorTrue={"#E1E1E1"}
                    onValueChange={onValueChange}
                    value={value}
                />
        </View>
);

export default SettingRow;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: 46,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: card,
        paddingLeft: 20,
        paddingRight: 10,
        elevation: 3,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    optionText: {
        fontFamily: 'Sarabun-Medium',
        fontSize: 18,
        color: text,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});