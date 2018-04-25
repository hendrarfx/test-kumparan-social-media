import React, {Component} from 'react';
import {Card, CardHeader, CardText} from "material-ui";
import PropTypes from 'prop-types';

class PostBody extends Component {
    static propTypes = {
        user:PropTypes.object.isRequired,
        post:PropTypes.object.isRequired
    };

    render() {
        return (<Card>
            <CardHeader
                title={this.props.post.title}
                titleStyle={{fontWeight: 'bold', fontSize: '14pt'}}
                subtitle={'by ' + this.props.user.name} />
            <CardText>
                <p>{this.props.post.body}</p>
            </CardText>
        </Card>);
    }
}

export default PostBody;