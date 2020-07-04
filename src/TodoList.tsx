import React from 'react';
import './App.css';
import TodoFooter from "./TodoFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {
    addTask, changeTodolistTitle,
    deleteTask, deleteTodo,
    loadTasks, updateTask
} from "./reducer";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Types/entities";
import {AppStateType} from "./store";



type OwnPropsType={
    id:string
    title:string
    tasks:Array<TaskType>
}

type StateType={
    filterValue:string
}
type MapDispatchPropsType={
    loadTasks:(id:string)=>void
    addTask:(newTitle:string,id:string)=>void
    updateTask:(newTask:TaskType,id:string)=>void
    deleteTask:(taskId:string, id:string)=>void
    deleteTodo:(id:string)=>void
    changeTodolistTitle:(title:string,id:string)=>void
}

type PropsType=OwnPropsType & MapDispatchPropsType;

class TodoList extends React.Component <PropsType,StateType>{
    state:StateType = {
        filterValue: "All",
    };

    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        this.props.loadTasks(this.props.id)

    }


    addTask = (newTitle:string) => {
       this.props.addTask(newTitle,this.props.id);
    }


    changeFilter = (newFilterValue:string) => {
        this.setState({filterValue: newFilterValue});

    }

    changeTask = (newTask:TaskType) => {
        this.props.updateTask(newTask,this.props.id)
    }

    changeStatus = (newTask:TaskType, status:boolean) => {
        this.changeTask({...newTask, status: status === true ? 2 : 0});
    }

    changeTitle = (newTask:TaskType, title:string) => {
        this.changeTask({...newTask, title: title});
    }
    deleteTask = (taskId:string) => {
        this.props.deleteTask(taskId, this.props.id)
    }


    deleteTodoList = () => {
        this.props.deleteTodo(this.props.id)
    }

    changeTodolistTitle=(title:string)=>{
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
                        </div>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks
                                   tasks={tasks.filter(t => {
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
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addTask:(newTask, todolistId)=> {
//             dispatch(addTask(newTask, todolistId,));
//         },
//
//         deleteTodo: (todolistId) => {
//             dispatch(deleteTodo(todolistId));
//
//         },
//         deleteTask: (taskId, todolistId) => {
//             dispatch(deleteTask(taskId, todolistId));
//         },
//        loadTasks: (todolistId, tasks) => {
//             dispatch(loadTasks(todolistId, tasks));
//         },
//         updateTask: (newTask,todolistId,) => {
//             dispatch(updateTask(newTask,todolistId));
//         },
//         changeTodolistTitle:(title,todolistId)=>{
//             dispatch(changeTodolistTitle(title,todolistId))
//         }
//
//     }
// }
  export default connect <{},MapDispatchPropsType,OwnPropsType,AppStateType>(null,{
      addTask,deleteTodo,loadTasks,deleteTask,updateTask,changeTodolistTitle})(TodoList);


