import { combineReducers } from "redux";
import { userListReducer } from "./userList";


const rootReducer = combineReducers({
    userList: userListReducer
})

export default rootReducer