import React from 'react';
import './App.css';
import TodoFooter from "./TodoFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";


class TodoList extends React.Component {


       state = {
            tasks: [],
            filterValue: "All"
        };
           nextTaskId=5;

            saveState=()=>{
                let stateAsAString=JSON.stringify(this.state);
                localStorage.setItem("tasks",stateAsAString);
            };
            restoreState=()=>{
                let state={
                    tasks:[],
                    filterValue: "All"
                };
                let stateAsString=localStorage.getItem("tasks");
                if(stateAsString){
                    state=JSON.parse(stateAsString);
               }
                this.setState(state,()=>{
                    this.state.tasks.forEach(t=>{
                        if(t.id>=this.nextTaskId){
                            this.nextTaskId = t.id+1
                        }
                    })
                });
            }
            componentDidMount() {
                this.restoreState();
            }

       addTask= (newTitle) => {
            // let newTitle = this.newTaskTitleRef.current.value;
            // this.newTaskTitleRef.current.value = "";
            let newTask =
                {   title: newTitle,
                    isDone: false,
                    priority: "low",
                    id:this.nextTaskId
                };
             this.nextTaskId++;
            // let newTasks = [...this.state.tasks, newTask];
            // this.setState({tasks: newTasks},this.saveState);
           this.props.addTask(this.props.id,newTask);

        };
           changeFilter =(newFilterValue)=>{
            this.setState({filterValue:newFilterValue});

        };
           changeTask=(taskId,obj)=>{
               let newTasks = this.state.tasks.map(t => {
                   if (t.id === taskId){
                       return {...t, ...obj}
                   }
                   return t;
               });
                this.props.changeTask(this.props.id,obj);
               // this.setState({tasks: newTasks},this.saveState)
           }

          changeStatus =(taskId,isDone)=> {
               this.props.changeTask(this.props.id,taskId,{isDone:isDone})
            // let newTasks = this.state.tasks.map(t => {
            //     if (t.id === taskId){
            //         return {...t, isDone: isDone}
            // }
            //
            //     return t;
            // });
            // this.setState({tasks: newTasks})
        }

         changeTitle =(taskId,title)=> {
               this.props.changeTask(this.props.id,taskId,{title:title})
    //          let newTasks = this.state.tasks.map(t => {
    //              if (t.id === taskId) {
    //                  return {...t, title: title}
    //              }
    //              return t;
    //          });
    //          this.setState({tasks: newTasks});
     }
    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id,taskId);
    }
     deleteTodoList=()=>{
         this.props.deleteTodoList(this.props.id);
     }

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <div className="todoList-header-title">
                            <TodoListTitle title={this.props.title}/>
                            <button onClick={this.deleteTodoList}>X</button>
                        </div>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks tasks={this.props.tasks.filter(t => {
                        switch (this.state.filterValue) {
                            case "Active":
                                return t.isDone === false;
                            case "Completed":
                                return t.isDone === true;
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
        addTask(todolistId, newTask) {
            const action = {
                type: "ADD_TASK",
                newTask: newTask,
                todolistId: todolistId
            };
            dispatch(action);
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
                type: "DELETE_TODOLIST",
                todolistId: todolistId
            };
            dispatch(action)
        },
        deleteTask: (todolistId, taskId) => {
            const action = {
                type: "DELETE_TASK",
                todolistId: todolistId,
                taskId: taskId
            };
            dispatch(action)
        }
    }
}
  const ConnectedTotoList=connect(null,mapDispatchToProps)(TodoList);
export default ConnectedTotoList;

