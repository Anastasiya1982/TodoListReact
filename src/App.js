import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoFooter from "./TodoFooter";
import TodoListTasks from "./TodoListTasks";


class App extends React.Component {

       state = {
            tasks: [
                {title: "ReactJS", isDone: false, priority: "low"},
                {title: "CSS", isDone: false, priority: "hight"},
                {title: "jQuarry", isDone: false, priority: "medium"},
                {title: "JS", isDone: true, priority: "low"},
                {title: "Patterns", isDone: true, priority: "low"},
            ],



            filterValue: "All"
        };

        addTask= (newTitle) => {
            // let newTitle = this.newTaskTitleRef.current.value;
            // this.newTaskTitleRef.current.value = "";
            let newTask =
                {title: newTitle, isDone: false, priority: "low"};
            let newTasks = [...this.state.tasks, newTask];
            this.setState({tasks: newTasks});

        };
        changeFilter =(newFilterValue)=>{
            this.setState({filterValue:newFilterValue});

        }
        changeStatus =(task,isDone)=> {
            let newTasks = this.state.tasks.map(t => {
                if (t === task){
                    return {...t, isDone: isDone}
            }

                return t;
            });
            this.setState({tasks: newTasks})
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

