import React, { Component } from 'react';

import { View,StyleSheet,TextInput, Text,TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
 


const MyaddressesAdd=(props)=>{



    //alert(props.navigation.state.params.address.name);

    return (
        <View style={styles.container}>
        <View style={styles.innerContainer}>
       
        <View style={styles.revRow}>

              
              <View style={styles.contentContainer}>

                  <Text style={styles.headings}>Direccion</Text>
                 
    
                  <TextInput underlineColorAndroid='rgba(0,0,0,0)'  style={styles.nombre} placeholder='' />
                  <TouchableWithoutFeedback style={styles.suggContainer}>
                    <Text style={styles.sugg}>sugerencias</Text>
                    <Text style={styles.suggAdd}>sugerencias</Text>
                    <Text style={styles.suggAdd}>sugerencias</Text>
                    </TouchableWithoutFeedback>


                  <Text style={styles.headings}>Nombre</Text>
                   <TextInput underlineColorAndroid='rgba(0,0,0,0)'  style={styles.nombre} placeholder='' />

                 
            <TouchableOpacity onPress={()=>props.navigation.navigate('MainApp')} style={styles.save}>

<Text style={styles.buttonText}>Guardar</Text>

</TouchableOpacity>
                   
                  </View>


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
        
        margin:0,
        marginTop:20,
        flexDirection:'column',
        flex:1,
      
    },
    revRow:{
        flex:1,
        flexDirection:"column-reverse",
    },
    headings:{
        color:'gray',
    },
    nombre:{
        borderBottomColor:'gray',
        borderBottomWidth:1,
        padding:2,
    
    },
    contentContainer:{
        backgroundColor:'white',
        width:'100%',
        padding:30,
        borderTopEndRadius:30,
        borderTopLeftRadius:30,
        
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

  suggContainer:{
      borderBottomLeftRadius:30,
      borderBottomRightRadius:30,
       borderWidth:1,
       borderColor:'gray',
       marginBottom:10,
padding:15,
  },
  sugg:{

fontSize:13,
  },
  suggAdd:{
color:'gray',
fontSize:16
  },
})
export default MyaddressesAdd