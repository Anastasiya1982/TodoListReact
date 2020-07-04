import React from 'react';
import PropTypes from 'prop-types';



type OwnPropsType={
    value:string
    onChange:(e:string)=>void
}

type StateType={
    isEditMode:boolean
}

export class EditableSpan extends React.Component<OwnPropsType,StateType> {
    state:StateType = {
        isEditMode: false,

    }
    activatedEditMode = () => {
        this.setState({isEditMode: true});
    }

    deactivatedEditMode = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.currentTarget.value);
        this.setState({isEditMode: false});

    }

    render = () => {

        return (
           <>
                {this.state.isEditMode
                    ? <input
                        defaultValue={this.props.value}
                        autoFocus={true}
                        onBlur={this.deactivatedEditMode}
                    />
                    : <span onClick={this.activatedEditMode}>{this.props.value}</span>
                }

             </>
        );
    }
}


export default EditableSpan;
