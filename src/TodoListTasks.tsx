import React from 'react';
import TodoListTask from "./TodoListTask";
import {TaskType} from "./Types/entities";

type OwnPropsType={
    tasks:Array<TaskType>
    changeStatus:(newTask:TaskType, status:boolean)=>void
    changeTitle:(newTask:TaskType, title:string)=>void
    deleteTask:(taskId:string)=>void
}


class TodoListTasks extends React.Component<OwnPropsType> {
    render = () => {

       let tasksElements = this.props.tasks.map(task =>{
           return (
               <TodoListTask  title={task.title}
                             key={task.id}
                             task={task}
                             changeStatus={this.props.changeStatus}
                             changeTitle={this.props.changeTitle}
                             deleteTask={this.props.deleteTask}

               />
           )
       });
        return (
               <div className="todoList-tasks">
                  {tasksElements}
               </div>
        );
    }
}


export default TodoListTasks;



