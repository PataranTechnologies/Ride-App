import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DefaultTheme from '../constants/DefaultTheme';
import PrimaryButton from './PrimaryButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DialogToEnterCoupon from './DialogToEnterCoupon';

const { card, header, primary, secondary, text } = DefaultTheme.colors;

const cardIcon = {
    active: require('../../assets/images/card_white.png'),
    inactive: require('../../assets/images/card.png')
}

const icons = {
    cash: {
            active: require('../../assets/images/cash_white.png'),
            inactive: require('../../assets/images/cash.png')
    },
    card: cardIcon,
    credit: cardIcon,
    coupon: {
        active: require('../../assets/images/coupon_white.png'),
        inactive: require('../../assets/images/coupon.png')
    }
}

const vehicleIcons = {
    chuzo: {
        active: require('../../assets/images/chuzo_white.png'),
        inactive: require('../../assets/images/chuzo.png')
    },
    chunchon: {
        active: require('../../assets/images/chunchon_white.png'),
        inactive: require('../../assets/images/chunchon.png')
    },
}

const labels = {
    cash: 'Efectivo',
    card: 'Tarjeta',
    credit: 'Crédito',
    coupon: 'Cupón'
}

const vehicleLabels = {
    chuzo: 'Chuzo',
    chunchon: 'Chunchon'
}

const PaymentButton = ({type,  status, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={status == 'active' ? styles.paymentButton : styles.paymentButtonOutline}>
            <View style={styles.row}>
                <Image 
                   source={icons[type][status]}
                   resizeMode={'contain'}
                   style={styles.paymentButtonIcon} 
                />
                <Text style={[styles.paymentButtonText, status == 'active' && { color: card }]}>{labels[type]}</Text>
            </View>
        </View>
    </TouchableOpacity>
)

const VehicleTypeButton = ({ type, status, onPress, price }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={status == 'active' ? styles.vehicleTypeButton : styles.vehicleTypeButtonOutline}>
            <View style={[styles.row, { alignItems: 'baseline' }]}>
                <Image
                    source={vehicleIcons[type][status]}
                    resizeMode={'contain'}
                    style={styles.vehicleIcon}
                />
                <Text style={[styles.vehicleTypeButtonText, status == 'active' && { color: card }]}>{vehicleLabels[type]}</Text>
            </View>
            <Text style={[styles.vehicleTypeButtonPrice, status == 'active' && { color: card }]}>₡ {price}</Text>
        </View>
    </TouchableOpacity>
)

const RequestTravelView = ({onPressButton, onChange,navigation}) => {
    
    const [paymentMethods, setPaymentMethods] = useState({
        cash: 'active',
        card: 'inactive',
        credit: 'inactive',
        coupon: 'inactive'
    });

    const [vehicleType, setVehiculeType] = useState({
        chuzo: 'inactive',
        chunchon: 'active'
    })

    const[isVisibleDialog, setIsVisibleDialog] = useState(false);

    const onPressCashButton = () => {
        setPaymentMethods({
            cash: 'active',
            card: 'inactive',
            credit: 'inactive',
            coupon: 'inactive'
        });
    }
    const onPressCardButton = () => {
        setPaymentMethods({
            cash: 'inactive',
            card: 'active',
            credit: 'inactive',
            coupon: 'inactive'
        });
    }
    const onPressCreditButton = () => {
        setPaymentMethods({
            cash: 'inactive',
            card: 'inactive',
            credit: 'active',
            coupon: 'inactive'
        });
       navigation.navigate('BuyCredit');
    }
    const onPressCouponButton = () => {
        setPaymentMethods({
            cash: 'inactive',
            card: 'inactive',
            credit: 'inactive',
            coupon: 'active'
        });
        setIsVisibleDialog(true);
    }
    const onPressChuzoButton = () => {
        setVehiculeType({
            chuzo: 'active',
            chunchon: 'inactive'
        });
    }
    const onPressChunchonButton = () => {
        setVehiculeType({
            chuzo: 'inactive',
            chunchon: 'active'
        });
    }

    const onPressRequestButton = () => {
        let paymentMethodKeys = Object.keys(paymentMethods);
        let paymentMethod;
        let vehicleTypeKeys = Object.keys(vehicleType);
        let vehicle;
        paymentMethodKeys.forEach((key) => {
            if(paymentMethods[key] == 'active'){
                paymentMethod = key;
            }
        });
        vehicleTypeKeys.forEach((key) => {
            if (vehicleType[key] == 'active') {
                vehicle = key;
            }
        });
        onPressButton({paymentMethod, vehicle});
    }

    const hideDialog = () => {
        setIsVisibleDialog(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textSemiBold}>Método de Pago</Text>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <PaymentButton type="cash" status={paymentMethods.cash} onPress={onPressCashButton} />
                <PaymentButton type="card" status={paymentMethods.card} onPress={onPressCardButton} />
                <PaymentButton type="credit" status={paymentMethods.credit} onPress={onPressCreditButton} />
                <PaymentButton type="coupon" status={paymentMethods.coupon} onPress={onPressCouponButton} />
            </View>
            <Text style={styles.textSemiBold}>Tipo de Vehículo</Text>
            <View style={[styles.row, { marginBottom: 20 }]}>
                <VehicleTypeButton type={'chuzo'} status={vehicleType.chuzo} price="800.00" onPress={onPressChuzoButton} />
                <View style={{ width: 20}} />
                <VehicleTypeButton type={'chunchon'} status={vehicleType.chunchon} price="1200.00" onPress={onPressChunchonButton} />
            </View>
            <PrimaryButton
                title="Solicitar Viaje"
                onPress={onPressRequestButton}
            />
            <DialogToEnterCoupon
                isVisible={isVisibleDialog}
                onPressCloseIcon={hideDialog}
            />
        </View>
    );
}

export default RequestTravelView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: card,
        padding: 20,
        elevation: 3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        /*position:'absolute',
        bottom: 0,*/
        width: '100%'
    },
    textSemiBold: { 
        fontFamily: 'Sarabun-Bold', 
        fontSize: 15 
    },
    paymentButton: {
        height: 26,
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 13,
        backgroundColor: secondary,
        width: '100%',
    },
    paymentButtonOutline: {
        height: 26,
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: secondary,
        width: '100%',
    },
    row: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    paymentButtonIcon: { 
        width: 14, 
        height: 14 
    },
    paymentButtonText: { 
        marginLeft: 4, 
        fontSize: 12, 
        color: secondary, 
        fontFamily: 'Sarabun-Regular' 
    },
    vehicleTypeButton: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 14,
        backgroundColor: secondary,
        width: '100%',
        minWidth: 140
    },
    vehicleTypeButtonOutline: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: secondary,
        width: '100%',
        minWidth: 140
    },
    vehicleIcon: {
        width: 24,
        height: 20
    },
    vehicleTypeButtonText: {
        marginLeft: 4,
        fontSize: 14,
        color: secondary,
        fontFamily: 'Sarabun-SemiBold',
        lineHeight: 20,
    },
    vehicleTypeButtonPrice: { 
        fontFamily: 'Sarabun-Regular', 
        color: secondary, 
        marginLeft: 29, 
        fontSize: 12, 
        lineHeight: 16 
    }
});