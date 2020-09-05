import React from 'react';
import { ImageBackground } from 'react-native';

const SplashScreen = (props) => {
    return (
        <ImageBackground
            style={{ flex: 1}}
            source={require('../../../assets/images/splash.png')}
            resizeMode={'cover'}
        />
    );
}

export default SplashScreen;
