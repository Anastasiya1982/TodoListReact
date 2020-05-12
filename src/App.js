import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";


class App extends React.Component {
    state= {
        todoList: [
            // {id: 1, title: "jsx"},
            // {id: 2, title: "React"},
            // {id: 3, title: "HTML"}
        ]
    }
        nextTodoId=5;

    addTodoList=(newTitle)=>{
            let newTodoList =
                {   title: newTitle,
                    id:this.nextTodoId
                };
            this.nextTodoId++;
            let newTodoLists = [...this.state.todoList, newTodoList];
            this.setState({todoList: newTodoLists},this.saveState);
          };

    saveState=()=>{
        let stateAsAString=JSON.stringify(this.state);
        localStorage.setItem("todoList",stateAsAString);
    };

    restoreState=()=>{
        let state={
            todoList: [],
        };
        let stateAsString=localStorage.getItem("todoList");
        if(stateAsString){
            state=JSON.parse(stateAsString);
        }
        this.setState(state,()=>{
            this.state.todoList.forEach(t=>{
                if(t.id>=this.nextTodoId){
                    this.nextTodoId = t.id+1
                }
            })
        });
    }
    componentDidMount() {
        this.restoreState();
    }

    render() {

  const todolists=this.state.todoList.map(tl=> <TodoList id ={tl.id} title={tl.title}/>);
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
            {/*<div>*/}
            {/*    <input/>*/}
            {/*    <button>Add</button>*/}
            {/* </div>*/}
            <div className="App">
                {todolists}
            </div>
           </>
        );
    }
}

    //    state = {
    //         tasks: [],
    //         filterValue: "All"
    //     };
    //
    //         nextTaskId=5;
    //
    //         saveState=()=>{
    //             let stateAsAString=JSON.stringify(this.state);
    //             localStorage.setItem("state",stateAsAString);
    //         };
    //         restoreState=()=>{
    //             let state={
    //                 tasks:[],
    //                 filterValue: "All"
    //             };
    //             let stateAsString=localStorage.getItem("state");
    //             if(stateAsString){
    //                 state=JSON.parse(stateAsString);
    //            }
    //             this.setState(state,()=>{
    //                 this.state.tasks.forEach(t=>{
    //                     if(t.id>=this.nextTaskId){
    //                         this.nextTaskId = t.id+1
    //                     }
    //                 })
    //             });
    //         }
    //         componentDidMount() {
    //             this.restoreState();
    //         }
    //
    // addTask= (newTitle) => {
    //         // let newTitle = this.newTaskTitleRef.current.value;
    //         // this.newTaskTitleRef.current.value = "";
    //         let newTask =
    //             {   title: newTitle,
    //                 isDone: false,
    //                 priority: "low",
    //                 id:this.nextTaskId
    //             };
    //         this.nextTaskId++;
    //         let newTasks = [...this.state.tasks, newTask];
    //         this.setState({tasks: newTasks},this.saveState);
    //
    //     };
    //        changeFilter =(newFilterValue)=>{
    //         this.setState({filterValue:newFilterValue});
    //
    //     };
    //        changeTask=(taskId,obj)=>{
    //            let newTasks = this.state.tasks.map(t => {
    //                if (t.id === taskId){
    //                    return {...t, ...obj}
    //                }
    //                return t;
    //            });
    //            this.setState({tasks: newTasks},this.saveState)
    //        }
    //
    //
    //
    //       changeStatus =(taskId,isDone)=> {
    //            this.changeTask(taskId,{isDone:isDone})
    //         // let newTasks = this.state.tasks.map(t => {
    //         //     if (t.id === taskId){
    //         //         return {...t, isDone: isDone}
    //         // }
    //         //
    //         //     return t;
    //         // });
    //         // this.setState({tasks: newTasks})
    //     }
    //
    //      changeTitle =(taskId,title)=> {
    //            this.changeTask(taskId,{title:title})
    // //          let newTasks = this.state.tasks.map(t => {
    // //              if (t.id === taskId) {
    // //                  return {...t, title: title}
    // //              }
    // //              return t;
    // //          });
    // //          this.setState({tasks: newTasks});
    //  }
    //
    //     render = () => {
    //         return (
    //             <div className="App">
    //                 <div className="todoList">
    //                   <TodoListHeader addTask = {this.addTask}/>
    //                     <TodoListTasks tasks={this.state.tasks.filter(t=>{
    //                         switch (this.state.filterValue) {
    //                             case "Active":
    //                                 return t.isDone === false;
    //                             case "Completed":
    //                                 return t.isDone === true;
    //                             case "All":
    //                                 return true;
    //                             default:
    //                                 return true;}
    //                         })}
    //                         changeStatus ={this.changeStatus}
    //                         changeTitle={this.changeTitle}
    //
    //                     />
    //                     <TodoFooter filterValue={this.state.filterValue}
    //                     changeFilter={this.changeFilter}
    //                     />
    //                 </div>
    //             </div>
    //         );
    //     }
    // }

export default App;

