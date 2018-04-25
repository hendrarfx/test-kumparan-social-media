import React, {Component} from 'react';
import Wrapper from "../../../common/hoc/Wrapper";
import {connect} from "react-redux";
import {postActionType, userActionType,commentActionType} from "../../../redux/actions";
import {Col, Row} from "react-bootstrap";
import {filter as filterData} from '../../../common/helper';
import {PostComments, PostBody, AddCommentForms} from '../../../components/apps/posts/detail'

class PostDetail extends Component {

    state = {
        key: '',
        selectedPost: {},
        selectedUser: {},
        userNotNull: false,
        postNotNull: false
    }

    componentWillMount() {
        try {
            this.setState({key: this.props.match.params.id});
        } catch (error) {
            this.props.history.goBack();
        }
    }

    componentDidMount() {
        this.findOnePost();
        this.findComments();
    }

    componentDidUpdate() {
        this.findOnePost();
        if (this.state.selectedPost.userId !== ''
            && this.state.selectedPost.userId !== null
            && this.state.selectedPost.userId !== undefined) {
            this.findOneUser();
        }
    }

    findOnePost = () => {
        if (!this.state.postNotNull && this.props.loadDataPost === false) {
            if (this.props.allPost !== undefined) {
                if (this.props.allPost.length <= 0) {
                    this.props.getPostFromServer(null, 'all');
                } else {
                    if (this.state.key !== '' && this.state.key !== null && this.state.key !== undefined) {
                        const filtered = filterData([...this.props.allPost], 'id', this.state.key);
                        if (filtered.length > 0) {
                            this.setState({selectedPost: filtered[0], postNotNull: true});
                        } else {
                            //this.props.history.goBack();
                        }
                    } else {
                        //this.props.history.goBack();
                    }
                }
            } else {
                this.props.getPostFromServer(null, 'all');
            }
        }
    }

    findOneUser = () => {
        if (!this.state.userNotNull && this.props.loadData === false) {
            if (this.props.usersData !== undefined) {
                if (this.props.usersData.length <= 0) {
                    this.props.getUsersFromServer();
                } else {
                    const filtered = filterData([...this.props.usersData], 'id', this.state.selectedPost.userId);
                    if (filtered.length > 0) {
                        this.setState({selectedUser: filtered[0], userNotNull: true});
                    } else {
                        this.props.history.goBack();
                    }
                }
            }
        }
    }

    findComments = () => {
        const filter={postId:this.state.key};
        this.props.getCommentsFromServer(filter,this.state.key);
    };

    render() {

        const postBody = (<Row>
            <Col xs={6} sm={6} md={6} lg={6}>
                <PostBody user={this.state.selectedUser} post={this.state.selectedPost}/>
                <AddCommentForms/>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
                <PostComments comments={this.props.comments[this.state.key]}
                    isStillLoading={this.props.loadDataComments}
                    error={this.props.errorGettingComments} />
            </Col>
        </Row>);

        const id = this.state.selectedPost.id;
        const rendered = (id !== undefined && id !== '' && id !== null) ? postBody : <div align="center" style={{paddingTop: '25px'}}><h5>Post detail not found</h5></div>;

        return (
            <Wrapper title="Post Detail" showHorizontalLine={true} showBackButton={true} history={this.props.history}>
                {rendered}
            </Wrapper>);
    }
}

const mapStateToProps = (state) => {
    return {
        allPost: state.rPosts.postData['all'],
        loadDataPost: state.rPosts.gettingDataFromServer,
        errorGettingPost: state.rPosts.error,
        usersData: state.rUsers.users,
        loadData: state.rUsers.gettingDataFromServer,
        errorGettingUser: state.rUsers.error,
        comments: state.rComments.comments,
        loadDataComments: state.rComments.gettingDataFromServer,
        errorGettingComments: state.rComments.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPostFromServer: (params, id) => dispatch(postActionType.getPostFromServer(params, id)),
        getUsersFromServer: () => dispatch(userActionType.getUserFromServer()),
        getCommentsFromServer: (params, id) => dispatch(commentActionType.getCommentFromServer(params, id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);