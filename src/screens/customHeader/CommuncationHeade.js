import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon2  from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Entypo';
class CommunicationHeader extends Component {
    state = {  }

    constructor(props)
    {
        super(props)
        this.HandleBack=this.HandleBack.bind(this)
    }

     HandleBack()
     {
         
         
     }
     
    render() { 
        return (

            <View style={styles.container}>
 

<Icon2 style={styles.icons} onPress={()=>this.props.back()} name="ios-chevron-back-outline" size={30} color="#ffffff" />

     
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{this.props.title}</Text>
</View>

<Icon2 style={styles.iconRight} onPress={()=>this.props.callTo()} name="call" size={30} color="#ffffff" />

               </View> 

          );
    }
}
 
export default CommunicationHeader;


const styles=StyleSheet.create({

    container:{

        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:80,
        alignSelf:'stretch',
        
        backgroundColor:'#003399',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        
         

    }, headerTitle: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center"
      },
      headerText: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#333",
        letterSpacing: 1,
        color: "#fff"
      },
      icons: {
        position: "absolute",
        color:'white',
        left: 36,
        
    },
    iconRight:{
        position: "absolute",
        color:'white',
        right: 36,
  
    },


})