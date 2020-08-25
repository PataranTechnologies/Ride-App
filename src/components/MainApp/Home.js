import React, { Component, useState, useEffect } from 'react';
import { View,Text, StyleSheet,TouchableOpacity,PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import { color } from 'react-native-reanimated';
import MapView,{ Polyline,PROVIDER_GOOGLE  }  from  'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
const Home=(props)=>  {
    const open=()=>{
        props.navigation.openDrawer();
    } 
    const [granted,setGranted]=useState(false)

    const [location,setLocation] =useState({
        latitude: 37.78825,
        longitude: -122.4324,
      });
    useEffect(()=>
    {

      setTimeout(async()=>{

          const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
              {
                  title: 'Location Permission',
                  message:'Get your location to post request',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
              },  
          );
          
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              
             Geolocation.watchPosition (position => {
                  setLocation({longitude:position.coords.longitude,
                  latitude:position.coords.latitude,
              
                  })
                
              });
              setGranted(true);
          }
          


      },100)
      
  
    },[])
    const getRegion=()=>({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05

     })
    var _mapView;
        return ( <View style={styles.container}>
           
           <TouchableOpacity onPress={()=>open()} style={styles.FixedIcon}>
                <Icon name='menu' style={styles.MenuIcon} />
                </TouchableOpacity>
         <View style={styles.mapContainer}>   
         <Text>Hola</Text>    
     <MapView
      style={styles.map}
        showUserLocation
    provider={PROVIDER_GOOGLE}

      followUserLocation
      zoomControlEnabled
      ref = {(mapView) => { _mapView = mapView; }}
      loadingEnabled
      region={getRegion()}
     
    >

        </MapView>
</View>

            </View> );
    }



const styles=StyleSheet.create({
 container:{
     flex:1,
     alignItems:'center',
 },
    FixedIcon:{
position:"absolute",
top:20,
left:30,
width:60,
height:60,
borderRadius:60,
backgroundColor:'white',
    },
    MenuIcon:{
        position:"absolute",
        top:5,
        left:5,
         fontSize:50,   
         color:'red'     

    },
    mapContainer:{
        flex:1,
        position:'absolute',
        top:0,
        bottom:0,
        
        right:0,
    },
    map:{
        ...StyleSheet.absoluteFillObject
    },

})
 
export default Home;