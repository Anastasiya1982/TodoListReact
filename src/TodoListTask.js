import React from 'react';
import PropTypes from 'prop-types';
import EditableSpan from "./EditableSpan";


class TodoListTask extends React.Component {
    state = {
        isEditMode: false,
        title:this.props.title
    }
    // activatedEditMode = () => {
    //     this.setState({isEditMode: true});
    // }
    //
   updateTaskTitle = (value) => {
        this.props.changeTitle(this.props.task, value);

    }

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked);
    };


    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    };
    render = () => {
        let isStatus = this.props.task.status === 2
        let taskIsDoneClass = isStatus ? "todoList-task done" : "todoList-task"
        return (
            <div className={taskIsDoneClass}>
                <input type="checkbox"
                    checked={isStatus}
                    onChange={this.onIsDoneChanged} />
                <EditableSpan value={this.props.task.title}
                              onChange={this.updateTaskTitle}/> ,  priority: {this.props.task.priority}
                <button onClick={this.deleteTask}>{'\u274C'}</button>
            </div>
        );
    }
}

TodoListTask.propTypes = {
    isDone: PropTypes.func,
    title: PropTypes.string,
    ptiority: PropTypes.string
}

export default TodoListTask;
