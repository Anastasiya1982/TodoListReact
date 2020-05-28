import React from 'react';
import './App.css';
import TodoFooter from "./TodoFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";


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
            let newTasks = [...this.state.tasks, newTask];
            this.setState({tasks: newTasks},this.saveState);

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
               this.setState({tasks: newTasks},this.saveState)
           }

          changeStatus =(taskId,isDone)=> {
               this.changeTask(taskId,{isDone:isDone})
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
               this.changeTask(taskId,{title:title})
    //          let newTasks = this.state.tasks.map(t => {
    //              if (t.id === taskId) {
    //                  return {...t, title: title}
    //              }
    //              return t;
    //          });
    //          this.setState({tasks: newTasks});
     }
    deleteTask = (id) => {
        let newTasks=this.state.tasks.filter(t=>{
            return t.id !==id } );
        this.setState({newTasks})
    }


        render = () => {
            return (
                <div className="App">
                    <div className="todoList">
                        <div className="todoList-header">
                            <TodoListTitle title={this.props.title} />
                            <AddNewItemForm addItem={this.addTask}/>
                        </div>
                        <TodoListTasks tasks={this.state.tasks.filter(t=>{
                            switch (this.state.filterValue) {
                                case "Active":
                                    return t.isDone === false;
                                case "Completed":
                                    return t.isDone === true;
                                case "All":
                                    return true;
                                default:
                                    return true;}
                            })}
                            changeStatus ={this.changeStatus}
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

export default TodoList;

