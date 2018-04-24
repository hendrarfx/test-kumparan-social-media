import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import {Card, CardHeader, CardText} from 'material-ui';
import Wrapper from "../../common/hoc/Wrapper";

class Dashboard extends Component {
    render() {

        return (
            <Wrapper title="My Dashboard" showHorizontalLine={true}>
                <Row>
                    <Col xs={12} sm={3} md={3} lg={3}>
                        <Card>
                            <CardHeader
                                title={'Hendra Rusdi Farizi'}
                                titleStyle={{fontWeight: 'bold', fontSize: '12pt'}}
                                subtitle={'hendrarfx@gmail.com'}
                                avatar={'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png'}
                            />
                            <CardText>
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                "
                            </CardText>
                        </Card>
                    </Col>
                    <Col xs={12} sm={9} md={9} lg={9}>
                        <Card>
                            <CardHeader title={'My Posts'} titleStyle={{fontWeight: 'bold', fontSize: '12pt'}}/>
                            <CardText>

                            </CardText>
                        </Card>
                    </Col>
                </Row>
            </Wrapper>
        );
    };
}

export default Dashboard;