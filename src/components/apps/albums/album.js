import React from 'react';
import {Card, CardText} from "material-ui";
import {NavLink} from "react-router-dom";
import image from '../../../assets/image/folder_icon_blue.png';

const album = (props) => {

    return (
        <NavLink to={{
            pathname: '/dashboard/users/album',
            search: '?uid=' + props.data.userId + '&aid=' + props.data.id
        }}>
            <Card style={{marginBottom: '5px', cursor: 'pointer'}}>
                <CardText style={{textAlign: 'center'}}>
                    <img src={image} style={{width: 64, height: 'auto'}} alt="folder"/>
                    <br/><br/>
                    <div style={{fontSize: 'small'}}>{props.data.title}</div>
                </CardText>
            </Card></NavLink>);
};


export default album;