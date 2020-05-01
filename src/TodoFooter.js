import React from 'react';
import PropTypes from 'prop-types';


class TodoFooter extends React.Component {
    state ={
        isHidden:false
    }
    onAllFilterClick = ()=>this.props.changeFilter("All");
    onCompletedFilterClick = ()=>this.props.changeFilter("Completed")
    onActiveFilterClick = ()=>this.props.changeFilter("Active")
    onShowFiltersClick = () => {this.setState({isHidden:false})}
    onHideFiltersClick = ()=>{this.setState({isHidden:true})}


    render = () => {
        let classForAll =this.props.filterValue==="All"?"filter-active":"";
        let classForCompleted =this.props.filterValue==="Completed"?"filter-active":"";

        let classForActive = this.props.filterValue === "Active"?"filter-active": "";

        return (
                  <div className="todoList-footer">
                      {!this.state.isHidden && <div>
                        <button
                            className={classForAll}
                            onClick = {this.onAllFilterClick}
                        >All
                        </button>
                        <button className={classForCompleted}
                        onClick = {this. onCompletedFilterClick}
                        >Completed</button>
                        <button className={classForActive}
                        onClick = {this.onActiveFilterClick}
                        >Active</button>
                      </div>}
                      {!this.state.isHidden && <span onClick={this.onHideFiltersClick}>Hide</span>}
                      {this.state.isHidden &&<span onClick={ this.onShowFiltersClick}>Show </span>}
                  </div>
        );
    }
}
TodoFooter.propTypes={
    filterValue:PropTypes.string,
}
export default TodoFooter ;

