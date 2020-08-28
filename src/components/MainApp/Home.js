import React, { Component, useState, useEffect } from 'react';
import { View,Text,TextInput,StyleSheet,TouchableOpacity,PermissionsAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialIcons'

import Icon4 from 'react-native-vector-icons/FontAwesome5'
import * as Actions from '../../RideRedux/actions'
import {connect} from 'react-redux'
import { color } from 'react-native-reanimated';
import MapView,{ Marker,Polyline,PROVIDER_GOOGLE  }  from  'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const Home=(props)=>  {
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
 props.navigation.navigate('WhereTo');
 }


    const [location,setLocation] =useState({
        latitude: 41.294856,
        longitude: -4.055685,
      });
    useEffect(()=>
    {


   

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
          
         


      
  
    },[])
    const onFollowing=()=>{
        props.setLocationScreenActive(false);
        props.setBookingScreenActive(true);
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
        props.setLocationScreenActive(true);
        props.setMainActive(false);

    }

    const getRegion=()=>({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05

     })

     const bookARide=()=>{


     }
     const onSelectCard=()=>{
         setCardSeleted(true)
         setEfectivoSeleted(false)
     }
     const onSelectEfectivo=()=>{
         setEfectivoSeleted(true)
         setCardSeleted(false)
     }

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

<Marker
      coordinate={{ latitude: location.latitude, longitude: location.longitude }}
      title={"Current Location"}
      description={"you are currently Here"}
    >

        <Icon2 style={styles.MylocationIcon} name='location-sharp' />
    </Marker >
 

        </MapView>


          
           <TouchableOpacity style={styles.FixedIcon} onPress={()=>open()} >
                <Icon name='menu' style={styles.MenuIcon} />
                </TouchableOpacity>

        
        
        
        
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











})

const mapStateToProps=(state)=>({
    state:state.MainReducer,
    myLocation:state.MainReducer.myLocation,
    destination:state.MainReducer.destination,
    stops:state.MainReducer.stops,
    mainActive:state.MainReducer.mainActive,
    locationScreenActive:state.MainReducer.locationScreenActive,
    bookingScreenActive:state.MainReducer.bookingScreenActive
})
 const mapDispatchToProps=(dispatch)=>({

    setMyLocation:(payload)=>{dispatch(Actions.SetMyLocation(payload))},
   setDestination:(payload)=>{dispatch(Actions.SetDestination(payload))},
  
  resetStops:(payload)=>{dispatch(Actions.ResetStops(payload))},
  setMainActive:(payload)=>{dispatch(Actions.SetMainActive(payload))},
  setLocationScreenActive:(payload)=>{dispatch(Actions.SetLocationScreenActive(payload))},
  setBookingScreenActive:(payload)=>{dispatch(Actions.SetBookingScreenActive(payload))},

 })
export default connect(mapStateToProps,mapDispatchToProps)(Home);