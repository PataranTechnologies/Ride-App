import React, { Component, useState } from 'react';
import { View,StyleSheet,TextInput, Text,TouchableOpacity,Switch } from 'react-native';


const Preferences=(props)=>{
    const [notificationActive,setNotificationActive]=useState(true);

    const [verificationActive,setVerificationActive]=useState(true);

    const [navigationGMActive,setNavigationGMActive]=useState(true);

    const [navigatioWazeActive,setNavigatioWazeActive]=useState(true);

    return (
        <View style={styles.container}>
        <View style={styles.innerContainer}>


        <View style={styles.row}>
                          
                           <Text style={styles.OptionText}>Notificaciones</Text>
                           <View style={styles.switch}>
                           <Switch 
                           trackColor={{ true: '#9999ff', false:"gray"  }}
                           thumbColor='#000099'
                           
                           value={notificationActive} onValueChange={()=>setNotificationActive(!notificationActive)} />
                            </View>
                           </View>


         <View style={styles.row}>
                          
                          <Text style={styles.OptionText}>Verificacion en dos pasos</Text>
                          <View style={styles.switch}>
                          <Switch 
                          trackColor={{ true: '#9999ff', false:"gray"  }}
                          thumbColor='#000099'
                          value={verificationActive} onValueChange={()=>setVerificationActive(!verificationActive)} />
                           </View>
                          </View> 

        <View style={styles.row}>
                          
                          <Text style={styles.OptionText}>Navegacion con Google Map</Text>
                          <View style={styles.switch}>
                          <Switch 
                          trackColor={{ true: '#9999ff', false:"gray"  }}
                          thumbColor='#000099'
                          value={navigationGMActive} onValueChange={()=>setNavigationGMActive(!navigationGMActive)} />
                           </View>
                          </View> 
         <View style={styles.row}>
                          
                          <Text style={styles.OptionText}>Navegacion con Waze</Text>
                          <View style={styles.switch}>
                          <Switch 
                          trackColor={{ true: '#9999ff', false:"gray"  }}
                          thumbColor='#000099'
                          value={navigatioWazeActive} onValueChange={()=>setNavigatioWazeActive(!navigatioWazeActive)} />
                           </View>
                          </View> 
        <View style={styles.row} pointerEvents="none">
                          
                          <Text style={styles.OptionText}>Tema Dark</Text>
                          <View style={styles.switch}>
                          <Switch 
                          trackColor={{ true: '#9999ff', false:"gray"  }}
                          thumbColor='#000099'
                          value={false} onValueChange={()=>setActivateWallet(false)} />
                           </View>
                          </View> 


        <Text style={styles.about}>About</Text>
        
        <Text style={styles.version}>Ride Version 1.1.9</Text>


        <TouchableOpacity  style={styles.save}>

<Text style={styles.buttonText}>Aceptar</Text>

</TouchableOpacity>








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
    row:{
        width:'100%',
        flexDirection:'row',
        marginTop:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,

        backgroundColor:'white',
        borderRadius:30,

        padding:10,
        paddingLeft:20,
        alignItems:'center'
        
  
    },
    switch:{
        flex:1,
        flexDirection:'row-reverse'
   
       },
       
       OptionText:{
           marginLeft:10,
           fontSize:15
   
       },
       save:{

        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0000cc',
        padding:15,
        borderRadius:30,
        marginTop:60,
        
    },

    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },
    about:{
     marginTop:30,
     fontWeight:'bold',
     fontSize:25,
    },
    version:{
        marginTop:5,
        fontSize:15,


    },
  
})
export default Preferences