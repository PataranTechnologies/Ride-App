
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import DefaultTheme from '../../constants/DefaultTheme';
import Header from '../../components/Header';
import SharedStyles from '../../constants/SharedStyles';
import SelectId from '../../components/SelectId';
import PrimaryButton from '../../components/PrimaryButton';
import CustomTextInput from '../../components/CustomTextInput';
import CustomAlert from '../../components/CustomAlert';
import PrimarySwitch from '../../components/PrimarySwitch';
import ChooseFileButton from '../../components/ChooseFileButton';

const { card, primary } = DefaultTheme.colors;


const SignUpScreen = (props) => {
    const [form, setForm] = useState({
        img: null,
        identifier: 'ID',
        id: '',
        identifierSource: null,
        firstname: '',
        lastname: '',
        province: '',
        email: '',
        password: '',
        password_confirmation: '',
        applyTwoStepVerification: false
    });

    const [alertData, setAlertData] = React.useState({
        isVisible: false,
        title: '',
        description: '',
        showConfirmButton: true,
        showProgress: false,
        onConfirmPressed: hideAlert
    });

    const handleIdChange = (id) => {
        setForm({
            ...form,
            id,
        });
    }

    const handleFirstNameChange = (firstname) => {
        setForm({
            ...form,
            firstname,
        });
    }

    const handleLastNameChange = (lastname) => {
        setForm({
            ...form,
            lastname,
        });
    }

    const handleProvinceChange = (province) => {
        setForm({ ...form, province });
    }

    const handleEmailChange = (email) => {
        setForm({ 
            ...form, 
            email,
        });
    }

    const handlePasswordChange = (password) => {
        setForm({
            ...form,
            password,
        });
    }

    const handlePasswordConfirmationChange = (password_confirmation) => {
        setForm({
            ...form,
            password_confirmation,
        });
    }

    const toggleSwitch = () => {
        setForm({
            ...form,
            applyTwoStepVerification: !form.applyTwoStepVerification,
        });
    }

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
                    title: 'Seleccione su foto de Perfil',
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
                        const source = { uri: response.uri };
                        // You can also display the image using data:
                        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                        setForm({
                            ...form,
                            img: source,
                        })
                    }
                });
            }
        });
    }

    const formValidation = () => {
        const { id, identifier, identifierSource, img, firstname, lastname, province, email,
            password, password_confirmation, applyTwoStepVerification } = form;
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(img === null){
            setAlertData({
                isVisible: true,
                title: 'Imagen de perfil inválida',
                description: 'Por favor seleccione una imagen de perfil',
                showConfirmButton: true,
                showProgress: false,
                onConfirmPressed: hideAlert
            });
        }else if(identifier ==='ID' && id === '') {
            setAlertData({
                isVisible: true,
                title: 'ID inválido',
                description: 'Por favor ingrese su ID',
                showConfirmButton: true,
                showProgress: false,
                onConfirmPressed: hideAlert
            });
        } else if (identifier !== 'ID' && identifierSource === null) {
            setAlertData({
                isVisible: true,
                title: identifier + ' inválido',
                description: 'Por favor seleccione el archivo correspondiente',
                showConfirmButton: true,
                showProgress: false,
                onConfirmPressed: hideAlert
            });         
        } else if(firstname == '') {
            setAlertData({
                isVisible: true,
                title: 'Nombre inválido',
                description: 'Por favor ingrese su nombre',
                showConfirmButton: true,
                showProgress: false,
                onConfirmPressed: hideAlert
            });    
        } else if (lastname == '') {
            setAlertData({
                isVisible: true,
                title: 'Apellido inválido',
                description: 'Por favor ingrese su apellido',
                showConfirmButton: true,
                showProgress: false,
                onConfirmPressed: hideAlert
            });
        } else if (province == '') {
            setAlertData({
                isVisible: true,
                title: 'Provincia inválido',
                description: 'Por favor ingrese su provincia',
                showConfirmButton: true,
                showProgress: false,
                onConfirmPressed: hideAlert
            });
        } else if (email === '' || !regex.test(email.trim())) {
            setAlertData({
                isVisible: true,
                title: 'Email inválido',
                description: 'Asegúrese de ingresar un email válido',
                showConfirmButton: true,
                showProgress: false,
                onConfirmPressed: hideAlert
            });
        } else if (password === ''  || password.length < 8) {
            setAlertData({
                isVisible: true,
                title: 'Contraseña inválida',
                description: 'Por favor ingrese una contraseñ válida',
                showConfirmButton: true,
                showProgress: false,
                onConfirmPressed: hideAlert
            });
        } else if (password !== password_confirmation) {
            setAlertData({
                isVisible: true,
                title: 'La contraseña no coincide',
                description: 'Por favor asegurese de ingresar la misma contraseña',
                showConfirmButton: true,
                showProgress: false,
                onConfirmPressed: hideAlert
            });
        } else{
            //hideAlert();
            sendDataToNextScreen();
        }    
    }

    const sendDataToNextScreen = () => {
        const { id, identifier, identifierSource, img, firstname, lastname, province, email,
            password, password_confirmation, applyTwoStepVerification } = form;

        const { countryCode, phoneNumber } = props.navigation.state.params;
        let payload = new FormData();
        payload.append('name', firstname);
        payload.append('photo', {
            uri: Platform.OS === 'android' ? img.uri : img.uri.replace('file://', ''),
            type: 'image/jpeg',
            name: 'photo'
        });
        payload.append('paternalLastName', lastname);
        payload.append('province', province);
        payload.append('email', email);
        payload.append('password', password);
        payload.append('c_password', password_confirmation);
        payload.append('countryCodes', countryCode);
        payload.append('phone', phoneNumber);
        payload.append('type', 'Cliente');
        payload.append('twoStep', applyTwoStepVerification == true ? 1 : 0);
        if (identifier === 'ID') {
            payload.append('id', id);
        } else {
            payload.append('id_img', {
                uri: Platform.OS === 'android' ? identifierSource.uri : identifierSource.uri.replace('file://', ''),
                type: 'image/jpeg',
                name: 'photo.jpg'
            })
        }
        props.navigation.navigate('PayInfo', { payload });
    }
    const onsubmit=()=>{
        props.navigation.navigate('PayInfo', {});

    }

    const hideAlert = () => {
        setAlertData({ ...alertData, isVisible: false });
    };

    const showImageDialog = () => {
        setAlertData({
            description: "No importa si es de cuerpo completo o solo tu rostro",
            isVisible: true,
            title: "Es necesaria una foto clara donde se vea tu rostro",
            showConfirmButton: true,
            showProgress: false,
            onConfirmPressed: () => {
                hideAlert();
                setTimeout(() => {
                    pickImage();
                }, 300);
            },
        });
    }

    return (
        <View style={SharedStyles.container}>
            
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={SharedStyles.container}
            >
                <ScrollView>
                    <View style={styles.body}>
                        <View onTouchStart={() => showImageDialog()} style={styles.roundedImageContainer}>
                            <Image
                                source={form.img == null ? require('../../../assets/images/photo_camera.png') : form.img}
                                style={form.img === null ? styles.roundedImage : styles.avatar}
                            />
                        </View>
                        <SelectId
                            value={form.id}
                            maxLength={150}
                            placeholder="ID"
                            selectedItem={(val) => { setForm({ ...form, identifier: val, identifierSource: null,}) }}
                            onChangeTextInput={(text) => handleIdChange(text)}
                        />
                        { form.identifier !== 'ID' && <ChooseFileButton 
                                onChange={(source) => { 
                                    setForm({ ...form, identifierSource: source })
                                    console.log('Sorce: ', source);
                                }}
                                value={form.identifierSource}
                            />
                        }
                        <CustomTextInput
                            autoCompleteType={'name'}
                            autoCapitalize={'sentences'}
                            keyboardType={'default'} 
                            maxLength={250}
                            onChangeText={handleFirstNameChange}
                            placeholder="Nombre"
                            value={form.firstname}
                        />
                        <CustomTextInput
                            autoCompleteType={'name'}
                            autoCapitalize={'sentences'}
                            keyboardType={'default'}
                            maxLength={250}
                            onChangeText={(text) => handleLastNameChange(text)}
                            placeholder="Apellido"
                            value={form.lastname}
                        />
                        <CustomTextInput
                            keyboardType={'default'}
                            maxLength={250}
                            onChangeText={(text) => handleProvinceChange(text)}
                            placeholder="Provincia"
                            value={form.province}
                        />
                        <CustomTextInput
                            autoCompleteType={'email'}
                            autoCapitalize={'none'}
                            keyboardType={'email-address'}
                            maxLength={250}
                            onChangeText={(text) => handleEmailChange(text)}
                            placeholder="Correo Eléctronico"
                            value={form.email}
                        />
                        <CustomTextInput
                            keyboardType={'default'}
                            maxLength={250}
                            onChangeText={(text) => handlePasswordChange(text)}
                            placeholder="Contraseña"
                            secureTextEntry={true}
                            value={form.password}
                        />
                        <Text style={styles.helpText}>La contraseña debe tener mínimo 8 caracteres</Text>
                        <CustomTextInput
                            containerStyle={{marginTop: 5}}
                            keyboardType={'default'}
                            maxLength={250}
                            onChangeText={(text) => handlePasswordConfirmationChange(text)}
                            placeholder="Confirmar Contraseña"
                            secureTextEntry={true}
                            value={form.password_confirmation}
                        />
                        <View style={{ marginTop: 20, marginBottom: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'Sarabun-SemiBold', fontSize: 16 }}>
                                ¿Aplicar verificación en dos pasos?
                            </Text>
                            <PrimarySwitch
                                onValueChange={toggleSwitch}
                                value={form.applyTwoStepVerification}
                            />
                        </View>
                        <PrimaryButton
                            title="Registrarme"
                            onPress={onsubmit()}
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

export default SignUpScreen;

const styles = StyleSheet.create({
    avatar: { 
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: 'cover',
        },
    body: {
        flex: 1,
        margin: 20,
        marginTop:30,
        marginBottom: 40,
    },
    roundedImageContainer: {
        height: 120,
        width: 120,
        backgroundColor: card,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    roundedImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    helpText: {
        color: primary,
        fontFamily: 'Sarabun-Medium',
        fontSize: 14,
    } 
});






/*import React, { Component, useState } from 'react';
import { Switch, Image,View, StyleSheet,Text, Linking,Modal ,TextInput } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker'
import { color } from 'react-native-reanimated';
 const RegisterScreen=(props)=> {
    
     const [photo,setPhoto]=useState(null)
    const [upload,setUpload]=useState(false)
     const [idType,setIdType]=useState()
     const [id,setId]=useState('')
     const [firstName,setFirstName]=useState('')
     const [lastName,setLastName]=useState('')
     const [ province,setProvince]=useState('')
     const [email,setEmail]=useState('')
     const [password,setPassword]=useState('')
     const [twoStep,setTwoStep]=useState(false)
     const [passwordSame,setPasswordSame]=useState(true);
     const [confirmModalShow,setConfirmModalShow]=useState(false);
     
     const onSubmit=()=>{
         setConfirmModalShow(true);
       // 
     }
     const onSubmitConfirm=()=>{
         setConfirmModalShow(false),
        props.navigation.navigate('PayInfo')
     }

     handleChoosePhoto = () => {
        const options = {
          noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
          if (response.uri) {
            setPhoto(response);
            setUpload(true);
          }
        })
      }

     const passwordVerify=(pass)=>{
         
        if(pass===password)
        {
         setPasswordSame(true)
        }
        else
        {
         setPasswordSame(false)
        }
     }
  
        return ( <View style={styles.container}>
             {
                    confirmModalShow? <Modal
                    transparent={true}
                    animationType="fade"
                   onRequestClose={() => {setConfirmModalShow(false)}}
                    visible={confirmModalShow}>
                     
                  <View style={styles.modalBackground}>
                  <View style={styles.activityIndicatorWrapper}>
                      
                       <View style={styles.danger}>
                           <Text style={styles.dangerText}>!</Text>
                       </View>

                       <Text style={styles.modalHeader}>Es necesaria una foto clara donde se vea tu rostro</Text>
                       
                       <Text style={styles.modalMessage}>No importal si es de cuerpo completo solo tu rostro</Text>
                      

                       <TouchableOpacity onPress={()=>{onSubmitConfirm()}} style={styles.Button}>

<Text style={styles.buttonText}>Aceptar</Text>

</TouchableOpacity>
                      </View></View>
                 
                  </Modal>:null
                }


            <ScrollView showsVerticalScrollIndicator={false}  style={styles.innerContainer}>

            <TouchableOpacity style={styles.userImageContainer} onPress={()=>{handleChoosePhoto()}}>
             {!upload?<Image style={styles.userImages} source={require('../../../images/camera.png')} />:<Image  style={styles.userImages} source={{uri:photo.uri}} />}
            </TouchableOpacity>


            <View style={styles.rowInput}>
                           <TextInput  value={id} onChangeText={(text)=>{setId(text)}} secureTextEntry={true} style={styles.input}  placeholder='Id' />
                           
                           </View> 

            <View style={styles.rowInput}>
                           <TextInput value={firstName} onChangeText={(text)=>{setFirstName(text)}} secureTextEntry={true} style={styles.input}  placeholder='Nombre' />
                           
                           </View> 
            <View style={styles.rowInput}>
                           <TextInput value={lastName} onChangeText={(text)=>{setLastName(text)}} secureTextEntry={true} style={styles.input}  placeholder='Apellido' />
                          
                           </View> 
            <View style={styles.rowInput}>
                           <TextInput value={province} onChangeText={(text)=>{setProvince(text)}} secureTextEntry={true} style={styles.input}  placeholder='Provincia' />
                           
                           </View> 
           <View style={styles.rowInput}>
                           <TextInput value={email} onChangeText={(text)=>{setEmail(text)}} secureTextEntry={true} style={styles.input}  placeholder='Correo Electronico' />
                           
                           </View> 
            <View style={styles.rowInput}>
                           <TextInput value={password} onChangeText={(text)=>{setPassword(text)}} secureTextEntry={true} style={styles.input}  placeholder='Contrasena' />
                          
                           </View> 
            <Text style={styles.passwordInfo}>la contrasena debe tenar minimo 8 caracteres </Text>
            <View style={styles.rowInput}>
                           <TextInput  onChangeText={(text)=>{passwordVerify(text)}} secureTextEntry={true} style={passwordSame?styles.input:styles.inputWrong}  placeholder='Confirmar contrasena' />
                          
                           </View> 

            <View style={styles.row}>
                <Text style={styles.regTextRegister}>¿Aplicar verificacion en dos pasos?</Text>
                <Switch value={twoStep} onValueChange={()=>{setTwoStep(!twoStep)}}  style={styles.switch} />
                </View>




            <TouchableOpacity onPress={()=>onSubmit()} style={styles.loginButton}>

<Text style={styles.buttonText}>Registrarme</Text>

</TouchableOpacity>
          
            
                        
            </ScrollView>
                        </View> );
    }

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#e6f2ff',
        flex:1,
        
    },
    modalCont:{
        flex:1,
        
    },
   
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000080'
      },

      activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
       padding:20,
        borderRadius: 30,
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        margin:30,

      },
    innerContainer:{
        
        margin:20,
        marginTop:0,

        paddingTop:30
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
    rowInput:{
        width:'100%',
        flexDirection:'row',

        marginTop:20
        

    },
    input:{
        flex:9,
        backgroundColor:'white',
        height:50,
        borderRadius:30,
        padding:10,
        paddingLeft:20
    },
    inputWrong:{
        flex:9,
        backgroundColor:'white',
        borderColor:'red',
        borderWidth:2,
        height:50,
        borderRadius:30,
        padding:10,
        paddingLeft:20
    },
    Button:{

        
    
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0000cc',
        padding:18,
        borderRadius:30,
        marginTop:20,
        marginBottom:30,
        


        

    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
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

    userImageContainer:{
        width:150,
        height:150,
        
        alignSelf:'center'
    },
    userImages:{
        width:150,
        height:150,
        borderRadius:100,
        
    },
    passwordInfo:{
        marginTop:5,
        marginBottom:-10,
        color:'gray'
    },

    row:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    regTextRegister:{
        
        fontWeight:'bold',
        fontSize:17,
    },
    switch:{

        fontSize:15,

    },
    danger:{
        width:80,
        height:80,
        borderRadius:80,
        backgroundColor:'#cc0000',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    },
    dangerText:{
        color:'white',
        fontSize:40,
        fontWeight:"bold"
    },
    modalHeader:{
        marginTop:10,
        fontWeight:'bold',
        textAlign:'center',
        fontSize:23,
    },
    modalMessage:{
        color:'gray',
        fontSize:20,
        textAlign:'center',
        marginTop:20,
    },
    
})
export default RegisterScreen;


*/