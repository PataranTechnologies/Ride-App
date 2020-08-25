import React, { Component, useState } from 'react';
import { View, StyleSheet,Text, Image, Linking,TextInput,TouchableOpacity ,Avatar } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
const CustomDrawerContentComponent=(props)=>  {
    
      const [items,setItems]=useState([{
        navOptionThumb: 'history',
        type:'FontAwesome',
        navOptionName: 'Historial de viajes',
        screenToNavigate: 'TravelHistory',
      },
      {
        navOptionThumb: 'location-sharp',
        type:'Ionicons',
        navOptionName: 'Mis Direcciones',
        screenToNavigate: 'MyAddresses',
      },
      {
        navOptionThumb: 'credit-card-alt',
        type:'FontAwesome',
        navOptionName: 'pagos',
        screenToNavigate: 'Payments',
      },
      {
        navOptionThumb: 'settings-sharp',
        type:'Ionicons',
        navOptionName: 'Preferencias',
        screenToNavigate: 'Preferences',
      },{
        navOptionThumb: 'help-circle',
        type:'Ionicons',
        navOptionName: 'Ayuda',
        screenToNavigate: 'Help',
      },
      {
        navOptionThumb: 'pricetag',
        type:'Ionicons',
        navOptionName: 'Promociones',
        screenToNavigate: 'Referal',
      },
      {
        navOptionThumb: 'md-medal',
        type:'Ionicons',
        navOptionName: 'Vision',
        screenToNavigate: 'About',
      },
    ])
    const getIconsComonent=(type,name)=>{

        if(type==='FontAwesome')
        {
            return <Icon name={name} style={styles.ProfileIcon} />
        }
        else
        if(type==='Ionicons')
        {
            return <Icon2 name={name} style={styles.ProfileIcon} />
        
        }

    }
      return (
        <View style={styles.sideMenuContainer}>
            <ScrollView style={styles.scroll} >
        <TouchableOpacity style={styles.sideMenuProfileIconCon} onPress={()=>props.navigation.navigate('ProfilePage')}>
        <Image
          source={{ uri: 'https://cdn4.vectorstock.com/i/1000x1000/08/33/profile-icon-male-user-person-avatar-symbol-vector-20910833.jpg' }}
          style={styles.sideMenuProfileIcon}
        />
        </TouchableOpacity>
        
        <Text style={styles.userName}>Manuel</Text>
        <Text style={styles.userId}>Unique ID #002827</Text>
        <View style={styles.ratingRow}>
            <Icon name='star' style={styles.star} />
            <Text style={styles.rating}>4.85</Text>

            </View>
        <View
          style={styles.divider}
        />
        <View style={{ width: '100%' }}>
          {
          items.map((item,key) => (
            <View
              style={styles.drawerRowItems}
              key={key}>
              <View style={styles.IconContainer}>
                {getIconsComonent(item.type,item.navOptionThumb)}
              </View>
              <Text>   </Text> 
              <Text
                style={styles.rowText}
                onPress={() => {
                  global.currentScreenIndex = key;
                  props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
              
            </View>
          ))}
        </View>
        </ScrollView>
      </View>
      );
    }
  
export default CustomDrawerContentComponent;

    const styles=StyleSheet.create({

        sideMenuContainer: {
            width: '100%',
            height: '100%',
            backgroundColor:'#e6f2ff',
            alignItems: 'center',
          
          },
          scroll:{
              width:'100%',
              padding:20
          },
          divider:{
            marginTop: 15,
          },
          IconContainer:{
              width:'20%'
              
          },
          rowText:{
            
            fontSize: 15,
            
          },
          drawerRowItems:{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,

            width: '100%',
            borderBottomWidth:1,
            borderBottomColor: '#e2e2e2',
         
          },
          sideMenuProfileIcon: {
            resizeMode: 'center',
            alignSelf:'center',
            width: 150,
            height: 150,
            
            borderRadius: 200 ,
          },
          sideMenuProfileIconCon: {
            resizeMode: 'center',
            alignSelf:'center',
            width: 150,
            height: 150,
            marginTop: 20,
            borderRadius: 200 ,
          },
          ProfileIcon:{
              fontSize:25,
              color:'#cc0000'
          },
          userId:{
              alignSelf:'center',
              fontSize:22,
              fontWeight:'bold',
              color:'blue',
          },
          userName:{
            alignSelf:'center',
            fontSize:25,
            marginTop:5,
            fontWeight:'bold',
            color:'black',
          },
          ratingRow:{
              flexDirection:"row",
              alignItems:'center',

              justifyContent:'center'
          },
          star:{
              fontSize:18,
              color:'gray',
          },
          rating:{
              marginLeft:3,
              color:'gray'

          },
    
    })