import React from 'react';
import PropTypes from 'prop-types';


export class EditableSpan extends React.Component {
    state = {
        isEditMode: false,

    }
    activatedEditMode = () => {
        this.setState({isEditMode: true});
    }

    deactivatedEditMode = (e) => {
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
