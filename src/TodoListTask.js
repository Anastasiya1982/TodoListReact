import React from 'react';
import PropTypes from 'prop-types';


class TodoListTask extends React.Component {
    render = () => {
        return (
               <div className="todoList-task">
                   <input type="checkbox" checked={this.props.isDone}/>
                   <span>{this.props.title}  </span>
                   <span>{this.props.priority}</span>
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
