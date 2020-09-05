import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Linking, Platform, TouchableOpacity,StyleSheet,Text, View, Button} from 'react-native';

import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request } from 'react-native-permissions';
import appConfig from '../../../app.json';
import DefaultTheme from '../../constants/DefaultTheme';
import ButtonMenu from '../../components/ButtonMenu';
import WelcomeMessage from '../../components/WelcomeMessage';
import { AuthContext } from '../../context/context';
import SelectAddressScreen from './SelectAddressScreen';
import TravelPreferencesView from '../../components/TravelPreferencesView';
import RequestTravelView from '../../components/RequestTravelView';
import CancelRideScreen from '../../components/CancelRideScreen';

import CustomAlert from '../../components/CustomAlert';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialIcons'

import Icon4 from 'react-native-vector-icons/FontAwesome5'
import * as Actions from '../../RideRedux/actions'
import { color } from 'react-native-reanimated';
import MapView,{ Marker,Polyline,PROVIDER_GOOGLE  }  from  'react-native-maps'


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const { card, header, primary, secondary, text } = DefaultTheme.colors;

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RideBookedView from '../../components/RideBookedView';
import CommunicationScreen from '../../components/CommunicationScreen';
import AddStopsView from '../../components/AddStopsView';
import FinalScreen from '../../components/FinalScreen';
const Home=(props)=>  {

    let mapView = React.createRef();
    let animatedView;
  
    const [addresses, setAddresses] = useState(null);
    const [isVisibleSelectAddressScreen, setIsVisibleSelectAddressScreen] = useState(false);
    const [travelPreferences, setTravelPreferences] = useState({
        babys: false,
        pets: false
    })

    const [pageName, setPageName] = useState('welcomeMessage');
    const [alertData, setAlertData] = React.useState({
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

    const setDirectionsSource = (addressesArray) => {
        console.log('HOME ADDRESSES: ', addressesArray);
        setAddresses(addressesArray);
        props.setMainActive(false);
        setPageName('travelPreferences');
    }
    

    useEffect( () => {
        animatedView.fadeInRight(300);
    },[]);

    const getWayPoints = (unformattedWayPoints) => {
        let formattedWayPoints = [];
        unformattedWayPoints.forEach(element => {
            formattedWayPoints.push(element.format_address);
        });
        return formattedWayPoints;
    }

    const onReadyMapViewDirections = (result) => {
        console.log(`Distance: ${result.distance} km`)
        console.log(`Duration: ${result.duration} min.`)
        mapView.current.fitToCoordinates(result.coordinates, {
            edgePadding: {
                right: (width / 20),
                bottom: (height / 20),
                left: (width / 20),
                top: (height / 20),
            },
            animated: true,
        });
    }

    const onPressTravelPreferencesButton = (preferences) => {
        console.log('Travel Preferences: ', preferences);
        setPageName('requestTravel');
        animatedView.fadeInRight(300);
    }

    const onPressRequestButton = (result) => { 
        console.log('request Travel Result: ', result);
        setAlertData({
            isVisible: true,
            title: 'Buscando Conductor.\nEspere unos segundos',
            description: '',
            showConfirmButton: false,
            showProgress: true,
            onConfirmPressed: hideAlert
        });

        setTimeout(() => {
            hideAlert();
            setPageName('RideBooked');
        }, 2000)

        setTimeout(()=>{
            setISFinalScreenActive(true);



          },5000)
    }

   


    const open=()=>{
        props.navigation.openDrawer();
    } 
    const [granted,setGranted]=useState(false)
    const [travelWithPet,setTravelWithPet]=useState(false)   
    const [travelWithBaby,setTravelWithBaby]=useState(false)
    const [efectivoSelected,setEfectivoSeleted]=useState(true);
    const [cardSeleceted,setCardSeleted]=useState(false);
    
    const [chuzoSelected,setChuzoSeleted]=useState(true);
    const [chunchonSeleceted,setChunchonSeleted]=useState(false);
    
    console.log(props.mainActive);
 const onBook=()=>{
  
setIsVisibleSelectAddressScreen(true);
 }





    const getLocation = async () => {
        let status = await requestLocationPermisions();
        if (status == 'granted') {
         
            Geolocation.watchPosition(
                (position) => {
                    //console.log('Position: ', position);
                    const { coords: { latitude, longitude } } = position;
                  
                    setRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134,
                    });
                },
                (error) => {
                    // See error code charts below.
                    console.log('** ERRORES: ')
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
        if (status === 'denied') {
            Alert.alert('Permiso de ubicación denegado', 'Para mejorar la experiencia de usuario es necesario este permiso');
        }

        if (status === 'unavailable' || status === 'blocked') {
            Alert.alert(
                'Active los servicios de ubicación',
                `Para permitir que "${appConfig.displayName}" determine su ubicación.`,
                [
                    { text: "No usar Ubicación", onPress: () => { } },
                ],
            );
        }
    }

    const [isFinalScreenActive,setISFinalScreenActive]=useState(false)
    const requestLocationPermisions = async () => {
        const locationStatus = await request(
            Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            }));
        return locationStatus;
    }






    useEffect(()=>
    {

 getLocation();
   /*

        PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
              {
                  title: 'Location Permission',
                  message:'Get your location to post request',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
              },  
          ).then(granted=>{

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              
                Geolocation.watchPosition (position => {
                     setLocation({longitude:position.coords.longitude,
                     latitude:position.coords.latitude,
                 
                     })
                   
                 });
                 setGranted(true);
             }
             
   
          }).catch(error=>{
              alert(error);
          })
          
         


  */    
  
    },[])

    const finalisedRide=()=>{

        setPageName("welcomeMessage");
        setISFinalScreenActive(false);
        setAddresses(null);

    }
  
    const onFollowing=()=>{
        props.setLocationScreenActive(false);
        props.setBookingScreenActive(true);
        props.setMainActive(false);
        props.setBookedScreenActive(false)
    }
    const onSelectChuzo=()=>{
        setChunchonSeleted(false)
        setChuzoSeleted(true)
        
    }
    const onSelectChunchon=()=>{
  setChunchonSeleted(true)
  setChuzoSeleted(false)
    }
    const onGoBack=()=>{
        props.setMyLocation(null);
        props.setDestination(null);
        props.resetStops([]);
        props.setBookingScreenActive(false)
        props.setLocationScreenActive(false);
        props.setMainActive(true);

    }
    const onGoBackToLocationScreen=()=>{
         
        props.setBookingScreenActive(false)
        setIsVisibleSelectAddressScreen(true)
        setPageName("AddressPage");
        props.setMainActive(false);
        props.setBookedScreenActive(false);

    }
    
    const [region, setRegion] =useState({
        latitude: 40.4637,
        longitude: 3.7492,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      });
    const getRegion=()=>({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05

     })

     const bookARide=()=>{

      props.setBookedScreenActive(true);
      props.setBookingScreenActive(false)
      props.setLocationScreenActive(false);
      props.setMainActive(false);


     }
     const onSelectCard=()=>{
         setCardSeleted(true)
         setEfectivoSeleted(false)
     }
     const onSelectEfectivo=()=>{
         setEfectivoSeleted(true)
         setCardSeleted(false)
     }
     const [isCancleRideScreenActive,setIsCancleRideScreenActive]=useState(false)
     const [isCommunicationScreenActive,setIsCommunicationScreenActive]=useState();
     const  onCommunication=()=>{
         setIsCommunicationScreenActive(true)
     }
     const onCommunicationBackPress=()=>{
        setIsCommunicationScreenActive(false)
        
     }
     const onCancelRide=()=>{

        setIsCancleRideScreenActive(true);

     }
     const onCancelConfirm=()=>{
         setIsCancleRideScreenActive(false);
         setPageName("welcomeMessage");
         setAddresses(null);
     }
     const onParada=()=>{

     }
     const [addStopsViewActive,setAddStopsViewActive]=useState(false)
     const onaddStopViewActivate=()=>{
  

        setPageName("AddStops")


     }

     const onAddStopsConfirmPress=(addresses)=>{

        setPageName("RideBooked");
        setAddresses(addresses);

     }

    var _mapView;
        return ( <View style={styles.map}>

<MapView
      style={styles.container}
      region={region}
      showsUserLocation={true}
    
      showsMyLocationButton={true}
      loadingEnabled
      ref={mapView}
     
    >

{ addresses !== null && <MapViewDirections
                origin={region}
                waypoints={(addresses.length > 2) ? getWayPoints(addresses.slice(1, -1)) : []}
                destination={addresses[addresses.length - 1].format_address}
                apikey={'AIzaSyDhqFKc_cJv7x-PRtMMss0_u-sJ8OIZSBs'}
                strokeWidth={3}
                strokeColor={header}
                onStart={(params) => {
                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }}
                onReady={onReadyMapViewDirections}
                onError={(errorMessage) => {
                    console.log('GOT AN ERROR');
                    console.log(errorMessage)
                }}
            /> }
{ addresses !== null && 

<Marker
coordinate={{latitude:addresses[addresses.length - 1].latitude,longitude:addresses[addresses.length-1].longitude}}
    title={"Destination"}
    description={"Reach your Destination with Us."}

>

<Icon2 name='location-sharp' size={25} />
    



    </Marker>

}



        

 

        </MapView>

        { pageName === 'welcomeMessage' && <View style={styles.bookView}>

<TouchableWithoutFeedback onPress={()=>{onBook()}} style={styles.bookTouch}>
<View style={styles.bookRow}>
    <Text style={styles.mainHeader}>iBuenas tardes, Manuel!</Text>
    <Text style={styles.mainMessage}>¿A donde deseas ir?</Text>
    </View>

<Icon name='chevron-right' style={styles.arrowIcon} />
</TouchableWithoutFeedback>

</View> }

    <Animatable.View ref={ref => animatedView = ref} style={styles.cardContainer}>
                { pageName === 'travelPreferences' && <TravelPreferencesView
                    addressesArray={addresses}
                    onGoBack={onGoBackToLocationScreen}
                    onChange={(travelSettings) => { setTravelPreferences(travelSettings) }}
                    onPressNextButton={onPressTravelPreferencesButton}
                />}
                { pageName === 'requestTravel' && <RequestTravelView 
                navigation={props.navigation}
                onPressButton={onPressRequestButton} /> }
            </Animatable.View>
 {isVisibleSelectAddressScreen?
            <SelectAddressScreen 
                region={region} 
                isVisible={isVisibleSelectAddressScreen} 
                setIsVisible={(visible) => setIsVisibleSelectAddressScreen(visible)} 
                setDirectionsSource={setDirectionsSource}

            />:null
 }        
  { pageName === 'RideBooked' && <RideBookedView 
                navigation={props.navigation}
                onCancel={onCancelRide}
                onCommunication={onCommunication}
                addStopViewActivate={onaddStopViewActivate} /> }
{
    isCancleRideScreenActive?<CancelRideScreen

    onCancelConfirm={onCancelConfirm}

    onBackPress={setIsCancleRideScreenActive}
    
    />:null
}
{
    pageName=== 'AddStops'?<AddStopsView
    
    addresses={addresses}
    onconfirm={onAddStopsConfirmPress}

    />:null
}

{
    isCommunicationScreenActive?<CommunicationScreen
     
    back={onCommunicationBackPress}

    />:null
}
{
    isFinalScreenActive?<FinalScreen
    onSubmit={finalisedRide}
    conducterData={{}}
    totalFair={{}}
    />:null
}

   <CustomAlert
                isVisible={alertData.isVisible}
                title={alertData.title}
                description={alertData.description}
                onConfirmPressed={alertData.onConfirmPressed}
                showProgress={alertData.showProgress}
                showConfirmButton={alertData.showConfirmButton}
            />    
           <TouchableOpacity style={styles.FixedIcon} onPress={()=>open()} >
                <Icon name='menu' style={styles.MenuIcon} />
                </TouchableOpacity>

        
        
        
      
        



        {
       props.locationScreenActive? <View style={styles.second}>

<View style={styles.goBack}>
    <Icon2 style={styles.backIcon} onPress={()=>{onGoBack()}} name='arrow-back-circle' />
</View>
        <View style={styles.locationRow}>

<Icon2 name='location-sharp' style={styles.MylocationIcon1} />

        <Text style={styles.locationText} >{(props.myLocation && props.myLocation.address )?props.myLocation.address:""}</Text>



    </View>
    <View style={styles.locationRow}>

<Icon2 name='location-sharp' style={styles.destitionIcon} />

<Text style={styles.locationText} >{(props.destination && props.destination.address )?props.destination.address:""}</Text>



    </View>


    <View style={styles.travelWith}> 
      <View style={travelWithPet?styles.with:styles.without}>
          <Icon3 style={travelWithPet?styles.withText:styles.withoutText} name='pets' /> 
           <Text onPress={()=>{setTravelWithPet(!travelWithPet)}} style={travelWithPet?styles.withText:styles.withoutText}>viajo con mascotas </Text>
        </View>

       <View style={travelWithBaby?styles.with:styles.without}>
       <Icon4 style={travelWithPet?styles.withText:styles.withoutText} name='baby' /> 
        
            <Text onPress={()=>{setTravelWithBaby(!travelWithBaby)}} style={travelWithBaby?styles.withText:styles.withoutText}>viajo con un Bebe</Text>
    </View>
    </View>



    <TouchableOpacity onPress={()=>{onFollowing()}} style={styles.Button}>

<Text style={styles.buttonText}>Siguiente</Text>

</TouchableOpacity>

        </View>:null
    }












{
       props.bookingScreenActive? <View style={styles.second}>

<View style={styles.goBack}>
    <Icon2 style={styles.backIcon} onPress={()=>{onGoBackToLocationScreen()}} name='arrow-back-circle' />
</View>

<Text style={styles.metPago}>Metodo de pago</Text>
<View style={styles.payMethod}> 
      <View style={efectivoSelected?styles.selected:styles.notSelected}>
      <TouchableWithoutFeedback style={{flexDirection:'row'}} onPress={()=>{onSelectEfectivo()}}>  
      
          <Icon3 style={efectivoSelected?styles.withText:styles.withoutText} name='pets' /> 
           <Text  style={efectivoSelected?styles.selectedText:styles.notSelectedText}>Efectivo </Text>
      
        </TouchableWithoutFeedback>
</View>
<View style={cardSeleceted?styles.selected:styles.notSelected}>
<TouchableWithoutFeedback style={{flexDirection:'row'}}  onPress={()=>{onSelectCard()}}>
      
       <Icon4 style={cardSeleceted?styles.withText:styles.withoutText} name='baby' /> 
        
            <Text  style={cardSeleceted?styles.selectedText:styles.notSelectedText}>Tarjeta</Text>
   
    </TouchableWithoutFeedback>
</View>
<View style={styles.notSelected}>
    <TouchableWithoutFeedback style={{flexDirection:'row'}} >
       <Icon4 style={styles.withoutText} name='baby' /> 
        
            <Text onPress={()=>{}} style={styles.notSelectedText}>Credito</Text>
    </TouchableWithoutFeedback>
</View>
<View style={styles.notSelected}>
    <TouchableWithoutFeedback style={{flexDirection:'row'}}>
       <Icon4 style={styles.withoutText} name='baby' /> 
        
            <Text onPress={()=>{}} style={styles.notSelectedText}>cupon</Text>
    </TouchableWithoutFeedback>
   </View>
    </View>


        <Text style={styles.vehicalTitle}>Tipo de Vehiculo</Text>

    <View style={styles.vehicalRow}> 
    <View style={chuzoSelected?styles.Vselected:styles.VnotSelected}>
<TouchableWithoutFeedback style={{flexDirection:'row'}}  onPress={()=>{onSelectChuzo()}}>
      
       <Icon4 style={chuzoSelected?styles.VwithText:styles.VwithoutText} name='car-side' /> 
        <View style={{marginLeft:5,}}>
            <Text  style={chuzoSelected?styles.VselectedText:styles.VnotSelectedText}>Chuzo</Text>
            <Text  style={chuzoSelected?styles.VselectedText2:styles.VnotSelectedText2}>€ 800</Text>
        
         </View>
    </TouchableWithoutFeedback>
</View>


<View style={chunchonSeleceted?styles.Vselected:styles.VnotSelected}>
<TouchableWithoutFeedback style={{flexDirection:'row'}}  onPress={()=>{onSelectChunchon()}}>
      
       <Icon4 style={chunchonSeleceted?styles.VwithText:styles.VwithoutText} name='car-side' /> 
       <View style={{marginLeft:5,}}>
            <Text  style={chunchonSeleceted?styles.VselectedText:styles.VnotSelectedText}>Chunchon</Text>
            <Text  style={chunchonSeleceted?styles.VselectedText2:styles.VnotSelectedText2}>€ 1200</Text>
        
         </View>
    </TouchableWithoutFeedback>
</View>

    </View>



    <TouchableOpacity onPress={()=>{bookARide()}} style={styles.Button}>

<Text style={styles.buttonText}>Solicitar Viaje</Text>

</TouchableOpacity>

        </View>:null
    }
 















 {
       props.bookedScreenActive? 
       <View style={styles.second}>


     <View style={styles.bookedScreenRow}>

         <Icon style={styles.bookingShare} name='share' />

         <View style={styles.bookedInnerRow}>

             <Image style={styles.riderImage} source={{uri:'https://cdn4.vectorstock.com/i/1000x1000/08/33/profile-icon-male-user-person-avatar-symbol-vector-20910833.jpg'}}  />

             <View style={styles.riderDetails}> 

            <Text style={styles.name}>Guillermo lopez</Text>
            <View style={styles.ratingRow}>
             
             <Icon style={styles.startIon} name='star' />
             <Text style={styles.rating}>4.89</Text>

            </View>

            <Text style={styles.car}>Chevrolet spark Azul</Text>
            <Text style={styles.carModel}>SWZ-321-B</Text>
            <Text style={styles.atDistance}>A 6 minutos de distancia</Text>
            




                 </View>


             </View>



             <Icon style={styles.bookingChat} name='chat'/>



         </View>


         <View style={styles.rowDesti}>
             <Icon2 style={styles.bookedScreenDestinationIcon} name='location-sharp' />
             <Text style={styles.destinationTextBooked}>Address</Text>


             </View>

<View style={styles.row}>

    <TouchableOpacity onPress={()=>{onCancelRide()}} style={styles.cancleButton}>

<Text style={styles.cancleButtonText}>Cancelar Viaje</Text>

</TouchableOpacity>


<TouchableOpacity onPress={()=>{onParada()}} style={styles.paradaButton}>

<Text style={styles.paradaButtonText}>Agregar Parada</Text>

</TouchableOpacity>

</View>
        </View>:null
    }
 












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
left:20,
width:45,
height:45,
paddingVertical: 0,
borderRadius:45,
backgroundColor:'white',
    },
    MenuIcon:{
        position:"absolute",
        top:5,
        left:5,
         fontSize:35,   
         color:'#e60000'     

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
    MylocationIcon:{
        color:'blue',
        fontSize:40        
        },

    locationRow:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:30,
        paddingLeft:20,
        marginTop:10,
        width:'90%'
    },
    second:{

        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor:'white',
        justifyContent:"center",
        width:'100%',
        padding:20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    goBack:{
    marginBottom:5,
    width:50,
    },
    backIcon:{
        fontSize:40,
        color:'red',
    },
    locationRow:{
        flexDirection:"row",
        alignItems:'center',
        marginTop:5,
        },
        
    destitionIcon:{
        color:'red',
        fontSize:30,
    },
    MylocationIcon1:{
        color:'blue',
        fontSize:30    
    },
    locationText:{
        marginLeft:5,
        fontSize:18,
        fontWeight:'bold'
    },
    travelWith:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:10,
        paddingRight:10,
    },
    with:{
        backgroundColor:'gray',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        margin:11,
        padding:10,
        paddingRight:10,
        paddingLeft:10,
        borderRadius:30,
    },
   
    without:{

        backgroundColor:'white',
        borderColor:'gray',
        borderWidth:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        padding:10,
        paddingRight:10,
        paddingLeft:10,
        borderRadius:30,

    },
    withText:{
        color:'white',
        fontSize:15,
   margin:3,

    },
    withoutText:{
   color:'gray',
   fontSize:15,
   margin:3,
    },
    Button:{

        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0000cc',
        padding:15,
        borderRadius:30,
        marginTop:20,
        marginBottom:20,


        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 10,

    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },

    metPago:{
    fontWeight:'bold',
    fontSize:19,
    },
    vehicalTitle:{
        fontWeight:'bold',
        fontSize:18,
        marginTop:10,

    },
    payMethod:{
        flexDirection:"row",
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
        flex:1,
    },
    selected:{
        flex:1,
        flexDirection:"row",
        backgroundColor:'gray',
        borderRadius:30,
        padding:5,
        margin:1,
        justifyContent:'center',

        alignItems:'center'
        
    },
    notSelected:{
        flex:1,
        flexDirection:"row",
        backgroundColor:'white',
        borderRadius:30,
        borderWidth:1,
        borderColor:'gray',
        marginRight:5,
        padding:5,
        justifyContent:'center',

        alignItems:'center'

    },
    selectedText:{
        fontSize:12,
        color:'white'

    },
    notSelectedText:{

        fontSize:12,
        color:'gray'

    },
   






    VwithText:{
        color:'white',
        fontSize:25,
   margin:3,

    },
    VwithoutText:{
   color:'gray',
   fontSize:25,
   margin:3,
    },
    
    Vselected:{
        flex:1,
        flexDirection:"row",
        backgroundColor:'gray',
        borderRadius:20,
        padding:10,
        paddingLeft:20,
        margin:1,
        marginRight:6,
       
        alignItems:'center'
        
    },
    VnotSelected:{
        flex:1,
        flexDirection:"row",
        backgroundColor:'white',
        borderRadius:20,
        borderWidth:1,
        borderColor:'gray',
        marginRight:5,
        padding:5,
        justifyContent:'center',

        alignItems:'center'

    },
    VselectedText:{
        fontSize:16,
        color:'white',
        fontWeight:'bold'

    },
    VnotSelectedText:{

        fontSize:16,
        fontWeight:'bold',
        color:'gray'


    },

    VselectedText2:{
        fontSize:16,
        color:'white'

    },
    VnotSelectedText2:{

        fontSize:16,
        color:'gray'

    },
    vehicalRow:{
        flexDirection:'row'
    },



    bookedScreenRow:{
        flexDirection:'row',
        width:'100%'
    },


    bookingChat:{

       flex:1,
       fontSize:25,
       color:'red',

    },
    bookingShare:{
flex:1,
fontSize:25,
color:'red',
    },
    bookedInnerRow:{
   flex:8,
   flexDirection:'row',
   padding:5,
   alignItems:'center',
    },



riderImage:{
    width:90,
    height:90,
    borderRadius:90,
    margin:5,
},


riderDetails:{

},

ratingRow:{
    flexDirection:'row',
    alignItems:'center',
},

name:{
    fontWeight:'bold',
    fontSize:17,
},
car:{
    color:'black'
},
atDistance:{
    color:'gray',
},
carModel:{
    fontWeight:"bold",
    fontSize:12,
},



bookedScreenDestinationIcon:{
    fontSize:20,
    color:'red',

},

rowDesti:{
    flexDirection:'row',
    marginTop:5,
},
destinationTextBooked:{
    borderBottomColor:'gray',
    borderBottomWidth:1,
    width:'90%',
    marginRight:10,
    marginLeft:5,
},

row:{
    marginTop:15,
    flexDirection:'row',
},

paradaButton:{
flex:1,
backgroundColor:'blue',
borderRadius:30,
padding:10,
alignItems:'center',
justifyContent:'center',
marginLeft:5,
},
cancleButton:{
    flex:1,
    borderColor:'blue',
    borderWidth:1,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    marginRight:5,
},

paradaButtonText:{
    color:'white',

    fontWeight:'bold'
},
cancleButtonText:{
    color:'blue',
    fontWeight:'bold'
},



})

const mapStateToProps=(state)=>({
    state:state.MainReducer,
    myLocation:state.MainReducer.myLocation,
    destination:state.MainReducer.destination,
    stops:state.MainReducer.stops,
    mainActive:state.MainReducer.mainActive,
    locationScreenActive:state.MainReducer.locationScreenActive,
    bookingScreenActive:state.MainReducer.bookingScreenActive,
    bookedScreenActive:state.MainReducer.bookedScreenActive,
})
 const mapDispatchToProps=(dispatch)=>({

    setMyLocation:(payload)=>{dispatch(Actions.SetMyLocation(payload))},
   setDestination:(payload)=>{dispatch(Actions.SetDestination(payload))},
  
  resetStops:(payload)=>{dispatch(Actions.ResetStops(payload))},
  setMainActive:(payload)=>{dispatch(Actions.SetMainActive(payload))},
  setLocationScreenActive:(payload)=>{dispatch(Actions.SetLocationScreenActive(payload))},
  setBookingScreenActive:(payload)=>{dispatch(Actions.SetBookingScreenActive(payload))},
  setBookedScreenActive:(payload)=>{dispatch(Actions.SetBookedScreenActive(payload))},

 })
export default connect(mapStateToProps,mapDispatchToProps)(Home);



/*


{
        props.mainActive?<View style={styles.bookView}>

        <TouchableWithoutFeedback onPress={()=>{onBook()}} style={styles.bookTouch}>
        <View style={styles.bookRow}>
            <Text style={styles.mainHeader}>iBuenas tardes, Manuel!</Text>
            <Text style={styles.mainMessage}>¿A donde deseas ir?</Text>
            </View>
       
       <Icon name='chevron-right' style={styles.arrowIcon} />
        </TouchableWithoutFeedback>

    </View>:null

        }




*/