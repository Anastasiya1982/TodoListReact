import React from 'react';
import EditableSpan from "./EditableSpan";

type OwnPropsType={
    title:string
    onChange:(title:string)=>void
}
class TodoListTitle  extends React.Component<OwnPropsType> {


    changeTitle=(title:string)=>{
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
