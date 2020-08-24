import React, { Component, useState } from 'react';
import { View, StyleSheet,Text, Image, Linking  } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo'
const LoginScreen =(props)=> {
    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

const onForgot=()=>{
  Linking.openURL("http://ride.rideapp.com/forgot").catch(err=>{

  alert("Some Error Occured,Can't Change password,Try Again");
  })    
    }


   const onLogin=()=>
    {
        props.navigation.navigate('MainApp')
    }



    
        return ( <View style={styles.container}>


<View style={styles.loginHeader}>
              
                <View style={styles.headerBack}>

                    <Image style={styles.headerImage} source={require('../../images/car.jpg')} />

                    </View>

                </View>

                <View>

                    <View style={styles.loginForm}>

                        <View style={styles.mainForm}>

                            <Text style={styles.formHeader}>Bienvenido a Ride!</Text>
                            <Text style={styles.formInnerHeader}> inicia Sesion para continuar</Text>

                            <View style={styles.rowInput}>
                           <TextInput style={styles.input} value={email} onChangeText={(text)=>setEmail(text)}  placeholder='Enter Email' />
                           <View style={styles.Icon}>
                           <Icon  name='mail' size={20} />
                            </View>
                            </View>
                            
                            <View style={styles.rowInput}>
                           <TextInput secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)} style={styles.input}  placeholder='Enter Password' />
                           <View style={styles.Icon}>
                           <Icon  name='lock' size={20} />
                            </View>
                           </View> 

                           <View style={styles.forgot}>
                             <Text style={styles.forgotText1}>¿Olvidas tu contrasena?</Text>
                             <Text onPress={()=>onForgot()} style={styles.forgotText2}>Recuperala</Text>
                           </View>

                           <TouchableOpacity onPress={()=>{onLogin()}} style={styles.loginButton}>

                               <Text style={styles.buttonText}>Entrar</Text>

                               </TouchableOpacity>


                               <View  style={styles.registerView}>
                               <Text style={styles.rvText1}>¿No tienes una cuenta?</Text>
                             <Text onPress={()=>props.navigation.navigate("PhoneVerifyScreen")} style={styles.rvText2}>Registrate</Text>
                          

                                   </View>


                            </View>

                            <View style={styles.mainForm}>


</View>
</View>
                        </View>

            </View> );
    }


const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#e6f2ff',
    },

    loginHeader:{
    width:'100%',
    height:'20%',
  
    },
    headerBack:{
        backgroundColor:'#cc3300',
        width:'100%',
        height:'100%',
        alignItems:'center',
        borderBottomEndRadius:30,
        borderBottomLeftRadius:30,
        flexDirection:'column-reverse'
        
    },
    headerImage:{
        marginBottom:-60,
        
        width:120,
        height:120,
        borderRadius: 120 ,

    },
    loginForm:{
        margin:20,
        marginTop:90,

        padding:10

    },

    formHeader:{
        fontSize:30,
        fontWeight:'bold',
        alignSelf:'center'
    },
    formInnerHeader:{

        fontSize:14,
        color:'gray',
        alignSelf:'center'
    },
    

    rowInput:{
        width:'100%',
        flexDirection:'row',

        marginTop:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    input:{
        flex:9,
        backgroundColor:'white',

        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
        padding:10,
        paddingLeft:20
    },
    Icon:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        borderTopRightRadius:30,
        borderBottomRightRadius:30,

        
    },
    forgot:{

        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        
        marginTop:20,



    },
    forgotText1:{

        color:'gray',

    },forgotText2:{

        color:'black',
        fontWeight:"bold"

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


        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 10,

    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },
    registerView:{
        justifyContent:'center',
        alignItems:'center',
       marginTop:20,
        alignSelf:"stretch"
    },
    rvText1:{
        color:'gray',
    },
    rvText2:{
        color:'black',
        fontWeight:'bold',
        fontSize:20
    },


})
 
export default LoginScreen;