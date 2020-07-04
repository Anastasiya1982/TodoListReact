import React, {ChangeEvent} from 'react';
import EditableSpan from "./EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Types/entities";




type OwnPropsType={
    title:string
    task:TaskType
    changeTitle:(task:TaskType, value:string)=>void
    changeStatus:(task:TaskType,e:boolean)=>void
    deleteTask:(id:string)=>void
}


type StateType={
    isEditMode: boolean,
    title:string
}


class TodoListTask extends React.Component <OwnPropsType,StateType>{
    state:StateType = {
        isEditMode: false,
        title:this.props.title
    }

   updateTaskTitle = (value:string) => {
        this.props.changeTitle(this.props.task, value);

    }

    onIsDoneChanged = (e: ChangeEvent<HTMLInputElement>) => {
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
                <IconButton onClick={this.deleteTask}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={this.deleteTask}>{'\u274C'}</button>*/}
            </div>
        );
    }
}



export default TodoListTask;
