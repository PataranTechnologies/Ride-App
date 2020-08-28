import React, { Component, useState } from 'react';

import { View,StyleSheet,TextInput,Modal, Text,TouchableOpacity } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/Ionicons';
import Icon2  from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3  from 'react-native-vector-icons/MaterialIcons';
import { set } from 'react-native-reanimated';
import {connect} from 'react-redux'
import * as Actions from '../../../RideRedux/actions'

const WhereTo=(props)=>{
    const [confirmModalShow,setConfirmModalShow]=useState(false);
    const [currentDestination,setCurrentDestination]=useState({name:'',address:''});
    const [myLocation,setMyLocation]=useState({name:'',address:''});
   
    const [deleteConfirmed,setDeleteConfirmed]=useState(false);
    const [addresses,setAddresses]=useState([{
        name:'Case',
        address:'Av Principal 254,Tarrazas',

    },
    {
        name:'Oficina',
        address:'Calle Mar 710,independencia',

    },
    {
        name:'Casa Abuela',
        address:'Circuito Azul 311',

    }
])
const [toDelete,setToDelete]=useState();


const onAccept=()=>{
    
    props.setMyLocation(myLocation);
   props.setDestination(currentDestination);
    props.setMainActive(false);
    props.setLocationScreenActive(true);
    props.navigation.navigate('Home')
}

    return (
        <View style={styles.container}>


        <View style={styles.innerContainer}>

<View style={styles.outerContainer}>
<View style={styles.locationRow}>

<Icon name='location-sharp' style={styles.MylocationIcon} />

<TextInput style={styles.locationInput} placeholder="your Location" />



    </View>
</View>
<View style={styles.outerContainer}>
    <View style={styles.locationRow}>

<Icon name='location-sharp' style={styles.destinationIcon} />

<TextInput style={styles.locationInput} value={currentDestination.address} placeholder="Destination" />






    </View>
    <Icon3 onPress={()=>{addStops(currentDestination)}} style={styles.addLocationIcon} name='add' />
     </View>

     <View style={styles.sep}></View>


     <View style={styles.savedDirectionRow}>

         <Icon style={styles.sdIcon} name='location-sharp' />
          <Text style={styles.sdText}>Direcciones guardadas</Text>
         </View>

      <ScrollView>

         {
             addresses.map((address,index)=>{
                 return (
                    <View key={'DCard'+index} style={styles.addressCard}>

                    <TouchableWithoutFeedback onPress={()=>{setCurrentDestination(address)}}>
                    <View style={styles.addressContainer}>
                        <View style={styles.nameContainer}>
                            <Icon style={styles.locationIcon} name='location-sharp' />
             <Text style={styles.addressName}>{address.name}</Text> 
                            </View>
                            <Text style={styles.addressText}>{address.address}</Text>

                        </View>


                  </TouchableWithoutFeedback>

                             

                    </View>

                 )
             })
         }



          </ScrollView>

          <TouchableOpacity onPress={()=>{onAccept()}} style={styles.Button}>

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
    addressCard:{
        backgroundColor:'white',
        borderRadius:20,
        padding:15,
        marginBottom:15,
        flexDirection:'row',
    },
    addressContainer:{
        marginLeft:10,
        flex:8,
    },
    nameContainer:{
       flexDirection:'row',
       alignItems:'center',
    },
    addressName:{
     
   fontSize:20,
   fontWeight:'bold',

    },
    locationIcon:{
   fontSize:24,
   color:'#ad1f1f'
    },
    addressText:{
        color:'gray',
        marginLeft:5,
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
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },

    locationRow:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:30,
    paddingLeft:20,
    marginTop:10,
    width:'90%'
},
MylocationIcon:{
color:'blue',
fontSize:25

},
destinationIcon:{

    color:'#ad1f1f',
fontSize:25

},
outerContainer:{
    
    flexDirection:'row',
    alignItems:'center',
},
addLocationIcon:{
    fontSize:30,
    fontWeight:'bold',
    marginLeft:5,
    color:'blue',
},
locationInput:{
    width:'100%'
},
sep:{
    marginTop:30,
    marginBottom:30,
    width:'100%',
    height:1,
    borderBottomColor:'gray',
    borderBottomWidth:1,
},
savedDirectionRow:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20,
},
sdIcon:{
    fontSize:25,
    color:'gray'
},
sdText:{
    fontWeight:'700',
    fontSize:20,
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
})
const mapStateToProps=(state)=>({

})
 const mapDispatchToProps=(dispatch)=>({

setMyLocation:(payload)=>{dispatch(Actions.SetMyLocation(payload))},
setDestination:(payload)=>{dispatch(Actions.SetDestination(payload))},
  
  addStops:(payload)=>{dispatch(Actions.AddStops(payload))},
  setMainActive:(payload)=>{dispatch(Actions.SetMainActive(payload))},
  setLocationScreenActive:(payload)=>{dispatch(Actions.SetLocationScreenActive(payload))},
  setBookingScreenActive:(payload)=>{dispatch(Actions.SetBookingScreenActive(payload))},

 })
export default connect(mapStateToProps,mapDispatchToProps)(WhereTo);