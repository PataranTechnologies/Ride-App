import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

function MiniOfflineSign() {
    return (
        <View style={{ flex: 0.05 }}>
            <View style={styles.offlineContainer}>
                <Text style={styles.offlineText}>No hay conexión a intenet. Conéctate a una red wi fi o móvil</Text>
            </View>
        </View>
    );
}

class OfflineMessage extends PureComponent {
    state = {
        isConnected: true,
        unsubscribe: ''
    };

    componentDidMount() {
        // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this.state.unsubscribe = NetInfo.addEventListener(state => {
            //console.log("Connection type", state.type);
            //console.log("Is connected?", state.isConnected);
            this.handleConnectivityChange(state.isConnected)
        });
    }

    componentWillUnmount() {
        this.state.unsubscribe();
        // NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected: isConnected });
    };

    render() {
        if (!this.state.isConnected) {
            return <MiniOfflineSign />;
        }
        return null;
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        padding: 10,
        position: 'absolute',
        bottom: 0,
    },
    offlineText: { 
        color: '#fff', 
        fontFamily: 'Sarabun-Regular' 
    }
});

export default OfflineMessage;