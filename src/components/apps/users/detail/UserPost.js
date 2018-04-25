import React, {Component} from 'react';
import {Card, CardText, CardTitle} from "material-ui";
import Posts from '../../posts';
import ScrollBar from "../../../UI/ScrollBar/index";
import PropTypes from 'prop-types';

class UserPost extends Component {
    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string.isRequired,
        height: PropTypes.string,
        data: PropTypes.array,
        baseURL: PropTypes.string,
        isStillLoading: PropTypes.bool.isRequired,
        error: PropTypes.string,
    };

    static defaultProps = {
        height: '350px',
        isStillLoading: false,
        id: '' + new Date().getTime()
    }

    render() {
        return (<Card>
            <CardTitle title={this.props.title} titleStyle={{fontWeight: 'bold'}}/>
            <CardText>
                <ScrollBar id={this.props.id} height={this.props.height}>
                    <Posts data={this.props.data} baseURL={this.props.baseURL}
                           isStillLoading={this.props.isStillLoading}
                           error={this.props.error}/>
                </ScrollBar>
            </CardText>
        </Card>);
    }
}

export default UserPost;