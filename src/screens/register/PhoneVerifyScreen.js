
import React, { Component } from 'react';
import { View,StyleSheet,ScrollView, Text,TouchableOpacity } from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { HeaderHeightContext } from 'react-navigation-stack';
import TextInputMask from 'react-native-text-input-mask';
import SharedStyles from '../../constants/SharedStyles';
import Header from '../../components/Header';
import PhoneInput from 'react-native-phone-input';
import DefaultTheme from '../../constants/DefaultTheme';
import CheckBox from '../../components/CheckBox';
import PrimaryButton from '../../components/PrimaryButton';
import CustomAlert from '../../components/CustomAlert';

const { card, primary, secondary, textInput } = DefaultTheme.colors;

const formats = {
  "52": {
    placeholder: '000 000 0000',
    mask: "[000] [000] [0000]",
    size: 10,
  },
  "506": {
    placeholder: '0000 0000',
    mask: "[0000] [0000]",
    size: 8,
  },
  "1": {
    placeholder: '000 000 0000',
    mask: "[000] [000] [0000]",
    size: 10,
  }
}

const PhoneVerifyScreen=(props)=>{
    
    


    const [phoneNumber, setPhoneNumber] = React.useState('');
  const [accepted, setAccepted] = React.useState(true);
  const [country, setCountryCode] = React.useState('506');
  const [alertData, setAlertData] = React.useState({
    isVisible: false,
    title: '',
    description: '',
    showConfirmButton: true,
    showProgress: false,
  });




  let phone;

  const hideAlert = () => {
    setAlertData({ ...alertData, isVisible: false });
  }
  const onsubmit=()=>{

    const countryCode = phone.getCountryCode();
    console.log(countryCode+" "+phoneNumber);
    this.props.navigation.navigate('OtpValidationScreen',{
      countryCode, 
      phoneNumber,
    });
}

  const validatePhone = () => {
    const countryCode = phone.getCountryCode();
    //getValue()
    if(countryCode === '') {
      setAlertData({
        isVisible: true,
        title: 'Código de país vacío',
        description: 'Por favor ingrese el código de país',
        showConfirmButton: true,
        showProgress: false,
      });
    } else if(phoneNumber.length !== formats[country].size) {
      setAlertData({
        isVisible: true,
        title: 'Número teléfonico inválido',
        description: 'Por favor ingrese un número de teléfono válido',
        showConfirmButton: true,
        showProgress: false,
      });
    } else {
      setAlertData({
        isVisible: true,
        title: 'Enviando código de verificación ...',
        description: '',
        showConfirmButton: false,
        showProgress: true,
      });
      setTimeout(() => {
        hideAlert();
        const data={
          countryCode:countryCode, 
          phoneNumber:phoneNumber,
        }
       console.log(data);

       props.navigation.navigate('OtpValidationScreen',data);
      }, 2000);
    }
  } 

        return ( <View style={styles.container}>

<ScrollView>
        <View style={styles.body}>
          <Text style={styles.title}>Añade tu número teléfonico</Text>
          <View style={styles.row}>
            <View style={styles.phoneCodeContainer}>
              <PhoneInput
                ref={(ref) => { phone = ref; }}
                initialCountry='cr'
                onPressFlag={() => { }}
                style={{ width: 90 }}
                onChangePhoneNumber={(number) => {
                  let code = number.replace('+','');
                  if(code == '52' || code =='506' || code == '1'){
                    setCountryCode(code);
                  } 
                }}
                textStyle={styles.textInputStyle}
                textProps={{ maxLength: 4 }}
                value={'+506'}
              />
            </View>
            <View style={[styles.phoneCodeContainer, { marginLeft: 10, flex: 1 }]}>
              <TextInputMask
                autoCompleteType={'tel'}
                keyboardType={'phone-pad'}
                value={phoneNumber}
                placeholder={formats[country].placeholder}
                style={styles.textInputStyle}
                onChangeText={(formatted, extracted) => {
                  setPhoneNumber(extracted)
                }}
                mask={formats[country].mask}
              />
            </View>
          </View>
          <View style={[styles.row, { alignSelf: 'center', marginTop: 80 }]}>
            <Text style={styles.text}>
              Acepto los <Text onPress={() => alert('Se presiono Términos y Condiciones')} style={{ textDecorationLine: 'underline' }}>Términos y Condiciones</Text>
            </Text>
            <CheckBox
              checked={accepted}
              onPress={() => setAccepted(!accepted)}
            />
          </View>
          <View style={{ marginVertical: 90 }}>
            { accepted === true ? <PrimaryButton
              onPress={validatePhone}
              title={'Entrar'}
            /> : null }
          </View>
        </View>
      </ScrollView>
      <CustomAlert
        isVisible={alertData.isVisible}
        title={alertData.title}
        description={alertData.description}
        onBackButtonPress={hideAlert}
        onConfirmPressed={hideAlert}
        showProgress={alertData.showProgress}
        showConfirmButton={alertData.showConfirmButton}
      />


</View>
             );


/*

<View style={styles.innerContainer}>



            <View style={styles.phoneVerify}>
                <Text style={styles.phoneVerifyText} >Anade tu numero telefonico</Text>
                </View>
                <View style={styles.phone}>

<View style={styles.countryCodePhone}>
<PhoneInput
                ref={(ref) => { phone = ref; }}
                initialCountry='cr'
                onPressFlag={() => { }}
                style={{ width: 90 }}
                onChangePhoneNumber={(number) => {
                  let code = number.replace('+','');
                  if(code == '52' || code =='506' || code == '1'){
                    setCountryCode(code);
                  } 
                }}
                textStyle={styles.textInputStyle}
                textProps={{ maxLength: 4 }}
                value={'+506'}
              />
</View>
                
<View style={styles.phoneNoPhone}>
<TextInputMask
                autoCompleteType={'tel'}
                keyboardType={'phone-pad'}
                value={phoneNumber}
                placeholder={formats[country].placeholder}
                style={styles.textInputStyle}
                onChangeText={(formatted, extracted) => {
                  setPhoneNumber(extracted)
                }}
                mask={formats[country].mask}
              />
</View>

         </View>      

<View style={styles.row}>

    <Text style={styles.rowElelemt}>Acepto los </Text>
    <Text style={styles.rowElelemtA} >Terminos y Condiciones</Text>

   
    <CheckBox
              checked={accepted}
              onPress={() => setAccepted(!accepted)}
            />
   

    </View>

<TouchableOpacity onPress={()=>this.onsubmit()} style={styles.loginButton}>

<Text style={styles.buttonText}>Entrar</Text>

</TouchableOpacity>




                    </View>

*/

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
    body: { 
      flex: 1, 
      margin: 20,
      marginTop: 40 
    },
    title: {
      marginVertical: 15,
      textAlign: 'center',
      color: secondary,
      fontFamily: 'Sarabun-Regular',
      fontSize: 18,
    },
    phoneCodeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: card,
      height: 46,
      paddingHorizontal: 25,
      elevation: 3,
      borderRadius: 25,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    },
    textInputStyle: {
      color: textInput, 
      fontSize: 16
    },
    row: { 
      flexDirection: 'row', 
      alignItems: 'center' 
    },
    text: { 
      fontFamily: 'Sarabun-Regular',
      color: primary,
      fontSize: 16,
      marginRight: 10
    }
 })
export default PhoneVerifyScreen;