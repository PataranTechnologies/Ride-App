import React, { useState }from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import DefaultTheme from '../constants/DefaultTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { card, primary } = DefaultTheme.colors;

const ChooseFileButton = ({
    onChange, value,
}) => {

    const requestPermisions = async () => {
        const cameraStatus = await request(
            Platform.select({
                android: PERMISSIONS.ANDROID.CAMERA,
                ios: PERMISSIONS.IOS.CAMERA,
            }));
        const photoLibraryStatus = await request(
            Platform.select({
                android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
            }));
        return { cameraStatus, photoLibraryStatus };
    }

    const pickImage = () => {
        requestPermisions().then(statuses => {
            const { cameraStatus, photoLibraryStatus } = statuses;
            if (cameraStatus == 'denied') {
                Alert.alert(
                    'Permiso de Acceso a Cámara Denegado',
                    'Para tomar la fotografía de perfil, es necesario este acceso',
                );
            } else if (photoLibraryStatus == 'denied') {
                Alert.alert(
                    'Permiso de Acceso a Galería Denegado',
                    'Para seleccionar la fotografía de perfil, es necesario este acceso',
                );
            } else {
                const options = {
                    title: 'Seleccione una opción',
                    takePhotoButtonTitle: 'Tomar Fotografía',
                    chooseFromLibraryButtonTitle: 'Escoger de la Galería',
                    cancelButtonTitle: 'Cancelar',
                    mediaType: 'photo',
                    quality: 0.5,
                    allowsEditing: true,
                };

                ImagePicker.showImagePicker(options, (response) => {
                    if (response.didCancel) {
                        //console.log('User cancelled image picker');
                    } else if (response.error) {
                        //console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        //console.log('User tapped custom button: ', response.customButton);
                    } else {
                        // You can also display the image using data:
                        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                        onChange({ uri: response.uri });
                    }
                });
            }
        });
    }
    return (
        <TouchableOpacity onPress={() => pickImage()} style={styles.container}>
                <Text style={styles.text}>Selecciona un archivo</Text>
                { value !== null ? 
                <Ionicons
                    name={'ios-checkmark-circle-outline'}
                    color={'green'}
                    size={24}
                /> : null }
        </TouchableOpacity>
    );
};

ChooseFileButton.defaultProps = {
    onChange: () => {},
}

export default ChooseFileButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: card,
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: '100%',
        elevation: 3,
        borderRadius: 25,
        marginTop: 20,
    },
    text: {
        fontFamily: 'Sarabun-Medium',
        fontSize: 16,
        color: primary,
    }
});