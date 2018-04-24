import React, {Component} from 'react';
import Wrapper from "../../common/hoc/Wrapper";
import {Col, Grid, Row} from "react-bootstrap";

class Posts extends Component {
    render() {
        return (<Wrapper title="All Posts" showHorizontalLine={true}>
            <Grid>
                <Row>
                    <Col sm={12} md={12} xs={12} lg={12}>

                    </Col>
                </Row>
            </Grid>
        </Wrapper>);
    }
}

export default Posts;