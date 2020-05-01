import React from 'react';
import PropTypes from 'prop-types';

class TodoListHeader  extends React.Component {
    newTaskTitleRef=React.createRef();
    state={
        error:false,
        title: ""
    }

    onAddTaskClick = ()=>{
        //let newTitle = this.newTaskTitleRef.current.value;
        let newTitle=this.state.title.trim();
         if(newTitle.trim() === "") {
             this.setState({error: true})
         }
        else {
           // this.newTaskTitleRef.current.value = "";
            this.props.addTask(newTitle);
            this.setState({
                error:false,
                title:""
            })
        }
    }

    onTitleChanged=(e)=>{
        this.setState({
            error:false,
            title: e.currentTarget.value
            });
    }

    onKeyPress=(e)=>{
        if(e.key==="Enter"){
            this.onAddTaskClick();
        }
    }


    render = () => {
        let errorClass=this.state.error ? "error":"";
        return (
                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            <input className={errorClass}
                                type="text"
                                placeholder="New task name"
                               //ref={this.newTaskTitleRef}
                                onChange ={this.onTitleChanged}
                                onKeyPress={this.onKeyPress}
                                value={this.state.title}
                            />
                            <button onClick={this.onAddTaskClick} >Add</button>
                        </div>
                    </div>


        );
    }
}

export default TodoListHeader;
