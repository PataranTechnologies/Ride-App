import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon2  from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Entypo';
class ProfilePageHeader extends Component {
    state = {  }

    constructor(props)
    {
        super(props)
        this.HandleBack=this.HandleBack.bind(this)
    }

     HandleBack()
     {
         this.props.navigation.navigate(this.props.backTo);
     }
     HandleEdit=()=>
     {
         this.props.navigation.navigate(this.props.goTo);
     }
    render() { 
        return (

            <View style={styles.container}>
 

<Icon2 style={styles.icons} onPress={this.HandleBack} name="ios-chevron-back-outline" size={30} color="#ffffff" />

     
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{this.props.title}</Text>
</View>

<Icon style={styles.iconRight} onPress={this.HandleEdit} name="edit" size={30} color="#ffffff" />

               </View> 

          );
    }
}
 
export default ProfilePageHeader;


const styles=StyleSheet.create({

    container:{

        flexDirection:'row',
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:"110%",
        height:80,
        alignSelf:'stretch',
        marginLeft:-20,
        backgroundColor:'#b32d00',
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