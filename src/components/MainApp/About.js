import React, { Component } from 'react';
import { View,StyleSheet,TextInput, Text,TouchableOpacity } from 'react-native';
import Header from '../customHeader/header'
import  Icon  from 'react-native-vector-icons/FontAwesome';
const About=(props)=>{

    var aboutText='Lorem ipsum dolor sir amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua .Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat .In reprehendreit in voluptate velit esse cillum dolore eu fugiat ulla pariatur.Excepteur sint occaecat cupidatat non proident ,sunt in culpa qui officia deserunt mollit id est laborum.';
    return (
        <View style={styles.container}>
           <View style={styles.innerContainer}>


          <View style={styles.VisionView}>


          <Icon name={'star'} style={styles.AboutIcon} />

          <Text style={styles.aboutText}>
              {aboutText}
          </Text>


             



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
        padding:5
    },
    VisionView:{
    
        backgroundColor:'white',
        alignItems:'center',
        marginTop:20,
        width:'100%',
        padding:20,
        borderRadius:30,
        shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  
    },
    AboutIcon:{

        fontSize:60,
        alignSelf:'center',
        color:'#003399',
    },
    aboutText:{
        fontSize:20,
        margin:5,
        marginTop:20,
        alignSelf:'center',
       fontFamily:'lucida grande', 
       justifyContent:'center',
       alignItems:'center' ,
       textAlign:'center',
         
    },
    
  
})


export default About;