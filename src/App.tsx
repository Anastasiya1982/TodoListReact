import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import { addTodo,loadTodolists} from "./reducer";
import EditableSpan from "./EditableSpan";
import {TodoType} from "./Types/entities";
import {AppStateType} from "./store";






 type MapStateToPropsType={
     todolists:Array<TodoType>
 }

 type MapDispatchPropsType={
     loadTodolists:()=>void
     addTodo:(newTitle:string)=>void
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
    }

  //делаем запрос на сервер за тудулистами
    //ждем ответа, после того как ответ получен
    // нужно отправить их в State  для отрисовки

restoreState=()=>{
        this.props.loadTodolists();
    }

    addTodoList = (newTitle:string) => {
        this.props.addTodo(newTitle)
     }




    render = () => {
        const todolists = this.props.todolists.map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}  />);
        return (
            <>
                <div>
                    <EditableSpan value={""} onChange={(value:any)=>{}}/>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>

                <div className="App">
                    {todolists}
                </div>
            </>
        );
    }
}

    const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
        return {
            todolists: state.reducer.todolists
        }
    }
    // const mapDispatchToProps = (dispatch:Dispatch<ActionsType>):MapDispatchPropsType => {
    //     return {
    //         loadTodolists:()=>{
    //             let  thunk=loadTodolists();
    //             dispatch(thunk)
    //         },
    //         addTodo: (newTitle) => {
    //             let thunk=addTodo(newTitle)
    //             dispatch(thunk)
    //         }
    //
    //     }
    // }



export default connect<MapStateToPropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps,{loadTodolists,addTodo})(App);


