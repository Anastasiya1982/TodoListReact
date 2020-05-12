import React from 'react';
import PropTypes from 'prop-types';

class TodoListTitle  extends React.Component {

    render = () => {
        return (  <div className="todoList-header">
                        <h3 className="todoList-header__title">{this.props.title}</h3>
                 </div>
       );
    }
}

export default TodoListTitle;
