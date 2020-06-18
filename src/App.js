import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {createTodolistAC, setTodolistsAC} from "./reducer";
import {api} from "./api";
import EditableSpan from "./EditableSpan";


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

restoreState=()=>{
      api.setTodolists()
            .then(res => {
                this.props.setTodolists(res.data)
            });
    }

    addTodoList = (newTitle) => {
        api.createTodolist(newTitle)
            .then(res => {
                this.props.addTodolist(res.data.data.item)
                    }
            )
     }




    render = () => {
        const todolists = this.props.todolists.map(tl => <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>);
        return (
            <>
                <div>
                    <EditableSpan value={""} changeValue={(value)=>{}}/>
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

