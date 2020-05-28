import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";


class App extends React.Component {
    nextTodoListId = 0;
    state = {
        todolists: []
    }

    addTodoList=(newTitle)=> {
        let newTodoList =
            {
                title: newTitle,
                id: this.nextTodoListId,
                tasks:[]
            };
        this.nextTodoListId++;
        this.props.createTodolist(newTodoList);
        // this.setState({todolists: [...this.state.todolists, newTodoList]}, () => {
        //     this.saveState();
        // });
    }

    saveState=()=>{
        let stateAsAString=JSON.stringify(this.state);
        localStorage.setItem("todoList-state",stateAsAString);
    };

    restoreState=()=>{
        let state=
            this.state;

        let stateAsString=localStorage.getItem("todoList-state");
        if(stateAsString !==null){
            state=JSON.parse(stateAsString);
        }
        this.setState(state,()=>{
            this.state.todolists.forEach(t=>{
                if(t.id>=this.nextTodoId){
                    this.nextTodoId = t.id+1
                }
            })
        });
    }
    componentDidMount() {
        this.restoreState();
    }

    render() {

  const todolists=this.props.todolists.map(tl=> <TodoList id ={tl.id} title={tl.title} tasks={tl.tasks} />);
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>

            <div className="App">
                {todolists}
            </div>
           </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        createTodolist:(newTodoList)=>{
            let action={
                type:"ADD_TODOLIST",
                newTodoList:newTodoList
            }
            dispatch(action)
        }
    }
}

const ConnectApp=connect(mapStateToProps,mapDispatchToProps)(App);
export default ConnectApp;

