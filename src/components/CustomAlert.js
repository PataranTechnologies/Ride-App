import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import DefaultTheme from '../constants/DefaultTheme';
import PrimaryButton from './PrimaryButton';
import { BallIndicator } from 'react-native-indicators';

const images = {
    alert: require('../../assets/images/alert_ic.png'),
    success: require('../../assets/images/good.png'),
}

const { colors } = DefaultTheme;

const CustomAlert = ({
    description, isVisible, onBackButtonPress, onConfirmPressed, showConfirmButton, showProgress, title, type, 
}) => {
    return (
        <Modal isVisible={isVisible} onBackButtonPress={onBackButtonPress}>
            <View style={styles.content}>
                {showProgress ? (
                <View style={styles.progressContainer}>
                    <BallIndicator color={colors.header} size={50} />
                </View> ) : <Image
                    source={images[type]}
                    style={{ width: 60, height: 60, resizeMode: 'contain' }}
                /> }
                { title ? <Text style={styles.title}>{ title }</Text> : null }
                { description ? <Text style={styles.description}>{description}</Text> : null }
                { showConfirmButton ? (
                <View style={{width: '100%', marginTop: 12}}>
                    <PrimaryButton
                        buttonStyle={{height: 42}}    
                        title={'Aceptar'}
                        onPress={onConfirmPressed}
                    />
                </View> ) : null 
                }
            </View>
        </Modal>
    );
}

CustomAlert.defaultProps = {
    isVisible: false,
    onBackButtonPress: () => {},
    onConfirmPressed: () => {},
    type: 'alert',
    showConfirmButton: true,
    showProgress: false,
}

CustomAlert.propTypes = {
    description: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    onBackButtonPress: PropTypes.func.isRequired,
    onConfirmPressed: PropTypes.func.isRequired,
    showConfirmButton: PropTypes.bool.isRequired,
    showProgress: PropTypes.bool,
    title: PropTypes.string,
    type: PropTypes.oneOf(['alert', 'success']).isRequired,
}

export default CustomAlert;

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        padding: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    description: {
        fontFamily: 'Sarabun-Regular',
        fontSize: 16,
        color: colors.description,
        textAlign: 'center'
    },
    title: {
        fontFamily: 'Sarabun-SemiBold',
        fontSize: 18,
        textAlign: 'center',
        color: colors.text,
    },
    progressContainer: { 
        width: 60, 
        height: 60, 
    }
});