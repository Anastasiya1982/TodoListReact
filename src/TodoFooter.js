import React from 'react';
import PropTypes from 'prop-types';


class TodoFooter extends React.Component {
    render = () => {
        let classForAll =this.props.filterValue==="All"?"filter-active":"";
        let classForCompleted =this.props.filterValue==="Completed"?"filter-active":"";

        let classForActive = this.props.filterValue === "Active"?"filter-active": "";

        return (
                  <div className="todoList-footer">
                        <button className={classForAll}>All</button>
                        <button className={classForCompleted}>Completed</button>
                        <button className={classForActive}>Active</button>
                  </div>
        );
    }
}
TodoFooter.propTypes={
    filterValue:PropTypes.string,
}
export default TodoFooter ;

