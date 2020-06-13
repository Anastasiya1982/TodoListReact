import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import axios from'axios';
import {createTodolistAC, setTodolistsAC} from "./reducer";


class App extends React.Component {
    nextTodoListId = 0;
    state = {
        todolists: []
    }


    saveState = () => {
        let stateAsAString = JSON.stringify(this.state);
        localStorage.setItem("todoList-state", stateAsAString);
    };


    componentDidMount() {
        this.restoreState();
    }

  //делаем запрос на сервер за тудулистами
    //ждем ответа, после того как ответ получен
    // нужно отправить их в State  для отрисовки

    restoreState = () => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
            .then(res => {
                this.props.setTodolists(res.data)
            });
    }

    addTodoList = (newTitle) => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: newTitle},
            {
                withCredentials: true,
                headers: {"API-KEY": "0e5317f8-1eba-40e8-9b59-8d5e29cf9296"}
            })
            .then(res => {
                    if (res.data.resultCode === 0) {
                        this.props.addTodolist(res.data.data.item)
                    }
                }
            )
    }


    render = () => {
        const todolists = this.props.todolists.map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>);
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
    const mapDispatchToProps = (dispatch) => {
        return {
            addTodolist: (newTodolist) => {
                dispatch(createTodolistAC(newTodolist))
            },
            setTodolists: (todolists) => {
                dispatch(setTodolistsAC(todolists))
            }
        }
    }



const ConnectApp=connect(mapStateToProps,mapDispatchToProps)(App);
export default ConnectApp;

