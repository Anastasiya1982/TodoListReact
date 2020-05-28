import React from 'react';
import PropTypes from 'prop-types';
import  TodoListTitle from "./TodoListTitle";

class AddNewItemForm extends React.Component {
    newTaskTitleRef=React.createRef();
    state={
        error:false,
        title: ""
    }

    onAddItemClick = ()=>{

        let newTitle=this.state.title.trim();
         if(newTitle.trim() === "") {
             this.setState({error: true})
         }
        else {
           // this.newTaskTitleRef.current.value = "";
            this.props.addItem(newTitle);
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
            this.onAddItemClick();
        }
    }


    render = () => {
        let errorClass=this.state.error ? "error":"";
        return (
                    <div  className="todolist-NewTaskForm ">

                            <input className={errorClass}
                                type="text"
                                placeholder="New item name"
                               //ref={this.newTaskTitleRef}
                                onChange ={this.onTitleChanged}
                                onKeyPress={this.onKeyPress}
                                value={this.state.title}
                            />
                            <button onClick={this.onAddItemClick} >Add</button>

                     </div>

        );
    }
}

export default AddNewItemForm;
