import React, { Component } from 'react';
import { View,StyleSheet, Text,TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TextInput } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { HeaderHeightContext } from 'react-navigation-stack';


class PhoneVerifyScreen extends Component {
    state = {  }
    constructor(props)
    {
        super(props)
        this.state={
            pickerData:[],
            toggleCheckBox:false,
            cc:'',
            phoneNo:'',

        }
        this.phone=React.createRef();
        this.myCountryPicker=React.createRef();
    }
    setToggleCheckBox=()=>
    {
      this.setState({toggleCheckBox:!this.state.toggleCheckBox});
    }    
    componentDidMount()
    {
        this.setState({
            pickerData: null
        })
    }
    onPressFlag(){
        this.myCountryPicker.open()
    }
    
    selectCountry(country){
        this.phone.selectCountry(country.iso2)
    }


    onsubmit=()=>{

        this.props.navigation.navigate('OtpValidationScreen',{data:{}});
    }


    render() { 
        return ( <View style={styles.container}>


<View style={styles.innerContainer}>



            <View style={styles.phoneVerify}>
                <Text style={styles.phoneVerifyText} >Anade tu numero telefonico</Text>
                </View>
                <View style={styles.phone}>

<View style={styles.countryCodePhone}>
<TextInput style={styles.phoneNoText} onChangeText={(text)=>this.setState({cc:text})} value={this.state.cc} placeholder='Enter cc' />
      
</View>
                
<View style={styles.phoneNoPhone}>
    <TextInput style={styles.phoneNoText} onChangeText={(text)=>this.setState({phoneNo:text})} value={this.state.phoneNo} placeholder='Enter Mobile No' />
</View>

         </View>      

<View style={styles.row}>

    <Text style={styles.rowElelemt}>Acepto los </Text>
    <Text style={styles.rowElelemtA} >Terminos y Condiciones</Text>

   
    <CheckBox
    disabled={false}
    value={this.state.toggleCheckBox}
    onValueChange={(newValue) => this.setToggleCheckBox(newValue)}
  />
   

    </View>

<TouchableOpacity onPress={()=>this.onsubmit()} style={styles.loginButton}>

<Text style={styles.buttonText}>Entrar</Text>

</TouchableOpacity>




                    </View>

</View>
             );
    }
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
     phone:{
         width:'100%',
         flexDirection:'row',

         
         marginTop:30

     },
     countryCodePhone:{
         flex:3,
        
     },
     phoneNoPhone:{
         flex:7,
        marginLeft:10
         
         
     },
     phoneNoText:{
         backgroundColor:'white',
         borderRadius:30,
         padding:10,
         paddingLeft:20,
         paddingRight:20,
         height:50,
     },

     rowInput:{
        width:'100%',
        flexDirection:'row',

        marginTop:20
        

    },
    input:{
        flex:9,
        backgroundColor:'white',

        borderTopLeftRadius:30,
        borderBottomLeftRadius:30,
        padding:10,
        paddingLeft:20
    },
    Icon:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        borderTopRightRadius:30,
        borderBottomRightRadius:30,

        
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

    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },

    phoneVerify:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        color:'gray',
        marginTop:50
    },
    phoneVerifyText:{
        color:'gray',
        fontSize:20
    },
    row:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop:80,
        marginBottom:80
    },
    rowElelemtA:{
        textDecorationLine:'underline',
        color:'blue',
        fontSize:16
    },
    rowElelemt:{
        color:'#0000cc',
        fontSize:17
        
    },
 })
export default PhoneVerifyScreen;