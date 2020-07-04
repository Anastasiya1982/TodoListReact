import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";




let reducers=combineReducers({
    reducer:reducer
});
type ReducersType=typeof reducers//()=>AppS

export type AppStateType=ReturnType<ReducersType>

const store=createStore(reducers,applyMiddleware(thunkMiddleware));
export default store;