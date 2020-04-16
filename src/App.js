import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoFooter from "./TodoFooter";
import TodoListTasks from "./TodoListTasks";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    };


        state = {
            tasks: [
                {title: "ReactJS", isDone: false, priority: "low"},
                {title: "CSS", isDone: false, priority: "higth"},
                {title: "jQuarry", isDone: false, priority: "medium"},
                {title: "JS", isDone: true, priority: "low"},
                {title: "Patterns", isDone: true, priority: "low"},
            ],
            filterValue: "All"
        };

        onAddTaskClick = () => {
            let newTitle = this.newTaskTitleRef.current.value;
            this.newTaskTitleRef.current.value = "";
            let newTask =
                {
                    title: newTitle, isDone: false, priority: "low"
           };

            let newTasks = [...this.state.tasks, newTask];
            this.setState({tasks: newTasks});

        };

        render = () => {
            return (
                <div className="App">
                    <div className="todoList">
                        <div className="todoList-header">
                            <h3 className="todoList-header_title">What to learn</h3>
                            <div className="todoList-newTaskForm">
                                <input
                                    type="text"
                                    placeholder="New task name"
                                    ref={this.newTaskTitleRef}
                                />
                                <button onClick={this.onAddTaskClick}>Add</button>
                            </div>
                        </div>
                        <TodoListTasks tasks={this.state.tasks}/>
                        <TodoFooter filterValue={this.state.filterValue}/>
                    </div>
                </div>
            );
        }
    }

export default App;

