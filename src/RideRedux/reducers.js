const { Switch } = require("react-native-gesture-handler")
import Types from './types'

const reducer=(state={},action)=>{

    switch (action.type) {
        case Types.setUser:

           //set user in redux store
            
            break;
    
        default:
            break;
    }

}


export default reducer;