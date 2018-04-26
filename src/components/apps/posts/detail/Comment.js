import React, {Component} from 'react';
import {CardHeader, CardText, IconButton} from "material-ui";
import {ActionDelete} from "material-ui/svg-icons/index";
import PropTypes from 'prop-types';
import {Col, Row} from "react-bootstrap";

export default class Comment extends Component {

    static propTypes = {
        data: PropTypes.object,
        onSelect: PropTypes.func,
        canModify: PropTypes.bool
    }

    render() {
        const showPanel = (this.props.canModify ? (<div>
            <IconButton tooltip="Update Comment" iconStyle={{color: '#555'}}
                        onClick={() => this.props.onSelect(this.props.data,'update')}>
                <i className="material-icons">mode_edit</i>
            </IconButton>
            <IconButton tooltip="Delete Comment" iconStyle={{color: '#555'}}
                        onClick={() => this.props.onSelect(this.props.data,'delete')}>
                <ActionDelete/>
            </IconButton></div>) : null);

        return <div>
            <CardHeader
                title={this.props.data.name}
                titleStyle={{fontSize: 'small', fontWeight: 'bold'}}
                subtitle={this.props.data.email}
                subtitleStyle={{fontSize: 'smaller'}}
            />
            <CardText style={{marginTop: '-25px'}}>
                <Row>
                    <Col sm={10} md={10} lg={10} xs={10}>
                        {this.props.data.body}
                    </Col>
                    <Col sm={2} md={2} lg={2} xs={2} style={{textAlign: 'center'}}>
                        {showPanel}
                    </Col>
                </Row>

            </CardText>
            <hr style={{margin: '0px'}}/>
        </div>
    }
}