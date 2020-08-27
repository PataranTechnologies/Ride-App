import React, { Component, useState } from 'react';
import { View,StyleSheet,TextInput, Modal,Text,TouchableOpacity } from 'react-native';
import  Icon  from 'react-native-vector-icons/FontAwesome';



const Referal=(props)=>{

    const [coupon,setCoupon]=useState("")
    const [coupenApplied,setCouponApplied]=useState(false);

const onCouponApply=()=>{

    //some task
    setCouponApplied(true);
}

    return (
        <View style={styles.container}>
            {
                   coupenApplied? <Modal
                   transparent={true}
                   animationType="fade"
                   onRequestClose={() => {setCouponApplied(false)}}
                   visible={coupenApplied}>
                     
                  <View style={styles.modalBackground}>
                  <View style={styles.activityIndicatorWrapper}>
                      
                       <View style={styles.danger}>
                           <Text style={styles.dangerText}>✔</Text>
                       </View>

        <Text style={styles.modalHeader}>Cupon Canjeado!</Text>
            <Text style={styles.modalMessage}>El cupon se aplicara{'\n'} en tu proximo viaje</Text>
         
                      </View></View>
                 
                  </Modal>:null
                }
        <View style={styles.innerContainer}>

<View style={styles.halfCover}>

      
      
      <View>
       <Text style={styles.referalHeader}>¿Tienes un cupon? iCanjealo aqui!</Text>
      <Text style={styles.referalCoup}>Ingresar Cupon</Text>
</View>
       <TextInput style={styles.couponInput} placeholder='Escribe aqui' value={coupon} onChangeText={(Text)=>{setCoupon(Text)}} />
       

       <TouchableOpacity onPress={()=>{onCouponApply()}}  style={styles.save}>

<Text style={styles.buttonText}>Canjea</Text>

</TouchableOpacity>

</View>


<View style={styles.secondHalfCover}>

       
      <View>
       <Text style={styles.referalShareHeader}>Comparte tu Codigo</Text>
       <Text style={styles.referalCoupCode}>{props.user?props.user.referalCode:"XW4Fg"}</Text>
</View>
       <TouchableOpacity  style={styles.share}>

<Text style={styles.buttonText}>Compartir</Text>
<Icon name='share-alt' style={styles.shareIcon} />
</TouchableOpacity>
<Text  style={styles.referalInfo}>iHagamos que crezca la comunidada! {'\n'} invita a tus amigos y familiares {'\n'} a utilizar la app de Ride</Text>
</View>




     </View>
         </View>
    );
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#e6f2ff',
        flex:1,
        
    },
    innerContainer:{
        
        margin:20,
        marginTop:30,
        padding:10
    },
    save:{

        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0000cc',
        padding:15,
        borderRadius:30,
        marginTop:30,
        
    },

    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20

    },
    referalCoup:{
     alignSelf:'center',
     marginTop:20,
     marginBottom:20,
     fontWeight:'bold',
     fontSize:22,
    },
    referalHeader:{
        alignSelf:'center',
        marginTop:20,
     color:'gray',
     fontSize:17,
    },
    couponInput:{
        textAlign:'center',
        backgroundColor:'white',
        borderRadius:30,
    },
    halfCover:{
        height:'50%'
    },
    referalInfo:{
        textAlign:'center',
        marginTop:20,
        color:'gray',
        fontSize:16
    },
    referalShareHeader:{
        fontSize:20,
        alignSelf:'center',
        fontWeight:'bold',

    },
    referalCoupCode:{
        fontSize:35,
        alignSelf:'center',
        fontWeight:'bold',
        color:'#002db3'
    },
    secondHalfCover:{
        height:'50%',
        paddingTop:20,
    },
    
    share:{

        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0000cc',
        padding:15,
        borderRadius:30,
        marginTop:10,
        flexDirection:'row',
        
    },
    shareIcon:{

        fontSize:18,
        color:'white',
        marginLeft:10,
        

    },
    danger:{
        width:80,
        height:80,
        borderRadius:80,
        backgroundColor:'#cc0000',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    },
    dangerText:{
        color:'white',
        fontSize:40,
        fontWeight:"bold"
    },
    modalHeader:{
        marginTop:10,
        fontWeight:'bold',
        textAlign:'center',
        fontSize:23,
    },
    modalMessage:{
        color:'gray',
        fontSize:20,
        textAlign:'center',
        marginTop:20,
    },



    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000080'
      },

      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
       padding:40,
        borderRadius: 30,
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        margin:30,

      },
    Button:{

        
    
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0000cc',
        padding:18,
        borderRadius:30,
        marginTop:20,
        marginBottom:30,
        


        

    },
})
export default Referal