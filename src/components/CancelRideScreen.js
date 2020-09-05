import React, { Component, useState } from 'react';
import { View,StyleSheet,TextInput, Text,TouchableOpacity, Modal } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';


import Roundcb from 'react-native-round-checkbox'
import PrimaryButton from './PrimaryButton';

const CancelRideScreen=(props)=>{
 const [option1Selected,setOption1Selected]=useState(false);
 const [option2Selected,setOption2Selected]=useState(false);
 const [option3Selected,setOption3Selected]=useState(false);
 const [option4Selected,setOption4Selected]=useState(false);
 const [alertActive,setAlertActive]=useState(false)
    const onCancelPress=()=>{

        alert("cancle");
    }
    const cancelRide=()=>{
        
        setAlertActive(true)
        setInterval(()=>props.onCancelConfirm(),2000);
    }
    return (
        <Modal 
        onRequestClose={()=>props.onBackPress(false)}
        >
          <View style={styles.container}>  
        <View style={styles.innerContainer}>


      <View style={styles.cancelTitle}>
       <Icon onPress={()=>props.onBackPress(false)} style={styles.backArrow} name='chevron-back' />
          
           <Text style={styles.cancelText}>
    Por que deseas{'\n'}cancelar tu viahe? 

               </Text>




          </View>



    <TouchableOpacity onPress={
        ()=>{
        setOption1Selected(true);
        setOption2Selected(false)
        setOption3Selected(false)
        setOption4Selected(false)

        }
        
        }>
    <View style={styles.cancelReasons}>
    <Text>

      Son mas de 4 Pasajeros
        </Text>
<View style={styles.check}>
        <Roundcb
  size={18}
  iconColor='white'
  backgroundColor='#b32d00'
  checked={option1Selected}
  onValueChange={(newValue) => {setOption1Selected(newValue)}}
/>


</View>

 </View>
</TouchableOpacity>
   

<TouchableOpacity onPress={()=>{
        setOption1Selected(false);
        setOption2Selected(true)
        setOption3Selected(false)
        setOption4Selected(false)

        }}>
    <View style={styles.cancelReasons}>

<Text>

  Exceso de equijeros
    </Text>
<View style={styles.check}>
    <Roundcb
size={18}
iconColor='white'
backgroundColor='#b32d00'
checked={option2Selected}
onValueChange={(newValue) => {setOption2Selected(newValue)}}
/>
</View>



</View>
</TouchableOpacity>



<TouchableOpacity onPress={
    ()=>{
        setOption1Selected(false);
        setOption2Selected(false)
        setOption3Selected(true)
        setOption4Selected(false)

        }
}>
<View style={styles.cancelReasons}>

    <Text>

      El usuarios es menor de edad
        </Text>
<View style={styles.check}>
        <Roundcb
  size={18}
  iconColor='white'
  backgroundColor='#b32d00'
  checked={option3Selected}
  onValueChange={(newValue) => {setOption3Selected(newValue)}}
/>
</View>



    </View>
</TouchableOpacity>




<TouchableOpacity onPress={
    ()=>{
        setOption1Selected(false);
        setOption2Selected(false)
        setOption3Selected(false)
        setOption4Selected(true)

        }
}>
<View style={styles.cancelReasons}>

<Text>

  El usuario fue grosero
    </Text>
<View style={styles.check}>
    <Roundcb
size={18}
iconColor='white'
backgroundColor='#b32d00'
checked={option4Selected}
onValueChange={(newValue) => {setOption4Selected(newValue)}}
/>
</View>



</View>
</TouchableOpacity >
<View style={{marginTop:30}}>


<PrimaryButton onPress={()=>cancelRide()} title='Agregar Parda' />


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

        <Text style={styles.modalHeader}>Viaje Cancelado</Text>
         
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
export default CancelRideScreen