import React from 'react';
import {FontIcon, TableRow, TableRowColumn} from "material-ui";
import {NavLink} from "react-router-dom";

const post = (props) => {

    return (
        <TableRow>
            <TableRowColumn style={{width:150,textAlign:'center'}} >{props.index + 1}</TableRowColumn>
            <TableRowColumn>{props.data.title}</TableRowColumn>
            <TableRowColumn style={{width:100}}>
                <NavLink to={'/dashboard/posts/'+props.data.id}>
                    <FontIcon className="material-icons" color="#555">view_lists</FontIcon>
                </NavLink>
            </TableRowColumn>
        </TableRow>);
};
export default post;