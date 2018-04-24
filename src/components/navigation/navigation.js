import React from 'react';
import {Avatar, Chip, FontIcon} from "material-ui";
import {NavLink} from "react-router-dom";
import classes from './navigation.css';

const navigation = (props) => {

    return (<div className={classes.wrapper}>
            <NavLink to={`${props.match.url}`}>
                <Chip className={classes.chip}>
                    <Avatar className={classes.avatar} icon={<FontIcon className="material-icons">home</FontIcon>}/>
                    <div className={classes.inside}>Home</div>
                </Chip>
            </NavLink>
            <NavLink to={`${props.match.url}/posts`}>
                <Chip className={classes.chip}>
                    <Avatar icon={<FontIcon className="material-icons">content_paste</FontIcon>}/>
                    <div className={classes.inside}>All Post</div>
                </Chip>
            </NavLink>
            <NavLink to={`${props.match.url}/users`}>
                <Chip className={classes.chip}>
                    <Avatar icon={<FontIcon className="material-icons">account_circle</FontIcon>}/>
                    <div className={classes.inside}>All Users</div>
                </Chip>
            </NavLink>

        </div>
    );
}


export default navigation;