import React from 'react';
import {Card, CardText, CardTitle} from "material-ui";
import Albums from '../../albums';

const userAlbum = (props) => {

    return (<Card>
        <CardTitle title="My Albums" titleStyle={{fontWeight: 'bold'}}/>
        <CardText>
            <Albums data={props.data} baseURL={props.baseURL} />
        </CardText>
    </Card>);
}

export default userAlbum;