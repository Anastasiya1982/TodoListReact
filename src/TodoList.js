import React from 'react';
import './App.css';
import TodoFooter from "./TodoFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskAC,
    changeTodolistAC, changeTodolistTitleAC,
    DELETE_TODOLIST,
    deleteTaskAC,
    setTasksAC,
    updateTaskAC,
    updateTodolistTitleAC
} from "./reducer";
import {api} from "./api";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";




class TodoList extends React.Component {
    state = {
        filterValue: "All",
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        api.loadTasks(this.props.id)
            .then(res => {
                    this.props.setTasks(this.props.id, res.data.items)
                }
            )
    }


    addTask = (newTitle) => {
        api.addTask(newTitle, this.props.id)
            .then(res => {
                this.props.addTask(res.data.data.item, this.props.id);
            })
    }


    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue});

    }

    changeTask = (newTask) => {
        api.updateTask(this.props.id, newTask)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        this.props.updateTask(newTask,this.props.id,)
                    }
                }
            )
    }

    changeStatus = (newTask, status) => {
        this.changeTask({...newTask, status: status === true ? 2 : 0});
        // let newTasks = this.state.tasks.map(t => {
        //     if (t.id === taskId){
        //         return {...t, isDone: isDone}
        // }
        //
        //     return t;
        // });
        // this.setState({tasks: newTasks})
    }

    changeTitle = (newTask, title) => {
        this.changeTask({...newTask, title: title});
        //          let newTasks = this.state.tasks.map(t => {
        //              if (t.id === taskId) {
        //                  return {...t, title: title}
        //              }
        //              return t;
        //          });
        //          this.setState({tasks: newTasks});
    }
    deleteTask = (taskId) => {
        api.deleteTask(this.props.id, taskId)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        this.props.deleteTask(taskId, this.props.id)
                    }
                }
            )
        this.props.deleteTask(taskId, this.props.id);
    }


    deleteTodoList = () => {
        api.deleteTodolist(this.props.id)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        this.props.deleteTodoList(this.props.id)
                    }
                }
            )
    }

    changeTodolistTitle=(title)=>{
        api.updateTodolistTitle(title,this.props.id)
            .then(res=>{
                //change value in Redux
                this.props.changeTodolistTitle(title);
            })
        this.props.changeTodolistTitle(title,this.props.id);
    }

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <div className="todoList-header-title">
                            <TodoListTitle title={this.props.title}
                                           onChange={this.changeTodolistTitle}/>
                                           <IconButton onClick={this.deleteTodoList}>
                                               <Delete/>
                                           </IconButton>
                            {/*<button onClick={this.deleteTodoList}>X</button>*/}
                        </div>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks tasks={tasks.filter(t => {
                        switch (this.state.filterValue) {
                            case "Active":
                                return t.status !== 2;
                            case "Completed":
                                return t.status === 2;
                            case "All":
                                return true;
                            default:
                                return true;
                        }
                    })}
                                   changeStatus={this.changeStatus}
                                   changeTitle={this.changeTitle}
                                   deleteTask={this.deleteTask}


                    />
                    <TodoFooter filterValue={this.state.filterValue}
                                changeFilter={this.changeFilter}
                    />
                </div>
            </div>
        );
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        addTask(newTask, todolistId,) {
            dispatch(addTaskAC(newTask, todolistId,));
        },
        changeTask: (todolistId, taskId, obj) => {
            const action = {
                type: "CHANGE_TASK",
                todolistId: todolistId,
                taskId: taskId,
                obj: obj
            };
            dispatch(action)
        },
        deleteTodoList: (todolistId) => {
            const action = {
                type: DELETE_TODOLIST,
                todolistId: todolistId
            };
            dispatch(action)
        },
        deleteTask: (taskId, todolistId) => {
            dispatch(deleteTaskAC(taskId, todolistId))
        },
        setTasks: (todolistId, tasks) => {
            dispatch(setTasksAC(todolistId, tasks))
        },
        updateTask: (task) => {
            dispatch(updateTaskAC(task))
        },
        changeTodolistTitle:(title,todolistId)=>{
            dispatch(changeTodolistTitleAC(title,todolistId))
        }

    }
}
  const ConnectedTotoList=connect(null,mapDispatchToProps)(TodoList);
export default ConnectedTotoList;

