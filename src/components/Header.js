import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DefaultTheme from '../constants/DefaultTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { card, header } = DefaultTheme.colors;

const Header = ({
    title, enableBackButton, customOnPress
}) => {
    

    const onPressBackButton = () => {
        const navigation = useNavigation();
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={{paddingLeft: 10, justifyContent: 'center', width: 50, height: 40}}>
                <Ionicons.Button
                    onPress={enableBackButton ? onPressBackButton : customOnPress }
                    backgroundColor={header}
                    color={card}
                    name="ios-arrow-back"
                    size={28}
                />
            </View>
            <View style={{flex: 1, marginRight: 50}}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
}

Header.defaultProps = {
    enableBackButton: true
}

export default Header;

const styles = StyleSheet.create({
   container: {
       flexDirection: 'row',
       alignItems: 'center',
       height: 100,
       backgroundColor: header,
       borderBottomLeftRadius: 26,
       borderBottomRightRadius: 26,
   },
   title: {
       fontFamily: 'Sarabun-SemiBold',
       fontSize: 22,
       color: card,
       textAlign: 'center',
   } 
});