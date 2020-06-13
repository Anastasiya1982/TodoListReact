import React from 'react';
import PropTypes from 'prop-types';


class TodoListTask extends React.Component {
    state = {
        isEditMode: false
    }
    activatedEditMode = () => {
        this.setState({isEditMode: true});
    }

    deactivatedEditMode = (e) => {
        debugger;
        this.props.changeTitle(this.props.task, e.currentTarget.value);
        this.setState({isEditMode: false});

    }

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked);
    };
    // onTitleChanged = (e) => {
    //     // this.props.changeTitle(this.props.task, e.currentTarget.value);
    // };

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    };
    render = () => {
        let isStatus = this.props.task.status === 2
        let taskIsDoneClass = isStatus ? "todoList-task done" : "todoList-task"
        return (
            <div className={taskIsDoneClass}>
                <input
                    type="checkbox"
                    checked={isStatus}
                    onChange={this.onIsDoneChanged}
                />
                {this.state.isEditMode
                    ? <input
                        defaultValue={this.props.task.title}
                        autoFocus={true}
                        onBlur={this.deactivatedEditMode}
                        // onChange={this.onTitleChanged}
                    />
                    : <span onClick={this.activatedEditMode}>{this.props.task.id}:{this.props.task.title}  </span>}
                <span> priority: {this.props.task.priority}</span>
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
