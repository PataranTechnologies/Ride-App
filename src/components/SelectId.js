import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import DefaultTheme from '../constants/DefaultTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { card, primary } = DefaultTheme.colors;
const items = [{
        key: '1',
        label: 'ID',
        isEditable: true,
    }, {
        key: '2',
        label: 'Pasaporte',
        isEditable: false,
    }, {
        key: '3',
        label: 'Cédula',
        isEditable: false,
    }, {
        key: '4',
        label: 'Otra',
        isEditable: false,
    }
]

const SelectId = ({ containerStyle, selectedItem, placeholder, onChangeTextInput, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [placeholderText, setPlacelaceholderText] = useState(placeholder);
    const [editable, setEditable] = useState(true);
    const [value, setValue] = useState('');

    const onSelectItem = (text, isEditable) => {
        setValue('');
        setPlacelaceholderText(text);
        setEditable(isEditable);
        setIsOpen(false);
        selectedItem(text);
    }

    const handleTextChange = (text) => {
        setValue(text);
        onChangeTextInput(text);
    }
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 46,
                borderRadius: 25,
                paddingLeft: 20,
                paddingRight: 5,
                }}>
                <TextInput
                    {...rest}
                    value={value}
                    editable={editable}
                    style={styles.textInput}
                    onChangeText={(text) => handleTextChange(text)}
                    placeholderTextColor={primary}
                    placeholder={placeholderText}
                />
                { isOpen === true ? <Ionicons.Button
                    name={'ios-arrow-up'}
                    size={22}
                    color={primary}
                    borderRadius={16}
                    backgroundColor={card}
                    onPress={() => setIsOpen(prevIsOpen => !prevIsOpen)}
                /> : <Ionicons.Button
                        name={'ios-arrow-down'}
                        size={22}
                        color={primary}
                        borderRadius={16}
                        backgroundColor={card}
                        onPress={() => setIsOpen(prevIsOpen => !prevIsOpen)}
                    /> 
                }
            </View>
            { isOpen == true && 
            <View>
                {items.map((item) => {
                    if(placeholderText === item.label) { 
                        return null
                    } else {
                        return (
                            <View key={item.key} style={styles.item}>
                                <TouchableOpacity onPress={() => { onSelectItem(item.label, item.isEditable) }}>
                                    <Text style={styles.textLine}>{item.label}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                }) }
            </View> }
        </View>
    );

}

SelectId.defaultProps = {
    onChangeTextInput: () => {},
}

export default SelectId;

const styles = StyleSheet.create({
    container: {
        backgroundColor: card,
        width: '100%',
        elevation: 3,
        borderRadius: 25,
        marginTop: 20,
    },
    item: {
        borderTopColor: 'gray',
        borderTopWidth: 1,
        paddingHorizontal: 20
    },
    textInput: {
        flex: 1,
        padding: 0,
        fontFamily: 'Sarabun-Medium',
        fontSize: 16
    },
    textLine: {
        fontFamily: 'Sarabun-Medium',
        color: primary,
        fontSize: 16,
    }
});