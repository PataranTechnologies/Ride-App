import React, { Component } from 'react';
import { View,StyleSheet,TextInput,ScrollView,Image, Text,TouchableOpacity } from 'react-native';
import CustomText from '../../components/CustomText';



const ProfilePage=(props)=>{

    return (
        <View style={styles.container}>
        <View style={styles.innerContainer}>


        <ScrollView showsVerticalScrollIndicator={false} >

<TouchableOpacity style={styles.userImageContainer} onPress={()=>{handleChoosePhoto()}}>
 {<Image  style={styles.userImages} source={{uri:'https://cdn4.vectorstock.com/i/1000x1000/08/33/profile-icon-male-user-person-avatar-symbol-vector-20910833.jpg'}} />}
</TouchableOpacity>

 
 <View style={styles.fieldContainer}>
<Text style={styles.Info}>Unique ID</Text>
<CustomText content={props.user?props.user.UniqueId:""} />
 </View>
 <View style={styles.fieldContainer}>
<Text style={styles.Info}>Nombre </Text>
<CustomText content={props.user?props.user.UniqueId:""} />
 </View>
 <View style={styles.fieldContainer}>
<Text style={styles.Info}>Apellido </Text>
<CustomText content={props.user?props.user.UniqueId:""} />
 </View >
 <View style={styles.fieldContainer}>
<Text style={styles.Info}>Provincia </Text>
<CustomText content={props.user?props.user.UniqueId:""} />
 </View>
 <View style={styles.fieldContainer}>
<Text style={styles.Info}>Celular </Text>
<CustomText content={props.user?props.user.UniqueId:""} /> 

 </View>





            
</ScrollView>
       




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
    
    rowText:{
        width:'100%',
        flexDirection:'row',

        marginTop:20,
        backgroundColor:'white',
        height:50,
        borderRadius:30,
        padding:10,
        paddingLeft:20,
        justifyContent:'center',
        alignItems:'center',

    },
    input:{
        flex:1,
       
    },
    inputWrong:{
        flex:9,
        backgroundColor:'white',
        borderColor:'red',
        borderWidth:2,
        height:50,
        borderRadius:30,
        padding:10,
        paddingLeft:20
    },
   
   

    loginButton:{

        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0000cc',
        padding:15,
        borderRadius:30,
        marginTop:20,
        marginBottom:30,

    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },

    userImageContainer:{
        width:150,
        height:150,
        
        alignSelf:'center',
        marginBottom:20,
    },
    userImages:{
        width:150,
        height:150,
        borderRadius:100,
        
        
    },
    Info:{
        marginTop:5,
        marginBottom:-10,
        color:'#668cff',
        
    },

    fieldContainer:{
        marginTop:5,
        marginBottom:5,
    },

   
   
  
})
export default ProfilePage