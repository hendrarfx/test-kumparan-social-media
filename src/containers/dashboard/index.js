import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import {Avatar, Chip, FontIcon, RaisedButton, Snackbar} from 'material-ui';
import Wrapper from "../../common/hoc/Wrapper";
import {postActionType, albumActionType} from "../../redux/actions";
import {connect} from "react-redux";
import {UserAlbum, UserPost, UserDetail} from "../../components/apps/users/detail";
import classes from './dashboard.css';
import PostForm from '../../components/apps/posts/postForm';

class Dashboard extends Component {

    state = {
        showPost: true,
        showAlbums: false,
        showAddModalPost: false,
        addForm: {
            userId: '',
            title: '',
            body: ''
        },
        addFormMessage: '',
        submitOnProcess: false,
        openSnackBar: false,
        snackbarMessage: ''
    }

    componentWillMount() {
        let newValue = {...this.state.addForm};
        newValue.userId = this.props.user.id;
        this.setState({addForm: newValue});
    }

    componentDidMount() {
        this.findData();
    }

    componentDidUpdate() {
        this.afterTransactionChecking();
    }

    showPost = () => {
        this.setState({showPost: true, showAlbums: false});
    }

    showAlbum = () => {
        this.setState({showPost: false, showAlbums: true});
    }

    findData = () => {
        const filter = {userId: this.props.user.id};
        this.props.getAlbumsFromServer(filter, this.props.user.id);
        this.props.getPostFromServer(filter, this.props.user.id);
    }

    openModal = (data) => {
        this.setState({showAddModalPost: true, addFormMessage: ''})
    };

    closeModal = () => {
        this.setState({showAddModalPost: false, addFormMessage: ''})
    }

    changeTitleValue = (event) => {
        let newValue = {...this.state.addForm};
        newValue.title = event.target.value;
        this.setState({addForm: newValue, addFormMessage: ''});
    }

    changeBodyValue = (content) => {
        let newValue = {...this.state.addForm};
        newValue.body = content;
        this.setState({addForm: newValue, addFormMessage: ''});
    }

    savePostToServer = () => {
        const data = {...this.state.addForm};
        data.userId = this.props.user.id;
        if (data.title !== '' && data.title !== null && data.title !== undefined) {
            if (data.body !== '' && data.body !== null && data.body !== undefined) {
                this.props.savePostToServer(data);
                this.setState({submitOnProcess: true});
            } else {
                this.setState({addFormMessage: 'Body is required'});
            }
        } else {
            this.setState({addFormMessage: 'Title is required'});
        }
    }

    afterTransactionChecking = () => {

        if (this.props.transactionInProcess === false && this.state.submitOnProcess === true) {

            if (this.props.transactionSuccess) {
                this.closeModal();
                this.setState({
                    openSnackBar: true, snackBarMessage: 'Post has been added', submitOnProcess: false,
                    addForm: {
                        userId: '',
                        title: '',
                        body: ''
                    }
                });
            }

            if (this.props.transactionFailed) {
                console.log('FAILED');
                this.setState({addFormMessage: this.props.transactionMessage, submitOnProcess: false});
            }
        }
    }

    closeSnackBar = () => {
        this.setState({openSnackBar: false});
    }

    render() {

        const rendered = this.state.showAlbums ?
            <UserAlbum title={'My Albums'} data={this.props.myAlbums[this.props.user.id]}
                       baseURL={this.props.match.url}
                       isStillLoading={this.props.loadDataAlbums}
                       error={this.props.errorGettingAlbum}
            /> :
            <div>
                <UserPost title={'My Posts'} data={this.props.myPost[this.props.user.id]}
                          height="300px"
                          baseURL={this.props.match.url}
                          isStillLoading={this.props.loadDataPost}
                          error={this.props.errorGettingPost}/>
                <div align="right" style={{marginTop: '15px', marginBottom: '15px'}}>
                    <RaisedButton primary={true} label={'ADD POST'} onClick={this.openModal}/></div>
            </div>
        return (
            <Wrapper title="My Dashboard" showHorizontalLine={true}>
                <PostForm dialogTitle="ADD POST" open={this.state.showAddModalPost} onRequestClose={this.closeModal}
                          onSubmit={this.savePostToServer} postTitle={this.state.addForm.title}
                          postTitleOnChange={this.changeTitleValue}
                          message={this.state.addFormMessage}
                          onSubmitLoading={this.props.transactionInProcess}
                          postBody={this.state.addForm.body} postBodyOnChange={this.changeBodyValue}/>
                <Row>
                    <Col xs={12} sm={3} md={3} lg={3}>
                        <UserDetail user={this.props.user}/>
                    </Col>
                    <Col xs={12} sm={9} md={9} lg={9}>
                        <div className={classes.wrapper}>
                            <Chip className={classes.chip} onClick={this.showPost}>
                                <Avatar icon={<FontIcon className="material-icons">subject</FontIcon>}/>
                                My Posts
                            </Chip>
                            <Chip className={classes.chip} onClick={this.showAlbum}>
                                <Avatar icon={<FontIcon className="material-icons">folder</FontIcon>}/>
                                My Albums
                            </Chip>
                        </div>
                        <br/>
                        {rendered}
                    </Col>
                </Row>
                <Snackbar
                    open={this.state.openSnackBar}
                    message={this.props.transactionMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.closeSnackBar}
                />
            </Wrapper>
        );
    };
}


const mapStateToProps = (state) => {
    return {
        user: state.rAuth.user,
        myPost: state.rPosts.postData,
        loadDataPost: state.rPosts.gettingDataFromServer,
        errorGettingPost: state.rPosts.error,
        myAlbums: state.rAlbums.albums,
        loadDataAlbums: state.rAlbums.gettingDataFromServer,
        errorGettingAlbum: state.rAlbums.error,
        transactionInProcess: state.rPosts.transactionInProcess,
        transactionFailed: state.rPosts.transactionFailed,
        transactionSuccess: state.rPosts.transactionSuccess,
        transactionMessage: state.rPosts.transactionMessage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPostFromServer: (params, id) => dispatch(postActionType.getPostFromServer(params, id)),
        getAlbumsFromServer: (params, id) => dispatch(albumActionType.getAlbumFromServer(params, id)),
        savePostToServer: (post) => dispatch(postActionType.savePostToServer(post))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);