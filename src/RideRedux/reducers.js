import MainReducer from './mainReducer'
import UserReducer from './userReducers'

import {combineReducers} from 'redux'

const Reducer=combineReducers({
    MainReducer,
    UserReducer
})
export default Reducer;