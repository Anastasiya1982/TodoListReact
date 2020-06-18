import React from 'react';
import PropTypes from 'prop-types';
import EditableSpan from "./EditableSpan";

class TodoListTitle  extends React.Component {


    changeTitle=(title)=>{
       this.props.onChange(title)

    }
    render = () => {
        return (
            <>
            <EditableSpan value={this.props.title} onChange={this.changeTitle}/>
           </>
       );
    }
}

export default TodoListTitle;
