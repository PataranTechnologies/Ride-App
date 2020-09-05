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

const AddStopsView = (props) => {
    const [addresses,setAddresses]=useState(props.addresses)
    const saveStops=()=>{

         props.onconfirm(addresses);
    }
  
    return (
        <View style={styles.searchRideView}>

            <Text style={{fontSize:25,fontWeight:'bold'}}>Agargar Parda</Text>
   
          {
              addresses.map((address,i)=>
              {

                return (
                    <View>
                        <Icon />


                        <View>
                            <Text>

                               </Text>


                            </View>




                        </View>
                )


              })
          }

<View style={{marginTop:10,}}>
          <PrimaryButton onPress={()=>saveStops()} title='Actualizar' />
</View>
    </View>
  
    );
}

export default AddStopsView;

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