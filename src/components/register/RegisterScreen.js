import React, { Component, useState } from 'react';
import { Switch, Image,View, StyleSheet,Text, Linking ,TextInput } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo'
import ImagePicker from 'react-native-image-picker'
import { color } from 'react-native-reanimated';
 const RegisterScreen=(props)=> {
    
     const [photo,setPhoto]=useState(null)
     const [upload,setUpload]=useState(false)
     const [idType,setIdType]=useState()
     const [id,setId]=useState('')
     const [firstName,setFirstName]=useState('')
     const [lastName,setLastName]=useState('')
     const [ province,setProvince]=useState('')
     const [email,setEmail]=useState('')
     const [password,setPassword]=useState('')
     const [twoStep,setTwoStep]=useState(false)
     const [passwordSame,setPasswordSame]=useState(true);
     const onSubmit=()=>{
        props.navigation.navigate('PayInfo')
     }

     handleChoosePhoto = () => {
        const options = {
          noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
          if (response.uri) {
            setPhoto(response);
            setUpload(true);
          }
        })
      }

     const passwordVerify=(pass)=>{
         
        if(pass===password)
        {
         setPasswordSame(true)
        }
        else
        {
         setPasswordSame(false)
        }
     }
  
        return ( <View style={styles.container}>


            <ScrollView showsVerticalScrollIndicator={false}  style={styles.innerContainer}>

            <TouchableOpacity style={styles.userImageContainer} onPress={()=>{handleChoosePhoto()}}>
             {!upload?<Image style={styles.userImages} source={require('../../../images/camera.png')} />:<Image  style={styles.userImages} source={{uri:photo.uri}} />}
            </TouchableOpacity>


            <View style={styles.rowInput}>
                           <TextInput  value={id} onChangeText={(text)=>{setId(text)}} secureTextEntry={true} style={styles.input}  placeholder='Id' />
                           
                           </View> 

            <View style={styles.rowInput}>
                           <TextInput value={firstName} onChangeText={(text)=>{setFirstName(text)}} secureTextEntry={true} style={styles.input}  placeholder='Nombre' />
                           
                           </View> 
            <View style={styles.rowInput}>
                           <TextInput value={lastName} onChangeText={(text)=>{setLastName(text)}} secureTextEntry={true} style={styles.input}  placeholder='Apellido' />
                          
                           </View> 
            <View style={styles.rowInput}>
                           <TextInput value={province} onChangeText={(text)=>{setProvince(text)}} secureTextEntry={true} style={styles.input}  placeholder='Provincia' />
                           
                           </View> 
           <View style={styles.rowInput}>
                           <TextInput value={email} onChangeText={(text)=>{setEmail(text)}} secureTextEntry={true} style={styles.input}  placeholder='Correo Electronico' />
                           
                           </View> 
            <View style={styles.rowInput}>
                           <TextInput value={password} onChangeText={(text)=>{setPassword(text)}} secureTextEntry={true} style={styles.input}  placeholder='Contrasena' />
                          
                           </View> 
            <Text style={styles.passwordInfo}>la contrasena debe tenar minimo 8 caracteres </Text>
            <View style={styles.rowInput}>
                           <TextInput  onChangeText={(text)=>{passwordVerify(text)}} secureTextEntry={true} style={passwordSame?styles.input:styles.inputWrong}  placeholder='Confirmar contrasena' />
                          
                           </View> 

            <View style={styles.row}>
                <Text style={styles.regTextRegister}>¿Aplicar verificacion en dos pasos?</Text>
                <Switch value={twoStep} onValueChange={()=>{setTwoStep(!twoStep)}}  style={styles.switch} />
                </View>




            <TouchableOpacity onPress={()=>onSubmit()} style={styles.loginButton}>

<Text style={styles.buttonText}>Registrarme</Text>

</TouchableOpacity>
          
            
                        
            </ScrollView>
                        </View> );
    }

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#e6f2ff',
        flex:1,
        
    },
    innerContainer:{
        
        margin:20,
        marginTop:0,

        paddingTop:30
    },
    phone:{
        width:'100%',
        flexDirection:'row',

    },
    countryCode:{
        flex:4,
    },
    phoneNo:{
        flex:6,
        
        
    },
    rowInput:{
        width:'100%',
        flexDirection:'row',

        marginTop:20
        

    },
    input:{
        flex:9,
        backgroundColor:'white',
        height:50,
        borderRadius:30,
        padding:10,
        paddingLeft:20
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
        
        alignSelf:'center'
    },
    userImages:{
        width:150,
        height:150,
        borderRadius:100,
        
    },
    passwordInfo:{
        marginTop:5,
        marginBottom:-10,
        color:'gray'
    },

    row:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    regTextRegister:{
        
        fontWeight:'bold',
        fontSize:17,
    },
    switch:{

        fontSize:15,

    },
    
})
export default RegisterScreen;