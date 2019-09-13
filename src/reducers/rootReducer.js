import {combineReducers} from "redux";
import loginReducer from './loginReducer'
import dataReducer from './dataReducer'
import {userReducer} from './userReducer'


export default combineReducers({
   user: userReducer,
    dataReducer,
    loginReducer
});