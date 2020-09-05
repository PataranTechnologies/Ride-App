import React, { Component, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SharedStyles from '../../constants/SharedStyles';
import Header from '../../components/Header';
import DefaultTheme from '../../constants/DefaultTheme';
import PrimaryButton from '../../components/PrimaryButton';
import SettingRow from '../../components/SettingRow';
import SettingRowWithBankCard from '../../components/SettingRowWithBankCard';
import ButtonOutline from '../../components/ButtonOutline';
import CustomAlert from '../../components/CustomAlert';
import { AuthContext } from '../../context/context';
import APIKit, { setClientToken } from '../../utils/APIKit';
const { card, primary, secondary, text, textInput } = DefaultTheme.colors;

const PayInfo=(props)=> {


    const [isEnabledCash, setIsEnableCash] = useState(true);
    const [isEnabledCard, setIsEnableCard] = useState(false);
    const [cardData, setCardData] = useState({
        valid: false
    });

    const [alertData, setAlertData] = React.useState({
        isVisible: false,
        title: '',
        description: '',
        showConfirmButton: true,
        showProgress: false,
        onConfirmPressed: hideAlert
    });

  

    const toggleSwitchCashSetting = () => {
        setIsEnableCash(!isEnabledCash);
        setIsEnableCard(isEnabledCash);
    }

    const toggleSwitchCardSetting = () => {
        setIsEnableCard(!isEnabledCard);
        setIsEnableCash(isEnabledCard);
        /* if (!isEnabledCard == true) {
            setIsEnableCard(!isEnabledCard);
            setIsEnableCash(isEnabledCard);
        } else {
            setIsEnableCard(!isEnabledCard);
        } */
    }

    const hideAlert = () => {
        setAlertData({ ...alertData, isVisible: false });
    };

    const validate = () => {
        let payload = props.route.params.payload;
        console.log('PAYLOAD: ', payload);
        if(isEnabledCard == true ) {
            if (cardData.valid === true) {
                 //payload.append('card', cardData);
                let r = Math.random().toString(36).substring(7);
                let lastNumbers = cardData.values.cardNumber.substring(12, 16);
                let cardType = cardData.values.type == 'american-express' ? 'american' : cardData.values.type ;
                console.log('LAST NUMBERS: ', lastNumbers);
                payload.append("payment[method]", 'card');
                payload.append("payment[card][token]", r);
                payload.append("payment[card][lastNumbers]", lastNumbers);
                payload.append("payment[card][type]", cardType);
                registerUser(payload);
            } else {
                setAlertData({
                    isVisible: true,
                    title: 'Tarjeta inválida',
                    description: 'Asegurese de haber ingresado correctamente todos los campos',
                    showConfirmButton: true,
                    showProgress: false,
                    onConfirmPressed: hideAlert
                });
            } 
        } else {
            payload.append("payment[method]", 'cash');
            registerUser(payload);
        }
    }

    const skip = () => {
        const { payload } = props.route.params;
        registerUser(payload);
    }

    const registerUser = (dataForm) => {
        setAlertData({
            isVisible: true,
            title: 'Realizando el registro...',
            description: '',
            showConfirmButton: false,
            showProgress: true,
            onConfirmPressed: hideAlert
        });
        const onSuccess = async ({ data }) => {
            console.log('SIGN UP: ', data);
            setClientToken(data.token);
            /*APIKit.get('/auth/getuser')
                .then(async ({ data }) => {
                    console.log('GET USER DATA: ', data);
                })
                .catch(async (error) => {
                    console.log('GET USER ERROR');
                    console.log(JSON.stringify(error));
                })*/
            try {
                await AsyncStorage.setItem('@ride/userToken', data.token)
            } catch (e) {
                console.log(e);
            }
            hideAlert();
          
        }

        const onFailure = (error) => {
            console.log('ERROR ========== ');
            console.log(error);
            if(error.response.data) {
                if(error.response.data.error){
                    if (error.response.data.error.email[0] == 'The email has already been taken.'){
                        setAlertData({
                            isVisible: true,
                            title: 'Error',
                            description: 'El email ya se encuentra registrado, intente con otro',
                            showConfirmButton: true,
                            showProgress: false,
                            onConfirmPressed: hideAlert
                        });
                    }
                } else {
                    setAlertData({
                        isVisible: true,
                        title: 'Error',
                        description: JSON.stringify(error.response.data.error),
                        showConfirmButton: true,
                        showProgress: false,
                        onConfirmPressed: hideAlert
                    }); 
                }
            } else {
                setAlertData({
                    isVisible: true,
                    title: 'Error',
                    description: error.message,
                    showConfirmButton: true,
                    showProgress: false,
                    onConfirmPressed: hideAlert
                });
            }
        };
        APIKit.post('/auth/register', dataForm)
            .then(onSuccess)
            .catch(onFailure);
    }

    const [activateWallet,setActivateWallet]=useState(true)
    const [activateCard,setActivateCard]=useState(false)
    
    const [cardNumber,setCardNumber]=useState('');
    const [cardHolderName,setCardHolderName]=useState('');
    const [cardExpDate,setCardExpDate]=useState('');
    const [cardCVV,setCardCVV]=useState('');
   // const [cardType,setCardType]=useState(Visa);
    const valCardDate=(date)=>{

        setCardExpDate(date);

    }

    const identifyCard=(text)=>{
        setCardNumber(text);
        if(text.startsWith('5'))
        {
         setCardType(mastercard);
        }
        else
        if(text.startsWith('4'))
        {


            setCardType(Visa)
        }
    }

    const getCardType=()=>{
        return cardType;
    }
    const onPress=()=>{
        props.navigation.navigate('Home');
    }
   const cardRender=()=>{

        return (


            <View style={styles.card}>
                <Text style={styles.cardTitles}>Numero de Terjeta</Text>
                <View style={styles.cardUpper}>

                    <TextInput maxLength={16} value={cardNumber} onChangeText={(text)=>identifyCard(text)} style={styles.cardInput,styles.cardNumber} />
                    <Image style={styles.cardImage} source={cardType} /> 

                </View>
                <Text style={styles.cardTitles}>Nombre</Text>
                <TextInput style={styles.cardInput} value={cardHolderName} onChangeText={()=>setCardHolderName(text)} />
                <View style={styles.cardLower}>
                <View style={styles.cardLowerLeft}>
                <Text style={styles.cardTitles}>MM/AA</Text>
                <View>
                    <TextInput maxLength={5} value={cardExpDate} onChangeText={(text)=>valCardDate(text)} style={styles.cardInput} />
                </View>
                </View>
                <View style={styles.cardLowerRight}>
                <Text style={styles.cardTitles}>CVV</Text>
                <View>
                    <TextInput secureTextEntry={true} maxLength={3} value={cardCVV} onChangeText={()=>setCardCVV(text)} style={styles.cardInput} />
                </View>
                </View>
                </View>

                </View>

        );
    }
  
        return (<View style={styles.container}>


<KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={SharedStyles.container}
            >
                <ScrollView>
                    <View style={styles.body}>
                        <Text style={styles.title}>Agrega la forma de pago de tus viajes</Text>
                        <SettingRow
                            value={isEnabledCash}
                            onValueChange={toggleSwitchCashSetting}
                        />
                        <SettingRowWithBankCard
                            value={isEnabledCard}
                            onSwitchValueChange={toggleSwitchCardSetting}
                            onCardChange={(card) => {
                                console.log(card);
                                setCardData(card);
                            }}
                        />
                        <PrimaryButton
                            containerStyle={{ marginTop: 30 }}
                            onPress={onPress}
                            title="Guardar"
                        />
                        <ButtonOutline
                            containerStyle={{ marginVertical: 20 }}
                            onPress={onPress}
                            title="Omitir"
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <CustomAlert
                isVisible={alertData.isVisible}
                title={alertData.title}
                description={alertData.description}
                onBackButtonPress={hideAlert}
                onConfirmPressed={alertData.onConfirmPressed}
                showProgress={alertData.showProgress}
                showConfirmButton={alertData.showConfirmButton}
            />


        
                        </View> );
    }

 
export default PayInfo;
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#e6f2ff',
        flex:1,
        
    },
    innerContainer:{
        
        margin:20,
        marginTop:30,
    },
    phone:{
        width:'100%',
        flexDirection:'row',

    },
    countryCode:{
        flex:4,
    },
    phoneNo:{
        flex:6,
        
        
    },
    rowWallet:{
        width:'100%',
        flexDirection:'row',
        marginTop:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,

        backgroundColor:'white',
        borderRadius:30,

        padding:10,
        paddingLeft:20,
        alignItems:'center'
        
  
    },
    rowInput:{
        width:'100%',
        flexDirection:'row',

        
  
        

    },
    cardAct:{
        marginTop:20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,

        backgroundColor:'white',
        borderRadius:30,

        padding:10,
        paddingLeft:20,
        
        
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
        fontSize:25,
          color:'blue',
        justifyContent:'center',
        borderTopRightRadius:30,
        borderBottomRightRadius:30,

        
    },
    switchpay:{
     flex:1,
     flexDirection:'row-reverse'

    },
    
    payOptionText:{
        marginLeft:10,
        fontSize:15

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
    skip:{

        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#0000cc',
        borderWidth:2,
        padding:15,
        borderRadius:30,
        marginTop:10,
        marginBottom:30,

    },

    buttonTextSkip:{
        color:'#0000cc',
        fontWeight:'bold',
        fontSize:20
    },

    payHeading:{
        marginTop:20,
        alignSelf:'center',
        color:'gray',
        fontSize:18,
        marginBottom:30,
    },
    card:{
        marginTop:10,
    },
    cardLower:{
        flexDirection:'row',
    },
    cardLowerLeft:{
      flex:1,
      margin:5,
    },
    cardLowerRight:{
        flex:1,
        margin:5,
    },
    cardInput:{
        borderBottomWidth:1,
        borderBottomColor:'#ebebe0',
        padding:0,
    },
    cardTitles:{
        color:'#6699cc'
    },
    cardUpper:{
        flexDirection:'row'
    },

    cardImage:{
        flex:2,
        width:'80%',
        height:'80%',
        marginLeft:5,
    },
    cardNumber:{
        flex:8,
        borderBottomWidth:1,
        borderBottomColor:'#ebebe0',
        padding:0,

    },
    body: {
        flex: 1,
        margin: 20,
    },
    title: {
        textAlign: 'center',
        color: secondary,
        fontFamily: 'Sarabun-Regular',
        fontSize: 18,
    },
    optionContainer: {
        marginTop: 20,
        backgroundColor: card,
        paddingLeft: 20,
        paddingRight: 10,
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
    optionText: {
        fontFamily: 'Sarabun-Medium',
        fontSize: 18,
        color: text,
    },
    textInputStyle: {
        fontFamily: 'Sarabun-Medium',
        color: textInput,
        fontSize: 14, 
        padding: 0,
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    row: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    itemRow: {
        width: '45%',
    },
    labelText: { 
        fontFamily: 'Sarabun-Medium', 
        fontSize: 14, 
        color: primary,
    },
    imageCompanyContainer: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginHorizontal: 10, 
        backgroundColor: '#E1E1E1', 
        height: 30, 
        width: 38, 
        borderRadius: 10 
    },

})




/*

    <View style={styles.innerContainer}>
           
           <Text style={styles.payHeading}>Agrega la forma de pago de tus viajes</Text >
            
            <View style={styles.rowWallet}>
                           <Icon name="money" style={styles.Icon} />
                           <Text style={styles.payOptionText}>Efectivo</Text>
                           <View style={styles.switchpay}>
                           <Switch  value={activateWallet} onValueChange={()=>setActivateWallet(!activateWallet)} />
                            </View>
                           </View> 
            <View style={styles.cardAct}>
            <View style={styles.rowInput}>
                           <Icon name='credit-card' style={styles.Icon}/> 
                           <Text style={styles.payOptionText}>Tarjeta</Text>
                           <View style={styles.switchpay}>
                           <Switch value={activateCard} onValueChange={()=>setActivateCard(!activateCard)} />
                            </View>

                           </View> 

                           {
                                activateCard?cardRender():null
                            }

</View>



            <TouchableOpacity onPress={()=>props.navigation.navigate('MainApp')} style={styles.save}>

<Text style={styles.buttonText}>Guardar</Text>

</TouchableOpacity>


<TouchableOpacity onPress={()=>props.navigation.navigate('MainApp')} style={styles.skip}>

<Text style={styles.buttonTextSkip}>Omitir</Text>

</TouchableOpacity>
                        
            </View>



*/