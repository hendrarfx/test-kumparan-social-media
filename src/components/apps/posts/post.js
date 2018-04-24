import React from 'react';
import {Card, CardText} from "material-ui";
import {NavLink} from "react-router-dom";

const user = (props) => {

    return (<NavLink to={props.baseURL+'/detail/'+props.data.id}><Card style={{marginBottom: '5px',cursor:'pointer'}}>
        <CardText>
            <h5><b>{props.data.name}</b></h5>
            {props.data.email}<br />
        </CardText>
    </Card></NavLink>);
};
export default user;