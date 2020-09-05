import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import DefaultTheme from '../constants/DefaultTheme';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const { card, primary } = DefaultTheme.colors;

const TextInputIconRight = React.forwardRef(({ containerStyle, iconName, refName, ...rest }, ref) => (
    <View style={[styles.container, containerStyle]}>
      <TextInput 
      {...rest} 
      placeholderTextColor={primary}
      ref={ref}
      style={styles.textInput}
      />
      <MaterialCommunity
        name={iconName}
        size={18}
        color={primary}
      />
    </View>
  ));

export default TextInputIconRight;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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