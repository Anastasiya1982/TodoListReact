import React from 'react';
import TodoListTask from "./TodoListTask";
import PropTypes from 'prop-types';



class TodoListTasks extends React.Component {
    render = () => {

       let tasksElements = this.props.tasks.map(task =>{
           return (
               <TodoListTask
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
TodoListTasks.propTypes={
    tasks:PropTypes.array,
    title: PropTypes.string,
    isDone:PropTypes.func,
    priority:PropTypes.string
}

export default TodoListTasks;



