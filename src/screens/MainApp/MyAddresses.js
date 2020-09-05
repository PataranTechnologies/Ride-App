import React, { Component, useState } from 'react';

import { View,StyleSheet,TextInput,Modal, Text,TouchableOpacity } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/Ionicons';
import Icon2  from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3  from 'react-native-vector-icons/MaterialIcons';
import { set } from 'react-native-reanimated';



const Myaddresses=(props)=>{
    const [confirmModalShow,setConfirmModalShow]=useState(false);
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

const onEdit=(address,index)=>{
props.navigation.navigate('MyAddressesEdit',{address,index})
}

const onDelete=(address,index)=>{


setToDelete({index:index,address});
setConfirmModalShow(true);



}
const onDeleteConfirm=(address,index)=>{

setConfirmModalShow(false),
    

setDeleteConfirmed(true);

   
    }

    return (
        <View style={styles.container}>


    
{
                    confirmModalShow? <Modal
                    transparent={true}
                    animationType="fade"
                   onRequestClose={() => {setConfirmModalShow(false)}}
                    visible={confirmModalShow}>
                     
                  <View style={styles.modalBackground}>
                  <View style={styles.activityIndicatorWrapper}>
                      
                       <View style={styles.danger}>
                           <Text style={styles.dangerText}>!</Text>
                       </View>

        <Text style={styles.modalHeader}>Seguro que deseas eliminar{'\n'}"Case" de tus direcciones?</Text>
                       
                       
                      

                       <TouchableOpacity onPress={()=>{onDeleteConfirm()}} style={styles.Button}>

<Text style={styles.buttonText}>Aceptar</Text>

</TouchableOpacity>
                      </View></View>
                 
                  </Modal>:null
                }


{
                   deleteConfirmed? <Modal
                   transparent={true}
                   animationType="fade"
                   onRequestClose={() => {setDeleteConfirmed(false)}}
                   visible={deleteConfirmed}>
                     
                  <View style={styles.modalBackground}>
                  <View style={styles.activityIndicatorWrapper}>
                      
                       <View style={styles.danger}>
                           <Text style={styles.dangerText}>✔</Text>
                       </View>

        <Text style={styles.modalHeader}>Direccion Eliminada</Text>
         
                      </View></View>
                 
                  </Modal>:null
                }

        <View style={styles.innerContainer}>


     

      <ScrollView>

         {
             addresses.map((address,index)=>{
                 return (
                    <View key={'DCard'+index} style={styles.addressCard}>

                    <View style={styles.addressContainer}>
                        <View style={styles.nameContainer}>
                            <Icon style={styles.locationIcon} name='location-sharp' />
             <Text style={styles.addressName}>{address.name}</Text> 
                            </View>
                            <Text style={styles.addressText}>{address.address}</Text>

                        </View>


                             <View style={styles.editIconContaier}>
                             <TouchableWithoutFeedback onPress={()=>{onEdit(address,index)}}>
                           
                              <Icon3 style={styles.Icon} name='edit'  />
                               </TouchableWithoutFeedback>
                                </View>
                                


                                <View style={styles.deleteIconContaier}>
                                <TouchableWithoutFeedback onPress={()=>{onDelete(address,index)}}>
                                <Icon2 style={styles.Icon} name='delete' />
                                </TouchableWithoutFeedback>
                                    </View>

                    </View>

                 )
             })
         }



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
   fontSize:20,
   color:'#ad1f1f'
    },
    addressText:{
        color:'gray',
        marginLeft:5,
    },
    editIconContaier:{

        backgroundColor:'#002db3',
        justifyContent:'center',
        alignItems:'center',
        width:35,
        margin:3,
        borderRadius:10,

    },
    deleteIconContaier:{

        backgroundColor:'#bd0f0f',
        justifyContent:'center',
        alignItems:'center',
        width:35,
        margin:3,
        borderRadius:10,

    },
    Icon:{
        color:'white',
        fontSize:25,
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
       padding:20,
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
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },
  
})
export default Myaddresses