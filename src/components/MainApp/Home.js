import React, { Component, useState, useEffect } from 'react';
import { View,Text, StyleSheet,TouchableOpacity,PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import { color } from 'react-native-reanimated';
import MapView,{ Polyline,PROVIDER_GOOGLE  }  from  'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const Home=(props)=>  {
    const open=()=>{
        props.navigation.openDrawer();
    } 
    const [granted,setGranted]=useState(false)

/*



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

<Text style={{position:'absolute',top:60,}}>Hola</Text>  

        </MapView>



*/



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
        return ( <View style={styles.map}>

<MapView
      style={styles.container}
        showUserLocation
    provider={PROVIDER_GOOGLE}

      followUserLocation
      zoomControlEnabled
      ref = {(mapView) => { _mapView = mapView; }}
      loadingEnabled
      region={getRegion()}
     
    >

 

        </MapView>


          
           <TouchableOpacity style={styles.FixedIcon} onPress={()=>open()} >
                <Icon name='menu' style={styles.MenuIcon} />
                </TouchableOpacity>

        <View style={styles.bookView}>

            <TouchableWithoutFeedback style={styles.bookTouch}>
            <View style={styles.bookRow}>
                <Text style={styles.mainHeader}>iBuenas tardes, Manuel!</Text>
                <Text style={styles.mainMessage}>¿A donde deseas ir?</Text>
                </View>
           
           <Icon name='chevron-right' style={styles.arrowIcon} />
            </TouchableWithoutFeedback>

        </View>
      
           
</View>

             );
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
paddingVertical: 0,
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
  
    map:{
        ...StyleSheet.absoluteFillObject,
    },
    bookView:{

        position:'absolute',
        bottom:10,
        left:20,
        right:20,
        backgroundColor:'white',
        justifyContent:'center',alignItems:'center',
        width:'90%',
        padding:20,
        borderRadius:30,
    },
    bookTouch:{
        flexDirection:"row",
        backgroundColor:'white',
        justifyContent:'center',alignItems:'center',
        width:'90%',
        borderRadius:30,
    },
    bookRow:{
        flex:9,
    },
    mainHeader:{
        fontSize:20,fontWeight:'bold'
    },
    mainMessage:{
        color:'gray',
        fontSize:17,
    },
    arrowIcon:{
        fontSize:30,
        color:'blue',
    },

})
 
export default Home;