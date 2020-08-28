const { Switch } = require("react-native-gesture-handler")
import {Types} from './types'
let initialState={
user:null,   
}
const UserReducer=(state=initialState,action)=>{

    switch (action.type) {
        case Types.setUser:

           //set user in redux store
            
            break;
    
        default:
            return state;
            
    }

}


export default UserReducer;