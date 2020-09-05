import React, { Component, useState } from 'react';
import { View,StyleSheet,TextInput, Image,Text,TouchableOpacity, Modal } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

import Roundcb from 'react-native-round-checkbox'
import PrimaryButton from './PrimaryButton';
import CustomAlert from './CustomAlert';
const FinalScreen=(props)=>{
 const [description,setDescription]=useState()
    const onCancelPress=()=>{

        alert("cancle");
    }
    const [starCount,setStarCount]=useState(0);
    const  onStarRatingPress=(rating)=>{
         setStarCount(rating);
       }
    const [amountModal,setAmountModal]=useState(false)

    const [confirmationModal,setConfirmationModal]=useState(false)

    const [ratingModal,setRatingModal]=useState(false)
    const [selected,setSelected]=useState(0);
    const [options,setOptions]=useState([
        {
            text:'Atento',
            index:1,
        },
        {
            text:'Respentuoso',
            index:2,
        },
        {
            text:'Auto Limpio',
            index:3,
        },
        
    ])

    const [alertActive,setAlertActive]=useState(false)

    const submitResponse=()=>{
        setAlertActive(true);

        setTimeout(()=>{

             props.onSubmit();
            setAlertActive(false)
        },2000);
    }
    const selectOption=(index)=>{


        setSelected(index);

    }
    return (
        <Modal 
        >
          <View style={styles.container}>
              <View style={{flex:1,margin:20,}}>  
       <Text style={{fontSize:30,fontWeight:'bold',alignSelf:'center',marginTop:10,}}>Fin del Viaje</Text>
       <Text style={{alignSelf:'center',color:'gray',fontSize:20,}}>Tu total es de €{"150.00"} </Text>
 
                    
  
       <View style={styles.modal}>

              
<Text style={{alignSelf:'center',fontSize:16,}}>Califica al Usuario</Text>            
            
            <View style={{padding:20,justifyContent:'center',alignItems:'center',backgroundColor:'white',margin:10,borderRadius:20}}>
            <Image
          source={{ uri: 'https://cdn4.vectorstock.com/i/1000x1000/08/33/profile-icon-male-user-person-avatar-symbol-vector-20910833.jpg' }}
          style={styles.ProfileIcon}
        />
                <Text style={{fontSize:22,fontWeight:'bold',marginBottom:5,}}>Manuel</Text>

                <Text style={{fontSize:18,marginBottom:10,}}>Chevrolet Spark Azul</Text>


            <StarRating
disabled={false}

maxStars={5}
rating={starCount}
selectedStar={(rating) => onStarRatingPress(rating)}
fullStarColor={'#cc0000'}
/>

                </View>





            
            
            
            
         </View>
 
 <View style={{flexDirection:'row'}}>

{
    options.map((option)=>{
        return (
            <View key={option.index} style={option.index===selected?styles.selected:styles.notSelected}>
<TouchableOpacity onPress={()=>selectOption(option.index)}>

                <Text style={option.index===selected?styles.selectedText:styles.notSelectedText}>{option.text}</Text>


</TouchableOpacity>

                </View>
        )
    })
}

     </View>
 
         <TextInput
underlineColorAndroid='transparent'
multiline={true}
value={description}
onChangeText={(text)=>{setDescription(text)}}
placeholder={'Escribe aqul..'} style={styles.description} />


<View style={{marginTop:20,}}>
<PrimaryButton onPress={()=>{submitResponse()}} title='Enviar' />
 </View>
     </View>
     {
                   alertActive? <Modal
                   transparent={true}
                   animationType="fade"
                   visible={alertActive}>
                     
                  <View style={styles.modalBackground}>
                  <View style={styles.activityIndicatorWrapper}>
                      
                       <View style={styles.danger}>
                           <Text style={styles.dangerText}>✓</Text>
                       </View>

        <Text style={styles.modalHeader}>Enviado</Text>
         
                      </View></View>
                 
                  </Modal>:null
                }
     
     </View>
         </Modal>
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

    cancelText:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,

    },
    cancelTitle:{

        alignItems:'center',

        marginBottom:50,


    },
    backArrow:{
        position:'absolute',
        left:0,
        fontSize:30,
        fontWeight:'bold',
        color:'blue',
    },
    cancelReasons:{
        backgroundColor:'white',
        padding:10,
        paddingLeft:20,
        borderRadius:30,
        flexDirection:'row',
        marginTop:15,
    },
    check:{
        position:'absolute',
        right:20,
        top:10,
        backgroundColor:'gray',
        borderRadius:100,
    },
    rideAcceptButton:{
        flex:1,
        margin:5,
        padding:20,
        borderRadius:30,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
         
        
          },
          ButtonTexta:{
            color:'white'
        },

      modal: {
     
        borderRadius: 30,
        
        marginTop:10,
        

      },
      ProfileIcon:{

        width:90,
        height:90,
        borderRadius:90,
      },
      description:{
        padding:20,
        backgroundColor:'white',
        height:180,
        borderRadius:30,
        margin:10,
        textAlignVertical: "top",
        fontSize:15,
        
    },
    selected:{
        flex:1,
        backgroundColor:'#004080',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        borderRadius:30,
    },
    selectedText:{
       color:'white',
    },
    notSelected:{
        flex:1,
        backgroundColor:'white',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        borderRadius:30,

   
    },
    notSelectedText:{
        color:'gray',

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
        width:'70%'

      },
  
})
export default FinalScreen
