import React from 'react';
import {Card, CardText, CardTitle} from "material-ui";
import Posts from '../../posts';

const userPost = (props) => {

    return (<Card>
        <CardTitle title="My Posts" titleStyle={{fontWeight: 'bold'}}/>
        <CardText>
            <Posts data={props.data} baseURL={props.baseURL} />
        </CardText>
    </Card>);
}

export default userPost;