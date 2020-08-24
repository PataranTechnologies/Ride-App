import React, { Component } from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import { color } from 'react-native-reanimated';
class Home extends Component {
    state = {  }
    render() { 
        return ( <View style={styles.container}>
            <TouchableOpacity style={styles.FixedIcon}>
                <Icon name='menu' style={styles.MenuIcon} />
                </TouchableOpacity>
            </View> );
    }
}


const styles=StyleSheet.create({
 container:{
     flex:1,
 },
    FixedIcon:{
position:"absolute",
top:20,
left:30,
width:60,
height:60,
borderRadius:60,
backgroundColor:'white',
    },
    MenuIcon:{
        position:"absolute",
        top:5,
        left:5,
         fontSize:50,   
         color:'red'     

    },

})
 
export default Home;