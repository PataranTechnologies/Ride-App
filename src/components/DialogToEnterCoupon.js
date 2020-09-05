import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import DefaultTheme from '../constants/DefaultTheme';
import PrimaryButton from './PrimaryButton';
import APIKit from '../utils/APIKit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BallIndicator } from 'react-native-indicators';

const { colors } = DefaultTheme;

const icon = {
    error: require('../../assets/images/alert_ic.png'),
    success: require('../../assets/images/good.png'),
}

const DialogToEnterCoupon= ({isVisible, onBackButtonPress, onPressCloseIcon}) => {
    const defaultContent = {
        type: 'input',
        icon: 'success',
        title: '',
        description: ''
    }
    const [coupon, setCoupon] = useState('');
    const [content, setContent] = useState(defaultContent);
    const [ isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(isVisible === true) {
            setContent(defaultContent);
            setCoupon('');
        }
    },[isVisible]);

    const sendCoupon = () => {
        if(coupon !== '') {
            setIsLoading(true);
            let data = new FormData();
            data.append('code', coupon.trim());
            APIKit.post('/customer/promoCode', data)
            .then(({data}) => {
                console.log('Response Data Cupón: ', data);
                setIsLoading(false);
                if (data.success === 'Codigo ' + coupon.trim() +' canjeado correctamente') {
                    setContent({
                        type: 'alert',
                        icon: 'success',
                        title: '¡Cupón Canjeado!',
                        description: 'El cupon se aplicará en tu viaje'
                    });
                }
            })
            .catch((error) => {
                console.log('error Cupón, ', error);
                console.log(JSON.stringify(error));
                console.log(error.response.data);
                setIsLoading(false);
                if(error?.response?.data){
                    if (error.response.data.error == 'Código no valido') {
                        setContent({
                            type: 'alert',
                            icon: 'error',
                            title: '¡Cupón No Válido!',
                            description: 'El cupon ingresado no es válido'
                        });
                    }
                } else {
                    setContent({
                        type: 'alert',
                        icon: 'error',
                        title: 'Error',
                        description: error.message
                    });
                }
            })
        }
    }
    const onPressClose = () => {
        if (content.type == 'alert' && content.icon == 'error'){
            setContent(defaultContent);
        }else {
            onPressCloseIcon();
        }
    }

    return (
        <Modal isVisible={isVisible} onBackButtonPress={onBackButtonPress}>
            <View style={styles.content}>
                { isLoading ? <View style={styles.progressContainer}>
                    <BallIndicator color={colors.header} size={50} />
                </View> : content.type == 'input' ? <View>
                    <Text style={styles.title}>Ingresar Cupón</Text>
                    <TextInput
                        placeholder={'Cupón'}
                        placeholderTextColor={colors.text}
                        style={styles.textInput}
                        onChangeText={(text) => { setCoupon(text) }}
                        value={coupon}
                    />
                    <PrimaryButton
                        title='Aceptar'
                        containerStyle={{ marginTop: 20 }}

                        onPress={sendCoupon}
                    />
                </View> : <View>
                        <Image
                            source={icon[content.icon]}
                            style={styles.icon}
                        />
                        <Text style={[styles.title, { fontSize: 18 }]}>{content.title}</Text>
                        <Text style={styles.description}>{content.description}</Text>
                </View>
                }
                { isLoading ? null : <TouchableOpacity onPress={onPressClose} style={styles.closeIconAbsoluteContainer}>
                    <View style={styles.closeIconContainer}>
                        <Ionicons
                            name='md-close-circle'
                            size={24}
                            color={colors.text}
                        />
                    </View>
                </TouchableOpacity>
                }
            </View>
        </Modal>
    );
}

export default DialogToEnterCoupon;

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    description: {
        fontFamily: 'Sarabun-Regular',
        fontSize: 16,
        color: colors.description,
        textAlign: 'center'
    },
    icon: { 
        width: 60, 
        height: 60, 
        resizeMode: 'contain', 
        alignSelf: 'center' 
    },
    title: {
        fontFamily: 'Sarabun-SemiBold',
        fontSize: 24,
        textAlign: 'center',
        color: colors.text,
    },
    textInput: { 
        width: '100%', 
        fontSize: 16, 
        textAlign: 'center', 
        borderRadius: 23, 
        backgroundColor: '#edf5fc', 
        fontFamily: 'Sarabun-Medium' 
    },
    closeIconAbsoluteContainer: { 
        position: 'absolute', 
        top: 6, 
        right: 6 
    },
    closeIconContainer: { 
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    progressContainer: {
        width: 60,
        height: 60,
        alignSelf: 'center'
    }
});