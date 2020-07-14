import {api} from "./api";
import {AppStateType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {FormAction, stopSubmit} from "redux-form";
import {any} from "prop-types";


const SET_MY_DATA="SET-MY-DATA";

type InitialStateType={
   id:string |null
   email:string |null,
   login:string |null,
   isAuth:boolean
}

export const initialState:InitialStateType={
    id:null,
    email:null,
    login:null,
    isAuth:false
}

const authReducer=(state=initialState,action:SetMyDataACType)=>{
    switch (action.type) {
        case SET_MY_DATA:
            return{
                ...state,
                ...action.payload
            }
        default:
            return state
    }
};

type SetMyDataACType={
    type:typeof SET_MY_DATA
    payload:{
        id:string|null
        email:string|null,
        login:string|null,
        isAuth:boolean
    }
}
const setMyDataAC=(id:string|null,email:string|null,login:string|null,isAuth:boolean):SetMyDataACType=>({type: SET_MY_DATA,
payload:{id,email,login,isAuth}});


export type ThunkType=ThunkAction<void,AppStateType,unknown,SetMyDataACType>;
export type ThunkDispatchType  =ThunkDispatch<AppStateType,unknown,SetMyDataACType | FormAction >

export const getMyData=():ThunkType=>(dispatch:ThunkDispatchType)=>{
    return api.authMe()
        .then(res=>{
            if(res.data.resultCode===0){
                let{id,email,login}=res.data.data;
                dispatch(setMyDataAC(id,email,login,true));
            }
        })
};
export const logIn=(email:string,password:string,rememberMe:boolean):ThunkType=>(dispatch:ThunkDispatchType)=>{
    api.login(email,password,rememberMe)
        .then(res=>{
            if(res.data.resultCode===0){
                dispatch(getMyData())
            }
            else {
                let message=res.data.messages.length>0?res.data.messages[0]:"Some Error";
                dispatch(stopSubmit("login",{_error:message}));
            }
        })
}
export const logout =()=>(dispatch:ThunkDispatchType)=>{
    api.logout()
        .then(res=>{
            if (res.data.resultCode===0){
                dispatch(setMyDataAC(null,null,null,false))
            }
            });
}
export default authReducer;