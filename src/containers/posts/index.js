import React, {Component} from 'react';
import Wrapper from "../../common/hoc/Wrapper";
import {connect} from "react-redux";
import {postActionType} from "../../redux/actions";
import PostComponent from '../../components/apps/posts';

class Posts extends Component {

    componentDidMount(){
        this.findData();
    }

    findData=()=>{
        // eslint-disable-next-line
        const filter={};
        this.props.getPostFromServer(null,'all');
    };

    render() {
        return (<Wrapper title="All Posts" showHorizontalLine={true}>
           <PostComponent data={this.props.allPost} isStillLoading={this.props.loadDataPost}
                   error={this.props.errorGettingPost}/>
        </Wrapper>);
    }
}

const mapStateToProps = (state) => {
    return {
        allPost: state.rPosts.postData['all'],
        loadDataPost: state.rPosts.gettingDataFromServer,
        errorGettingPost: state.rPosts.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPostFromServer: (params, id) => dispatch(postActionType.getPostFromServer(params, id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);