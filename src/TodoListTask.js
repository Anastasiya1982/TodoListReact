import React from 'react';
import PropTypes from 'prop-types';


class TodoListTask extends React.Component {
    onIsDoneChanged =(e)=>{
        this.props.changeStatus (this.props.task,e.currentTarget.checked)
    }
    render = () => {
        let taskIsDoneClass=this.props.task.isDone?"todoList-task done":"todoList-task"
        return (
               <div className={taskIsDoneClass}>
                   <input
                       type="checkbox"
                       checked={this.props.task.isDone}
                       onChange={ this.onIsDoneChanged}
                   />
                   <span>{this.props.task.title}  </span>
                   <span>{this.props.task.priority}</span>
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
