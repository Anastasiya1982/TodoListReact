import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";


class App extends React.Component {
    nextTodoListId = 0;
    state = {
        todolists: []
    }

    addTodoList=(newTitle)=> {
        let newTodoList =
            {
                title: newTitle,
                id: this.nextTodoListId
            };
        this.nextTodoListId++;
        this.setState({todolists: [...this.state.todolists, newTodoList]}, () => {
            this.saveState();
        });
    }

    saveState=()=>{
        let stateAsAString=JSON.stringify(this.state);
        localStorage.setItem("todoList-state",stateAsAString);
    };

    restoreState=()=>{
        let state=
            this.state;

        let stateAsString=localStorage.getItem("todoList-state");
        if(stateAsString !==null){
            state=JSON.parse(stateAsString);
        }
        this.setState(state,()=>{
            this.state.todolists.forEach(t=>{
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

  const todolists=this.state.todolists.map(tl=> <TodoList id ={tl.id} title={tl.title}/>);
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>

            <div className="App">
                {todolists}
            </div>
           </>
        );
    }
}


export default App;

