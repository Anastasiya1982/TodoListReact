import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from "redux-form";





let reducers=combineReducers({
    reducer:reducer,
    auth:authReducer,
    form:formReducer
 });


type ReducersType=typeof reducers//()=>AppS

export type AppStateType=ReturnType<ReducersType>

const store=createStore(reducers,applyMiddleware(thunkMiddleware));
export default store;