import React from 'react';
import {Card, CardText, CardTitle} from "material-ui";
import Albums from '../../albums';

const userAlbum = (props) => {

    return (<Card>
        <CardTitle title={props.title} titleStyle={{fontWeight: 'bold'}}/>
        <CardText>
            <Albums data={props.data} baseURL={props.baseURL} isStillLoading={props.isStillLoading}
                    error={props.error}/>
        </CardText>
    </Card>);
}

export default userAlbum;