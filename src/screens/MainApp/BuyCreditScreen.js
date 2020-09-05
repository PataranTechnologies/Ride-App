import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import valid from "card-validator";
import DefaultTheme from '../../constants/DefaultTheme';
import SharedStyles from '../../constants/SharedStyles';
import Header from '../../components/Header';
import PrimaryButton from '../../components/PrimaryButton';
import CustomAlert from '../../components/CustomAlert';

const { card, primary, secondary, text, textInput } = DefaultTheme.colors;

const cardTypes = {
    "visa": require('../../../assets/images/visa.png'),
    "mastercard": require('../../../assets/images/mastercard.png'),
    "american-express": require('../../../assets/images/american_express.png'),
    "discover": require('../../../assets/images/discover_network.png'),
    "carnet": require('../../../assets/images/carnet.png'),
}

const BuyCreditScreen = ({ onCardChange }) => {
    const [form, setForm] = useState({
        cardNumber: "",
        name: "",
        expiry: "",
        cvv: "",
        type: null,
    });
    const [statuses, setStatuses] = useState({
        number: "incomplete",
        expiry: "incomplete",
        cvv: "incomplete",
        name: "incomplete",
    });
    const [alertData, setAlertData] = useState({
        isVisible: false,
        title: '',
        description: '',
        showConfirmButton: true,
        showProgress: false,
        onConfirmPressed: hideAlert
    });

    const hideAlert = () => {
        setAlertData({ ...alertData, isVisible: false });
    };

    const toStatus = validation => {
        return validation.isValid ? "valid" :
            validation.isPotentiallyValid ? "incomplete" :
                "invalid";
    };

    const handleCardNumberChange = (extracted) => {
        let validator = valid.number(extracted);
        let cardType = validator.card ? validator.card.type : null;
        let newForm = {
            ...form,
            type: cardType,
            cardNumber: extracted,
        };
        let newStatuses = {
            ...statuses,
            number: toStatus(validator),
        };
        setForm(newForm);
        setStatuses(newStatuses);
    }
    const handleNameChange = (name) => {
        let newForm = {
            ...form,
            name: name,
        };
        let statusName = !!name ? "valid" : "incomplete";
        let newStatuses = {
            ...statuses,
            name: statusName,
        };
        setForm(newForm);
        setStatuses(newStatuses);
    }

    const handleExpiryChange = (expiry) => {
        const expiryValidation = valid.expirationDate(expiry);
        let newForm = {
            ...form,
            expiry,
        };
        let newStatuses = {
            ...statuses,
            expiry: toStatus(expiryValidation),
        };
        setForm(newForm);
        setStatuses(newStatuses);
    }

    const handleCvvChange = (cvv) => {
        const cvvValidation = valid.cvv(cvv, 3);
        let newForm = {
            ...form,
            cvv,
        };
        let newStatuses = {
            ...statuses,
            cvv: toStatus(cvvValidation),
        };
        setForm(newForm);
        setStatuses(newStatuses);
        const card = {
            valid: statuses.number === 'valid' && statuses.expiry === 'valid' && toStatus(cvvValidation) === 'valid' && statuses.name === 'valid',
            values: newForm,
            status: newStatuses
        }
        onCardChange(card);
    }
    const onPressSaveButton = () => {
        const card = {
            valid: statuses.number === 'valid' && statuses.expiry === 'valid' && statuses.cvv === 'valid' && statuses.name === 'valid',
            values: form,
            status: statuses
        }
        setAlertData({
            isVisible: true,
            title: 'Funcionalidad en desarrollo',
            description: '',
            showConfirmButton: true,
            showProgress: false,
            onConfirmPressed: hideAlert
        }); 
    }
    return (
        <View style={SharedStyles.container}>
            <Header title="Comprar Crédito" enableBackButton={false}/>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={SharedStyles.container}
            >
                <ScrollView>
                    <View style={styles.body}>
                        <Text style={styles.title}>Agrega los datos de tu tarjeta</Text>
                        <View style={styles.optionContainer}>
                            <Text style={styles.labelText}>Numero de Tarjeta</Text>
                            <View style={styles.row}>
                                <TextInputMask
                                    keyboardType={'number-pad'}
                                    mask={"[0000] [0000] [0000] [0000]"}
                                    placeholder={'**** **** **** 0000'}
                                    style={[styles.textInputStyle, { flex: 1, }, statuses.number !== 'valid' && { color: 'red' }]}
                                    onChangeText={(formatted, extracted) => handleCardNumberChange(extracted)}
                                    value={form.cardNumber}
                                />
                                <View style={styles.imageCompanyContainer}>
                                    {form.type !== null && <Image
                                        source={cardTypes[form.type]}
                                        resizeMode={'contain'}
                                        style={{ height: 22, width: 32, }}
                                    />}
                                </View>
                            </View>
                            <Text style={styles.labelText}>Nombre</Text>
                            <TextInput
                                autoCapitalize={'characters'}
                                placeholder={'Nombre del titular'}
                                style={[styles.textInputStyle, { marginRight: 10 }]}
                                onChangeText={(text) => handleNameChange(text)}
                                value={form.name}
                            />
                            <View style={[styles.row, { justifyContent: 'space-between', marginRight: 10 }]}>
                                <View style={styles.itemRow}>
                                    <Text style={styles.labelText}>MM/AA</Text>
                                    <TextInputMask
                                        keyboardType={'number-pad'}
                                        mask={"[00]{/}[00]"}
                                        placeholder={'00/00'}
                                        style={[styles.textInputStyle, statuses.expiry !== 'valid' && { color: 'red' }]}
                                        onChangeText={(formatted, extracted) => handleExpiryChange(extracted)}
                                        value={form.expiry}
                                    />
                                </View>
                                <View style={styles.itemRow}>
                                    <Text style={styles.labelText}>CVV</Text>
                                    <TextInputMask
                                        keyboardType={'number-pad'}
                                        mask={"[000]"}
                                        placeholder={'***'}
                                        style={[styles.textInputStyle, statuses.cvv !== 'valid' && { color: 'red' }]}
                                        onChangeText={(formatted, extracted) => handleCvvChange(extracted)}
                                        value={form.cvv}
                                    />
                                </View>
                            </View>
                        </View>
                        <Text style={styles.label}>Monto a recargar</Text>
                        <View style={styles.amountInputContainer}>
                            <TextInputMask
                                keyboardType={'number-pad'}
                                mask={"₡ [999],[990].[99]"}
                                placeholder={'Monto'}
                                placeholderTextColor={primary}
                                style={styles.amountTextInput}
                                onChangeText={(formatted, extracted) => {}}
                                
                            />
                        </View>
                        <PrimaryButton
                            containerStyle={{ marginTop: 40, marginBottom: 20}}
                            title='Guardar'
                            onPress={onPressSaveButton}
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

BuyCreditScreen.defaultProps = {
    onCardChange: () => {}
}

export default BuyCreditScreen;

const styles = StyleSheet.create({
    body: {
        margin: 20,
        flex: 1
    },
    title: {
        marginVertical: 10,
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
        paddingVertical: 20,
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
    label: {
        marginTop: 20, 
        textAlign: 'center', 
        color: text, 
        fontSize: 16, 
        fontFamily: 'Sarabun-Regular' 
    },
    amountInputContainer: {
        backgroundColor: card,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        width: '100%',
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
    amountTextInput: {
        flex: 1,
        width: '100%',
        padding: 0,
        fontFamily: 'Sarabun-Medium',
        fontSize: 16,
        textAlign: 'center',
        color: secondary
    }
});