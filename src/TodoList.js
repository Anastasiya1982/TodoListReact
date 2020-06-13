import React from 'react';
import './App.css';
import TodoFooter from "./TodoFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import axios from "axios";
import {addTaskAC, DELETE_TODOLIST, deleteTaskAC, setTasksAC, updateTaskAC} from "./reducer";


class TodoList extends React.Component {
       state = {
            filterValue: "All"
        };
            componentDidMount() {
                this.restoreState();
            }
            restoreState=()=>{
                axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
                    {
                        withCredentials: true,
                        headers: {"API-KEY": "0e5317f8-1eba-40e8-9b59-8d5e29cf9296"}
                    })
                    .then(res => {
                            if (!res.data.error) {
                                this.props.setTasks(this.props.id,res.data.items)
                            }
                        }
                    )
            }

    // saveState=()=>{
    //     let stateAsAString=JSON.stringify(this.state);
    //     localStorage.setItem("tasks"+this.props.id,stateAsAString);
    // };

       addTask= (newTitle) => {
           axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
               {title: newTitle},
               {
                   withCredentials: true,
                   headers: {"API-KEY": "0e5317f8-1eba-40e8-9b59-8d5e29cf9296"}
               })
               .then(res => {
                       if (res.data.resultCode === 0) {
                           this.props.addTask( res.data.data.item,this.props.id,)
                       }
                   }
               )
       }


           changeFilter =(newFilterValue)=>{
            this.setState({filterValue:newFilterValue});

        };
           changeTask=( newTask)=>{
               debugger
               axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${newTask.id}`,
                   newTask,
                   {
                       withCredentials: true,
                       headers: {"API-KEY": "0e5317f8-1eba-40e8-9b59-8d5e29cf9296"}
                   })
                   .then(res => {
                       debugger
                           if (res.data.resultCode === 0) {
                               this.props.updateTask(res.data.data.item)
                           }
                       }
                   )
               // let newTasks = this.state.tasks.map(t => {
               //     if (t.id === taskId){
               //         return {...t, ...obj}
               //     }
               //     return t;
               // });
               //  this.props.changeTask(this.props.id,obj);
               // this.setState({tasks: newTasks},this.saveState)
           }

          changeStatus =(newTask,status)=> {
               this.changeTask({...newTask,status:status===true?2:0});
            // let newTasks = this.state.tasks.map(t => {
            //     if (t.id === taskId){
            //         return {...t, isDone: isDone}
            // }
            //
            //     return t;
            // });
            // this.setState({tasks: newTasks})
        }

         changeTitle =(newTask,title)=> {
               this.changeTask({...newTask,title:title});
    //          let newTasks = this.state.tasks.map(t => {
    //              if (t.id === taskId) {
    //                  return {...t, title: title}
    //              }
    //              return t;
    //          });
    //          this.setState({tasks: newTasks});
     }
    deleteTask = (taskId) => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "0e5317f8-1eba-40e8-9b59-8d5e29cf9296"}
            })
            .then(res => {
                    if (res.data.resultCode === 0) {
                        this.props.deleteTask(taskId,this.props.id)
                    }
                }
            )
        this.props.deleteTask(taskId, this.props.id);
    }
    deleteTodoList = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "0e5317f8-1eba-40e8-9b59-8d5e29cf9296"}
            })
            .then(res => {
                    if (res.data.resultCode === 0) {
                        this.props.deleteTodoList(this.props.id)
                    }
                }
            )
        // this.props.deleteTodoList(this.props.id);
    }

    render = () => {
               let {tasks=[]} =this.props;
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
        addTask( newTask,todolistId,) {
            dispatch(addTaskAC(newTask,todolistId,));
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
        deleteTask: (taskId,todolistId) => {
            dispatch(deleteTaskAC(taskId,todolistId))
        },
        setTasks: (todolistId, tasks) => {
                 dispatch(setTasksAC(todolistId,tasks))
        },
        updateTask:(task)=>{
            dispatch(updateTaskAC(task))
    }
    }
}
  const ConnectedTotoList=connect(null,mapDispatchToProps)(TodoList);
export default ConnectedTotoList;

