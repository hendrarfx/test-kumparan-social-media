import React, {Component} from 'react';
import Wrapper from "../../../common/hoc/Wrapper";
import {connect} from "react-redux";
import {postActionType, userActionType, commentActionType, snackBarActionType} from "../../../redux/actions";
import {Col, Row} from "react-bootstrap";
import {filter as filterData} from '../../../common/helper';
import {PostComments, PostBody, AddCommentForms} from '../../../components/apps/posts/detail'
import * as _ from "lodash";

class PostDetail extends Component {

    state = {
        key: '',
        canModify: false,
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
        this.refreshPost();
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
                        let canModify = false;
                        if (this.props.user.id === filtered[0].id) {
                            canModify = true;
                        }
                        this.setState({selectedUser: filtered[0], canModify: canModify, userNotNull: true});
                    } else {

                    }
                }
            }
        }
    }

    findComments = () => {
        const filter = {postId: this.state.key};
        this.props.getCommentsFromServer(filter, this.state.key);
    };

    refreshPost = () => {
        if (this.state.key !== '' && this.state.key !== null && this.state.key !== undefined) {
            if (this.state.selectedUser.id !== '' && this.state.selectedUser.id !== null && this.state.selectedUser.id !== undefined) {

                if (this.props.myPost !== undefined && this.props.myPost !== null) {
                    if (this.props.myPost[this.state.selectedUser.id] !== undefined && this.props.myPost[this.state.selectedUser.id] !== null) {

                        const data = [...this.props.myPost[this.state.selectedUser.id]];
                        const filtered = filterData(data, 'id', this.state.key);

                        if (filtered.length > 0) {
                            if (!_.isEqual(filtered[0], this.state.selectedPost)) {
                                this.setState({selectedPost: filtered[0], postNotNull: true});
                            }
                        }
                    }
                }
            }
        }
    }

    render() {

        const postBody = (<Row>
            <Col xs={12} sm={12} md={12} lg={12}>
                <PostBody
                    transactionInProcess={this.props.transactionInProcess}
                    transactionMessage={this.props.transactionMessage}
                    transactionSuccess={this.props.transactionSuccess}
                    transactionFailed={this.props.transactionFailed}
                    openSnackBar={this.props.openSnackBar}
                    onDelete={this.props.deletePost}
                    onUpdate={this.props.updatePost}
                    afterUpdate={this.refreshPost}
                    canModify={this.state.canModify}
                    user={this.state.selectedUser}
                    history={this.props.history}
                    post={this.state.selectedPost}/>

                <AddCommentForms show={this.state.canModify} email={this.state.selectedUser.email}
                                 postId={this.state.selectedPost.id} userName={this.state.selectedUser.name}/>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} style={{marginTop: '10px'}}>
                <PostComments
                    canModify={this.state.canModify}
                    comments={this.props.comments[this.state.key]}
                    isStillLoading={this.props.loadDataComments}
                    error={this.props.errorGettingComments}/>
            </Col>
        </Row>);

        const id = this.state.selectedPost.id;
        const rendered = (id !== undefined && id !== '' && id !== null) ? postBody :
            <div align="center" style={{paddingTop: '25px'}}><h5>Post detail not found</h5></div>;

        return (
            <Wrapper title="Post Detail" showHorizontalLine={true} showBackButton={true} history={this.props.history}>
                {rendered}
            </Wrapper>);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.rAuth.user,
        allPost: state.rPosts.postData['all'],
        myPost: state.rPosts.postData,
        loadDataPost: state.rPosts.gettingDataFromServer,
        errorGettingPost: state.rPosts.error,
        usersData: state.rUsers.users,
        loadData: state.rUsers.gettingDataFromServer,
        errorGettingUser: state.rUsers.error,
        comments: state.rComments.comments,
        loadDataComments: state.rComments.gettingDataFromServer,
        errorGettingComments: state.rComments.error,
        transactionInProcess: state.rPosts.transactionInProcess,
        transactionFailed: state.rPosts.transactionFailed,
        transactionSuccess: state.rPosts.transactionSuccess,
        transactionMessage: state.rPosts.transactionMessage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPostFromServer: (params, id) => dispatch(postActionType.getPostFromServer(params, id)),
        getUsersFromServer: () => dispatch(userActionType.getUserFromServer()),
        getCommentsFromServer: (params, id) => dispatch(commentActionType.getCommentFromServer(params, id)),
        updatePost: (post) => dispatch(postActionType.updatePostToServer(post)),
        deletePost: (post) => dispatch(postActionType.deletePostFromServer(post)),
        openSnackBar: (post) => dispatch(snackBarActionType.openSnackBar(post)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);