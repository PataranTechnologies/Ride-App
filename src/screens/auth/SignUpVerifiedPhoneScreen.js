import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import SharedStyles from '../../constants/SharedStyles';
import Header from '../../components/Header';
import DefaultTheme from '../../constants/DefaultTheme';
import PrimaryButton from '../../components/PrimaryButton';
import CustomAlert from '../../components/CustomAlert';

const { card, primary, secondary, textInput } = DefaultTheme.colors;

const SignUpVerifiedPhoneScreen = (props) => {

    const [verificationCode, setVerificationCode] = React.useState('123456');
    const [alertData, setAlertData] = React.useState({
        isVisible: false,
        title: '',
        description: '',
        showConfirmButton: true,
        showProgress: false,
    });

    const hideAlert = () => {
        setAlertData({ ...alertData, isVisible: false });
    }

    const validateCode = () => {
        setAlertData({
            isVisible: true,
            title: 'Verificando código ...',
            description: '',
            showConfirmButton: false,
            showProgress: true,
        });
        setTimeout(() => {
            if (verificationCode !== '123456') {
                setAlertData({
                    isVisible: true,
                    title: 'Código de verificación inválido',
                    description: 'El código ingresado no corresponde al enviado, intente otra vez',
                    showConfirmButton: true,
                    showProgress: false,
                });
            } else {
                hideAlert();
                const { countryCode, phoneNumber } = props.route.params;
                props.navigation.navigate('SignUp', {
                    countryCode,
                    phoneNumber
                })
            }
        }, 2000);
    }
    return (
        <View style={SharedStyles.container}>
            <Header
                title="Ingresar Código"
            />
            <ScrollView>
                <View style={styles.body}>
                    <Text style={styles.title}>Ingresa el código de verificación que te enviamos vía SMS</Text>
                    <View style={styles.textInputContainer}>
                        <TextInputMask
                            keyboardType={'number-pad'}
                            value={verificationCode}
                            placeholder={'0  0  0  0  0  0'}
                            placeholderTextColor={textInput}
                            style={styles.textInputStyle}
                            onChangeText={(formatted, extracted) => {
                                setVerificationCode(extracted)
                            }}
                            mask={"[0]  [0]  [0]  [0]  [0]  [0]"}
                        />
                    </View>
                    <View style={{ marginVertical: 120 }}>
                        { verificationCode.length == 6 && <PrimaryButton
                            onPress={validateCode}
                            title={'Verificar'}
                        />
                        }
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
}

export default SignUpVerifiedPhoneScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        margin: 20,
        marginTop: 40
    },
    title: {
        marginTop: 15,
        marginBottom: 40,
        textAlign: 'center',
        color: secondary,
        fontFamily: 'Sarabun-Regular',
        fontSize: 18,
    },
    textInputContainer: {
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
        fontSize: 16,
        width: '100%',
        textAlign: 'center'
    },
});