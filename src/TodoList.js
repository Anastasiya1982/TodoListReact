import React from 'react';
import './App.css';
import TodoFooter from "./TodoFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTaskTC, changeTodolistTitleTC,
    deleteTaskTC, deleteTodolistTC,
    setTasksTC,  updateTaskTC
} from "./reducer";
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
        this.props.loadTasks(this.props.id)

    }


    addTask = (newTitle) => {
       this.props.addTask(newTitle,this.props.id);
    }


    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue});

    }

    changeTask = (newTask) => {
        this.props.updateTask(newTask,this.props.id)
    }

    changeStatus = (newTask, status) => {
        this.changeTask({...newTask, status: status === true ? 2 : 0});
    }

    changeTitle = (newTask, title) => {
        this.changeTask({...newTask, title: title});
    }
    deleteTask = (taskId) => {
        this.props.deleteTask(taskId, this.props.id)
    }


    deleteTodoList = () => {
        this.props.deleteTodo(this.props.id)
    }

    changeTodolistTitle=(title)=>{
        this.props.changeTodolistTitle(title,this.props.id)
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
        addTask:(newTask, todolistId)=> {
            dispatch(addTaskTC(newTask, todolistId,));
        },

        deleteTodo: (todolistId) => {
            let thunk=deleteTodolistTC(todolistId)
            dispatch(thunk);
        },
        deleteTask: (taskId, todolistId) => {
            dispatch(deleteTaskTC(taskId, todolistId));
        },
       loadTasks: (todolistId, tasks) => {
            dispatch(setTasksTC(todolistId, tasks));
        },
        updateTask: (newTask,todolistId,) => {
            dispatch(updateTaskTC(newTask,todolistId));
        },
        changeTodolistTitle:(title,todolistId)=>{
            dispatch(changeTodolistTitleTC(title,todolistId))
        }

    }
}
  const ConnectedTotoList=connect(null,mapDispatchToProps)(TodoList);
export default ConnectedTotoList;

