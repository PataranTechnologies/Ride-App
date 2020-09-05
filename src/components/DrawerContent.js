import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import Octicons from 'react-native-vector-icons/Octicons';
import SharedStyles from '../constants/SharedStyles';
import DefaultTheme from '../constants/DefaultTheme';
import DrawerItem from './DrawerItem';
import { AuthContext } from '../context/context';

const { primary, secondary, text } = DefaultTheme.colors;

export function DrawerContent(props) {
    const { loginState, signOut } = React.useContext(AuthContext);

    const userData = loginState.userData;

    return (
        <View style={SharedStyles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 20  }}>
                        <Image
                            source={{
                                uri: 'http://ride.danthoppruebas.com/public/img/customers/' + userData.photo,
                            }}
                            style={styles.avatar}
                        />
                        <Text style={{ textAlign: 'center'}}>
                            <Text style={styles.text}>{userData.name}</Text>
                            {"\n"}
                            <Text style={[styles.text, { color: primary }]}>
                                Unique ID #{userData.id} 
                            </Text>
                        </Text>
                        <View style={styles.simpleRow}>
                            <Octicons
                                name="star"
                                size={20}
                                color={secondary}
                            />
                            <Text style={styles.rating}>4.85</Text>
                        </View>
                    </View>
                    <DrawerItem 
                        iconName="restore-clock"
                        iconType="material-community"
                        label="Historial de viajes"
                        onPress={() => { props.navigation.navigate('Home') }} 
                    />
                    <DrawerItem
                        iconName="map-marker-alt"
                        iconType='fontisto'
                        label="Mis Direcciones"
                        onPress={() => { props.navigation.navigate('Home') }}
                    />
                    <DrawerItem
                        iconName="ios-card"
                        iconType='ionicons'
                        label="Pagos"
                        onPress={() => { props.navigation.navigate('Home') }}
                    />
                    <DrawerItem
                        iconName="md-settings"
                        iconType='ionicons'
                        label="Preferencias"
                        onPress={() => { props.navigation.navigate('Home') }}
                    />
                    <DrawerItem
                        iconName="ios-help-circle"
                        iconType='ionicons'
                        label="Ayuda"
                        onPress={() => { props.navigation.navigate('Home') }}
                    />
                    <DrawerItem
                        iconName="md-pricetag"
                        iconType='ionicons'
                        label="Promociones"
                        onPress={() => { props.navigation.navigate('Home') }}
                    />
                    <DrawerItem
                        iconName="award"
                        iconType='font-awesome5'
                        label="Visión"
                        onPress={() => { props.navigation.navigate('Home') }}
                    />
                    <DrawerItem
                        disable={true}
                        iconName="brush"
                        iconType='entypo'
                        label="Temas"
                        onPress={() => { //signOut() 
                            props.navigation.navigate('Home')
                            }}
                        showBorder={false}
                    />
                </View>        
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        resizeMode: 'cover',
    },
    text: { 
        fontSize: 22, 
        fontFamily: 'Sarabun-Bold', 
        color: text 
    },
    simpleRow: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    rating: { 
        marginLeft: 5,
        fontFamily: 'Sarabun-Medium',
        fontSize: 16,
        color: secondary 
    }
});