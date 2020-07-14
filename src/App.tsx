import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import { addTodo,loadTodolists} from "./reducer";
 import {TodoType} from "./Types/entities";
 import {AppStateType} from "./store";
import {getMyData, logIn} from "./auth-reducer";
import Login from "./Login";
import Header from "./Header";




 type MapStateToPropsType={
     todolists:Array<TodoType>
     isAuth:boolean

 }

 type MapDispatchPropsType={
     loadTodolists:()=>void
     getMyData:()=>void
     addTodo:(newTitle:string)=>void
     logIn:(login:string, email:string,rememberMe:boolean)=>void
 }
  type StateType={
     todolists:Array<TodoType>

  }

 type PropsType= MapStateToPropsType & MapDispatchPropsType;

class App extends React.Component <PropsType,StateType> {
    state:StateType = {
        todolists: []
    }

    componentDidMount() {
        this.restoreState();
        this.props.getMyData()
    }


restoreState=()=>{
        this.props.loadTodolists();
    }

    addTodoList = (newTitle:string) => {
        this.props.addTodo(newTitle)
     }




    render = () => {
        const todolists = this.props.todolists.map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}  />);
        const onSubmit = (formData:any) => {
           this.props.logIn(formData.email, formData.password, formData.rememberMe); }
        return (
            <>
                {!this.props.isAuth
                    ? <div>
                        <div>данные тестового аккаунта:
                            Email: free@samuraijs.com
                            Password: free
                        </div>
                        <Login onSubmit={onSubmit}/>
                    </div>

                    : <div>
                        <Header/>
                        <AddNewItemForm addItem={this.addTodoList}/>
                        <div className="App">
                            {todolists}
                        </div>
                    </div>
                }
            </>
        );
    }
}

    const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
        return {
            todolists: state.reducer.todolists,
            isAuth:state.auth.isAuth,

        }
    }




export default connect<MapStateToPropsType,{},{},AppStateType>(mapStateToProps,{loadTodolists,addTodo,logIn, getMyData})(App);


