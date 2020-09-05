import React, { useState } from 'react';
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

const PaymentMethodScreen = (props) => {
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

    const { signUp } = React.useContext(AuthContext);

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
            signUp(data.token, data.user);
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


    return (
        <View style={SharedStyles.container}>
            <Header
                title="Método de Pago"
            />
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
                            onPress={validate}
                            title="Guardar"
                        />
                        <ButtonOutline
                            containerStyle={{ marginVertical: 20 }}
                            onPress={skip}
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
        </View>
    );
}

export default PaymentMethodScreen;

const styles = StyleSheet.create({
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
});