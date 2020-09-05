import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
class CustomStack extends Component {
    state = {  }
    render() { 
        return (

            <View style={styles.header}>


                <Text style={styles.title}>
                    {this.props.title}
                    </Text>


                </View>


          );
    }
}
 const styles=StyleSheet.create({
 header:{

    backgroundColor:'#cc3300',
    justifyContent:'center',
    alignItems:'center',
    height:'45',


 },
 title:{
color:'white',
fontWeight:'bold',
fontSize:30,
 },
})
export default CustomStack;