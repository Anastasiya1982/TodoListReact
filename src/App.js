import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoFooter from "./TodoFooter";
import TodoListTasks from "./TodoListTasks";


class App extends React.Component {

       state = {
            tasks: [],
            filterValue: "All"
        };

            nextTaskId=5;

            saveState=()=>{
                let stateAsAString=JSON.stringify(this.state);
                localStorage.setItem("state",stateAsAString);
            };
            restoreState=()=>{
                let state={
                    tasks:[],
                    filterValue: "All"
                };
                let stateAsString=localStorage.getItem("state");
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

        render = () => {
            return (
                <div className="App">
                    <div className="todoList">
                      <TodoListHeader addTask = {this.addTask}/>
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

                        />
                        <TodoFooter filterValue={this.state.filterValue}
                        changeFilter={this.changeFilter}
                        />
                    </div>
                </div>
            );
        }
    }

export default App;

