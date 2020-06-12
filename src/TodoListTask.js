import React from 'react';
import PropTypes from 'prop-types';


class TodoListTask extends React.Component {
    state={
        isEditMode:false
    }
  activatedEditMode =()=>{
        this.setState({isEditMode:true});
    }

      deactivatedEditMode=()=>{
            this.setState({isEditMode:false})
    }

    onIsDoneChanged =(e)=>{
        this.props.changeStatus (this.props.task.id ,e.currentTarget.checked)
    };
    onTitleChanged =(e)=>{
        this.props.changeTitle (this.props.task.id ,e.currentTarget.value)
    };

    deleteTask=()=>{
       this.props.deleteTask(this.props.task.id)
    };
    render = () => {
        let taskIsDoneClass=this.props.task.isDone?"todoList-task done":"todoList-task"
        return (
               <div className={taskIsDoneClass}>
                   <input
                       type="checkbox"
                       checked={this.props.task.isDone}
                       onChange={ this.onIsDoneChanged}
                   />
                   {this.state.isEditMode
                   ? <input
                       value={this.props.task.title}
                       autoFocus={true}
                       onBlur={this.deactivatedEditMode}
                       onChange={this.onTitleChanged}/>
                   : <span onClick={this.activatedEditMode}>{this.props.task.id}:{this.props.task.title}  </span> }
                   <span> priority: {this.props.task.priority}</span>
                   <button onClick={this.deleteTask}>{'\u274C'}</button>
               </div>
        );
    }
}
TodoListTask.propTypes ={
    isDone: PropTypes.func,
    title: PropTypes.string,
    ptiority:PropTypes.string
}

export default TodoListTask;
