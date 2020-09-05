const { Switch } = require("react-native-gesture-handler")
import {Types} from './types'
let initialState={
    myLocation:null,
    destination:null,
    stops:[],
    mainActive:true,
    locationScreenActive:false,
    bookingScreenActive:false,
    bookedScreenActive:false,
}
const MainReducer=(state=initialState,action)=>{

    switch (action.type) {
        case Types.setMyLocation:
            return {...state,myLocation:action.payload}
            break;
        case Types.setDestination:
            return {...state,destination:action.payload}
            break;
        case Types.addStops:
            return {...state,stops:[...state.stops,payload]}
            break;
        case Types.setMainActive:
            return {...state,mainActive:action.payload}
            break;
        case Types.setLocationScreenActive:
            return {...state,locationScreenActive:action.payload}
            break;
        case Types.setBookingScreenActive:
            return {...state,bookingScreenActive:action.payload}
            break;
        case Types.resetStops:
            return {...state,stops:[]}
            break;
        case Types.setBookedScreenActive:
            return {...state,bookedScreenActive:action.payload}
            break;
    
        default:
            return state;
    }

}


export default MainReducer;