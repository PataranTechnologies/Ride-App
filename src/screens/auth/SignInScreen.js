import React, { useRef } from 'react';
import { Image, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';

import APIKit, { setClientToken } from '../../utils/APIKit';
import DefaultTheme from '../../constants/DefaultTheme';
import TextInputIconRight from '../../components/TextInputIconRight';
import PrimaryButton from '../../components/PrimaryButton';
import SharedStyles from '../../constants/SharedStyles';
import CustomAlert from '../../components/CustomAlert';

import { AuthContext } from '../../context/context';

const { header, card, secondary} = DefaultTheme.colors;

const SignIn = (props) => {
  React.useEffect(() => {
    console.log('************* LOGIN: ');
  },[]);
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  const [alertData, setAlertData] = React.useState({
    isVisible: false,
    title: '',
    description: '',
    showConfirmButton: true,
    showProgress: false,
  });

  const { signIn } = React.useContext(AuthContext);

  const netInfo = useNetInfo();

  let passwordInput = React.createRef();

  const focusNextField = () => {
    passwordInput.current.focus();
  }

  const handleEmailChange = (text) => {
    setData({
      ...data,
      email: text
    });
  }

  const handlePasswordChange = (text) => {
    setData({
      ...data,
      password: text
    });
  }

  const validateData = () => {
    const { email, password } = data;
    //alert('Type: ' +  netInfo.type + ', Is Connected? ' + netInfo.isConnected.toString())
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === '' || !regex.test(email.trim())) {
      setAlertData({
        isVisible: true,
        title: 'Email inválido',
        description: 'Asegúrese de ingresar un email válido',
      });
    } else if (password === '' || password.length<8 ) {
      setAlertData({
        isVisible: true,
        title: 'Contraseña inválida',
        description: 'Asegúrese de ingresar una contraseña válida',
      });
    }else {
      setAlertData({
        isVisible: true,
        title: 'Iniciando sesión',
        showProgress: true,
        showConfirmButton: false,
      });
      login();
    }
  }

  const login = () => {
    const { email, password } = data;

    let payload = new FormData();  
    payload.append('email', email.trim()), 
    payload.append('password', password.trim())

    const onSuccess = async ({ data }) => {
      //se configura el client token para el APIKit
      console.log('LOGIN DATA: ');
      console.log(data);
      setClientToken(data.token);
      try {
        await AsyncStorage.setItem('@ride/userToken', data.token)
      } catch (e) {
        console.log(e);
      }
      setAlertData({
        ...alertData,
        isVisible: false,
      });
      signIn(data.token, data.user);
    };

    const onFailure = error => {
      console.log(JSON.stringify(error));
      if(error.response.data.error == "Unauthorised") {
          setAlertData({
            isVisible: true,
            title: 'Error',
            description: 'Email o contraseña invalido, intente otra vez',
            showProgress: false,
            showConfirmButton: true,
          });
      } else if (error.response.data.error == "El email no existe en nuestros registros" ) {
        setAlertData({
          isVisible: true,
          title: 'Email no registrado',
          description: 'El email no existe en nuestros registros',
          showProgress: false,
          showConfirmButton: true,
        });
      } else {
        setAlertData({
          isVisible: true,
          title: 'Error',
          description: error.message,
          showProgress: false,
          showConfirmButton: true,
        });
      }
    };

    APIKit.post('/auth/login', payload)
      .then(onSuccess)
      .catch(onFailure);
  }

  const hideAlert = () => {
    setAlertData({ ...alertData, isVisible: false });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      
      style={SharedStyles.container}
    >
      <ScrollView style={SharedStyles.container}>
        <View style={{}}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../../../assets/images/header.png')}
              style={styles.headerImage}
            />
          </View>
          <View style={{height: 60}} />
          <View style={styles.roundedImageContainer}>
            <Image 
              source={require('../../../assets/images/logo_login.png')}
              style={styles.roundedImage}
            />
          </View>
        </View>
        <Text style={{ textAlign: 'center' }}>
          <Text style={styles.title}>¡Bienvenido a Ride!</Text>{"\n"}
          <Text style={styles.description}>Inicia Sesión para continuar</Text>
        </Text>
        <View style={{marginHorizontal: 20}}>
          <TextInputIconRight 
            autoCompleteType={'username'}
            autoCapitalize={'none'}
            blurOnSubmit={false}
            iconName="email-outline"
            maxLength={250}
            onChangeText={(email) => handleEmailChange(email)}
            onSubmitEditing={() => focusNextField() }
            placeholder="Email"
            returnKeyType={'next'}
          />
          <TextInputIconRight
            autoCompleteType={'password'}
            autoCapitalize={'none'}
            iconName="lock-open-outline"
            maxLength={150}
            onChangeText={(password) => handlePasswordChange(password)}
            onSubmitEditing={() => validateData()}
            placeholder="Contraseña"
            ref={passwordInput}
            secureTextEntry={true}
          />
          <Text style={styles.forgottenPasswordContainer} onPress={() => {
            Linking.openURL('http://ride.danthoppruebas.com/password/reset ')
              .catch((err) => console.error('An error occurred by open reset password', err));
            }}>
            <Text style={styles.description}>¿Olvidaste tu contraseña?</Text>
            <Text style={{ fontFamily: 'Sarabun-Bold'}}> Recupérala</Text>
          </Text>
          <PrimaryButton
            containerStyle={{ marginVertical: 36 }}
            onPress={() => validateData()}
            title="Entrar"
          />
          <View style={{alignItems: 'center', marginBottom: 60}}>
            <Text style={[styles.description,{ lineHeight: 18 }]}>¿No tienes una cuenta?</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('SignUpPhone')}>
              <Text style={[styles.registerText, { lineHeight: 20 }]}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomAlert
          isVisible={alertData.isVisible}
          title={alertData.title}
          description={alertData.description}
          onBackButtonPress={hideAlert}
          onConfirmPressed={hideAlert}
          showProgress={alertData.showProgress}
          showConfirmButton={alertData.showConfirmButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: header,
    paddingTop: 15,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  headerImage: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
  },
  roundedImageContainer: {
    height: 120,
    width: 120,
    position: 'absolute',
    bottom: 0,
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
    height: 80, 
    width: 80, 
    resizeMode: 'contain',
  },
  title: { 
    fontFamily: 'Sarabun-Bold', 
    marginTop: 16, 
    fontSize: 24, 
  },
  description: { 
    fontFamily: 'Sarabun-Regular', 
    fontSize: 14, 
    color: secondary,
  },
  forgottenPasswordContainer: {
    textAlign: 'right',
    paddingTop: 5,
  },
  registerText: {
    fontFamily: 'Sarabun-Bold',
    fontSize: 16, 
  }
});
