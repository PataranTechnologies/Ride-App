import React, { Component, useState } from 'react';
import { View,StyleSheet,TextInput, Modal,Text,TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';


const Help=(props)=>{

    const [option,setOption]=useState('Selecciona');
    const [helpDone,setHelpDone]=useState(false);
    const [description,setDescription]=useState('');
    const onHelp=()=>{
        setHelpDone(true);
    }
    return (
        <View style={styles.container}>

{
                   helpDone? <Modal
                   transparent={true}
                   animationType="fade"
                   onRequestClose={() => {setHelpDone(false)}}
                   visible={helpDone}>
                     
                  <View style={styles.modalBackground}>
                  <View style={styles.activityIndicatorWrapper}>
                      
                       <View style={styles.danger}>
                           <Text style={styles.dangerText}>✔</Text>
                       </View>

        <Text style={styles.modalHeader}>Reporte Enviado</Text>
         
                      </View></View>
                 
                  </Modal>:null
                }
        <View style={styles.innerContainer}>


<View style={styles.helpHeaderView}>

          <Text style={styles.helpHeader}>Levanta un reporte para que te</Text>

          <Text style={styles.helpHeader}>asistamos lo mas pronto posible</Text>

</View>

<Text style={styles.boldTitle}>Asunto</Text>


<View style={styles.Picker}>
<Picker
  selectedValue={option}
  onValueChange={(itemValue, itemIndex) =>
    setOption(itemValue)
  }>
  <Picker.Item label="Selecciona" value="-1" />
  <Picker.Item label="Viaje Cancelado" value="0" />
  <Picker.Item label="Saldo Pendiente" value="1" />
  <Picker.Item label="Otro" value="2" />
</Picker>
</View>



<Text style={styles.boldTitle}>Description</Text>

<TextInput
underlineColorAndroid='transparent'
multiline={true}
value={description}
onChangeText={(text)=>{setDescription(text)}}
placeholder={'Escribe aqul..'} style={styles.description} />


<TouchableWithoutFeedback onPress={()=>props.navigation.navigate('TravelHistory')}  style={styles.toHistory}>

<Text style={styles.toHistoryText}>Selecciona un viaje para poder ayudarte</Text>
<Icon name='chevron-right' style={styles.toHistoryIcon} />
    </TouchableWithoutFeedback>


    <TouchableOpacity  onPress={()=>{onHelp()}} style={styles.save}>

<Text style={styles.buttonText}>Enviar</Text>

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
    helpHeaderView:{
        width:'100%',
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',
    },
    helpHeader:{
        fontSize:20,
        color:'#888888',
    },
    boldTitle:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:20,
    },
    description:{
        padding:20,
        backgroundColor:'white',
        height:180,
        borderRadius:30,
        marginTop:10,
        textAlignVertical: "top",
        fontSize:15,
    },
    toHistory:{
        marginTop:30,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',


    },
    toHistoryText:{
        fontSize:17,
        color:'#0000cc'

    },
    toHistoryIcon:{
        marginLeft:10,
        fontSize:15,
        color:'#0000cc'

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
    Picker:{
        marginTop:5,
        backgroundColor:'white',
        borderRadius:30,
        borderColor:'red',
        padding:3,
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

    MylocationIcon:{
        color:'blue',
        fontSize:25
        
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
})

export default Help