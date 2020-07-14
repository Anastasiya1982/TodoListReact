import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "./store";
import {logout} from "./auth-reducer";



type MapStateToPropsType={
    login:string|null
}

type MapDispatchPropsType={
    logout:()=>void
}
type PropsType= MapStateToPropsType & MapDispatchPropsType;
class Header extends React.Component <PropsType,AppStateType> {
    render() {
        return (
            <div>
                <div>{this.props.login}-
                  <button onClick= {this.props.logout}>Logout</button>
                </div>
            </div>
        )

    }
};

const mapStateToProps=(state:AppStateType):MapStateToPropsType=> {
    return {
        login: state.auth.login
    }
}
export default connect<MapStateToPropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps,{logout})(Header);