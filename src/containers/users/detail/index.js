import React, {Component} from 'react';
import Wrapper from "../../../common/hoc/Wrapper";
import {userActionType, postActionType, albumActionType} from "../../../redux/actions";
import {filter} from '../../../common/helper';
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import classes from './user-detail.css';
import {UserDetail, UserPost, UserAlbum} from '../../../components/apps/users/detail';
import {Avatar, Chip, FontIcon} from "material-ui";

class UsersDetail extends Component {

    state = {
        key: '',
        selectedUser: {},
        userNotNull: false,
        showPost: true,
        showAlbums: false,
    }

    componentWillMount() {
        try {
            this.setState({key: this.props.match.params.id});
        } catch (error) {
            this.props.history.goBack();
        }
    }

    componentDidMount() {
        this.findOneUser();
        this.findData();
    }

    componentDidUpdate() {
        this.findOneUser();
    }

    showPost = () => {
        this.setState({showPost: true, showAlbums: false});
    }

    showAlbum = () => {
        this.setState({showPost: false, showAlbums: true});
    }

    findOneUser = () => {
        if (!this.state.userNotNull && this.props.loadData === false) {
            if (this.props.usersData !== undefined) {
                if (this.props.usersData.length <= 0) {
                    this.props.getUsersFromServer();
                } else {
                    if (this.state.key !== '' && this.state.key !== null && this.state.key !== undefined) {
                        const filtered = filter([...this.props.usersData], 'id', this.state.key);
                        if (filtered.length > 0) {
                            this.setState({selectedUser: filtered[0], userNotNull: true});
                        } else {
                            this.props.history.goBack();
                        }
                    } else {
                        this.props.history.goBack();
                    }
                }
            }
        }
    }

    findData = () => {
        const key = this.state.key;
        if (key !== undefined && key !== '' && key !== null) {
            const filter = {userId: this.state.key};
            this.props.getAlbumsFromServer(filter, this.state.key);
            this.props.getPostFromServer(filter, this.state.key);
        }
    }

    render() {
        const rendered = this.state.showAlbums ?
            <UserAlbum
                title={this.state.selectedUser.name + ' Albums'}
                data={this.props.myAlbums[this.state.key]}
                baseURL={this.props.match.url}
                isStillLoading={this.props.loadDataAlbums}
                error={this.props.errorGettingAlbum}
            /> :
            <UserPost title={this.state.selectedUser.name + ' Posts'} data={this.props.myPost[this.state.key]}
                      baseURL={this.props.match.url}
                      isStillLoading={this.props.loadDataPost}
                      error={this.props.errorGettingPost}/>

        return (
            <Wrapper title="User Detail" showHorizontalLine={true} showBackButton={true} history={this.props.history}>
                <Row>
                    <Col xs={12} sm={3} md={3} lg={3}>
                        <UserDetail user={this.state.selectedUser}/>
                    </Col>
                    <Col xs={12} sm={9} md={9} lg={9}>
                        <div className={classes.wrapper}>
                            <Chip className={classes.chip} onClick={this.showPost}>
                                <Avatar icon={<FontIcon className="material-icons">subject</FontIcon>}/>
                                Posts
                            </Chip>
                            <Chip className={classes.chip} onClick={this.showAlbum}>
                                <Avatar icon={<FontIcon className="material-icons">folder</FontIcon>}/>
                                Albums
                            </Chip>
                        </div>
                        <br/>
                        {rendered}
                    </Col>
                </Row>

            </Wrapper>);
    }
}


const mapStateToProps = (state) => {
    return {
        usersData: state.rUsers.users,
        loadData: state.rUsers.gettingDataFromServer,
        errorGettingUser: state.rUsers.error,
        myPost: state.rPosts.postData,
        loadDataPost: state.rPosts.gettingDataFromServer,
        errorGettingPost: state.rPosts.error,
        myAlbums: state.rAlbums.albums,
        loadDataAlbums: state.rAlbums.gettingDataFromServer,
        errorGettingAlbum: state.rAlbums.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsersFromServer: () => dispatch(userActionType.getUserFromServer()),
        getPostFromServer: (params, id) => dispatch(postActionType.getPostFromServer(params, id)),
        getAlbumsFromServer: (params, id) => dispatch(albumActionType.getAlbumFromServer(params, id)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(UsersDetail);