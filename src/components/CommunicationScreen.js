import React, { Component } from 'react';
import { View,StyleSheet,TextInput, Text,TouchableOpacity, Modal } from 'react-native';
import CommuncationHeader from '../screens/customHeader/CommuncationHeade'
import { ScrollView } from 'react-native-gesture-handler';

const CommunicationScreen=(props)=>{

    const callClient=()=>{

        alert("hello");

    }
    const back=()=>
    {
        props.back();
    }

    return (

        <Modal 
     onRequestClose={()=>props.back()}
       >
            <View style={styles.container}>
                
            <CommuncationHeader back={back} title='Manuel Ramirez' callTo={callClient} navigation={props.navigation}/>
        

        <View style={{flex:1,}}>

      <View style={styles.chatBox}>
<ScrollView>






</ScrollView>
      </View>


            <View style={styles.inputBox}>

                <TextInput style={styles.messageInput} placeholder='Escribir Mensaje...' />
                
                <TouchableOpacity style={styles.sendButton}>
<Text>
    Enviar
    </Text>
                    </TouchableOpacity>
                
                </View>

            </View>

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
        
        
        marginTop:30,
        padding:30
    },
    chatBox:{
        flex:10,

    },
    inputBox:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'

    },
    messageInput:{
        flex:8,
        padding:10,
        paddingLeft:20,
        backgroundColor:'white',
        height:'100%',
    },
    sendButton:{
        flex:2,
        padding:10,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red'
    },
  
})
export default CommunicationScreen