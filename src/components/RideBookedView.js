import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import DefaultTheme from '../constants/DefaultTheme';
import PrimaryButton from './PrimaryButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import DialogToEnterCoupon from './DialogToEnterCoupon';
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialIcons'

import Icon4 from 'react-native-vector-icons/FontAwesome5'
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

const RideBookedView = ({onPressButton, onCommunication,onCancel,addStopViewActivate,navigation}) => {
    
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
        <View style={styles.searchRideView}>

<View style={{flexDirection:'row',justifyContent:'center'}}>
    <View style={styles.conductorProfilePhoto}>
        <Image source={{ uri: 'https://cdn4.vectorstock.com/i/1000x1000/08/33/profile-icon-male-user-person-avatar-symbol-vector-20910833.jpg' }}
          style={{width:90,height:90,borderRadius:90,marginRight:5,}}
          />
        </View>
 <View style={styles.conductorInfo}>   
<Text style={styles.newRequest}>Manuel Ramirez</Text>
<View style={styles.ratingRow}>
            <Icon name='star' style={styles.star} />
            <Text style={styles.RideFoundText}>4.85</Text>

            </View>

<Text>Chervlet Spark Azul</Text>

<Text style={{fontWeight:'bold'}}>SWZ-321-B</Text>
<Text style={{color:'gray',fontSize:12,}}> A 6 Minutos de distancia</Text>

</View>



</View>
<View style={styles.locationRow}>

<Icon2 style={styles.locationIcon} name='location-sharp' />

<Text style={{color:'black',borderBottomColor:'gray',borderBottomWidth:1,width:'90%',fontSize:17,paddingBottom:2,}} >Av Palmar No. 230</Text>
    </View>

<View style={styles.RideFoundButtons}>
   
                               <View style={styles.cancelRideButton}>
                               <TouchableOpacity  onPress={()=>{onCancel()}}>
                          
          
                               <Text style={styles.ButtonTextc}>Cancelar Viaje</Text>
                            
        
                               </TouchableOpacity>
                               </View>

<View style={styles.rideAcceptButton}>
                               <TouchableOpacity  onPress={()=>{addStopViewActivate()}}>
                          
          
                          <Text style={styles.ButtonTexta}>Agregar Parda</Text>
                       
   
                          </TouchableOpacity>
</View>


 </View>

 <Icon onPress={()=>{onCommunication()}} style={{position:'absolute',top:25,right:35,fontSize:25,color:'#002db3'}} name='chat' />
 <Icon2 onPress={()=>{onCommunication()}} style={{position:'absolute',top:20,left:35,fontSize:25,color:'#002db3'}} name='share-social' />
   
    </View>
  
    );
}

export default RideBookedView;

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
    conductorProfilePhoto:{

        alignItems:'center',
        justifyContent:'center',

    },
    RideFoundButtons:{
        flexDirection:'row',
        marginTop: 10,
    },
    cancelRideButton:{
        flex:1,
        margin:5,
        borderColor:'blue',
  borderWidth:1,
  padding:10,
  borderRadius:30,
  justifyContent:'center',
  alignItems:'center',
  color:'#b32d00',
    },

    rideAcceptButton:{
  flex:1,
  margin:5,
  padding:10,
  borderRadius:30,
  backgroundColor:'blue',
  justifyContent:'center',
  alignItems:'center',
   
  
    },
  
    searchRideView:{
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        backgroundColor:'white',
      
        padding:30,

    },
    locationRow:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
    },
    locationIcon:{
        fontSize:20,
      
        color:'red',
    },
    ratingRow:{
        flexDirection:"row",
          alignItems:'center'
    },
    star:{
        fontSize:18,
        color:'gray',
    },
    rating:{
        marginLeft:3,
        color:'gray'

    },

    RideFoundText:{
        color:'gray',
    },
    
  ButtonTextc:{
      color:'blue'
  },
  ButtonTexta:{
      color:'white'
  },
});