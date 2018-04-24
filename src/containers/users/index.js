import React, {Component} from 'react';
import Wrapper from "../../common/hoc/Wrapper";

class Posts extends Component {
    render() {
        return (<Wrapper title="All Posts" showHorizontalLine={true}>Posts</Wrapper>);
    }
}

export default Posts;