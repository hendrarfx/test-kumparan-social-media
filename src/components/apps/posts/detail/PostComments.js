import React, {Component} from 'react';
import {Card, CardHeader, CardText, CircularProgress, IconButton} from "material-ui";
import PropTypes from 'prop-types';
import Row from "react-bootstrap/es/Row";
import {Col} from "react-bootstrap";
import {ActionDelete} from "material-ui/svg-icons/index";
import ScrollBar from '../../../UI/ScrollBar';

class PostComments extends Component {
    static propTypes = {
        comments: PropTypes.array,
        isStillLoading: PropTypes.bool,
        error: PropTypes.string
    };

    render() {

        let rendered = <div align="center">No Post<br/> {this.props.error}</div>;
        if (this.props.isStillLoading) {
            rendered = (<div style={{marginTop: '50px', textAlign: 'center'}}><CircularProgress/></div>);
        } else {
            console.log(this.props.comments);
            if (this.props.comments !== undefined) {
                if (this.props.comments.length > 0) {
                    rendered = this.props.comments.map((data) => {
                        return <div key={data.id}>
                            <CardHeader
                                title={data.name}
                                titleStyle={{fontSize: 'small', fontWeight: 'bold'}}
                                subtitle={data.email}
                                subtitleStyle={{fontSize: 'smaller'}}
                            />
                            <CardText style={{marginTop: '-25px'}}>
                                <Row>
                                    <Col sm={10} md={10} lg={10} xs={10}>
                                        {data.body}
                                    </Col>
                                    <Col sm={2} md={2} lg={2} xs={2}>
                                        <IconButton tooltip="Delete Comment" iconStyle={{color: '#555'}}>
                                            <ActionDelete/>
                                        </IconButton>

                                    </Col>
                                </Row>

                            </CardText>
                            <hr style={{margin: '0px'}}/>
                        </div>
                    });
                }
            }
        }
        return (<Card>
            <CardHeader
                title={'All Comments'}
                titleStyle={{fontWeight: 'bold', fontSize: '14pt'}}
                style={{borderBottom: 'thin solid #e5e5e5', margin: '0px 16px'}}
            />
            <CardText>
                <ScrollBar id="scrollBarPostComments" height="400px">
                    {rendered}
                </ScrollBar>
            </CardText>
        </Card>);
    }
}

export default PostComments;