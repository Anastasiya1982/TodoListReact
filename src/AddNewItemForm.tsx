import React, {ChangeEvent,KeyboardEvent} from 'react';



type OwnPropsType={
    addItem:(newTitle:string)=>void
}

type StateType={
    error:boolean
    title:string
}
class AddNewItemForm extends React.Component<OwnPropsType,StateType> {

    state:StateType={
        error:false,
        title: ""
    }

    onAddItemClick = ()=>{
        let newTitle=this.state.title.trim();
         if(newTitle.trim() === "") {
             this.setState({error: true})
         }
        else {
           // this.newTaskTitleRef.current.value = "";
            this.props.addItem(newTitle);
            this.setState({
                error:false,
                title:""
            })
        }
    }

    onTitleChanged=(e:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            error:false,
            title: e.currentTarget.value
            });
    }

    onKeyPress=(e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==="Enter"){
            this.onAddItemClick();
        }
    }


    render = () => {
        let errorClass=this.state.error ? "error":"";
        return (
                    <div  className="todolist-NewTaskForm ">
                            <input className={errorClass}
                                type="text"
                                placeholder="New item name"
                               //ref={this.newTaskTitleRef}
                                onChange ={this.onTitleChanged}
                                onKeyPress={this.onKeyPress}
                                value={this.state.title}
                            />
                            <button onClick={this.onAddItemClick} >Add</button>

                     </div>

        );
    }
}

export default AddNewItemForm;
