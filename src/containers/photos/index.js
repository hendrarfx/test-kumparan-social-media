import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import {Dialog, FlatButton} from 'material-ui';
import Wrapper from "../../common/hoc/Wrapper";
import queryString from 'query-string';
import {connect} from "react-redux";
import {albumActionType, photoActionType} from "../../redux/actions";
import {filter as filterData} from '../../common/helper';
import PhotosComponent from '../../components/apps/photos';

class Photos extends Component {

    state = {
        aid: '',
        uid: '',
        selectedAlbum: {},
        albumNotNull: false,
        selectedPhoto: {},
        showDetailPhoto: false
    }

    componentWillMount() {
        const params = queryString.parse(this.props.location.search);
        this.setState({aid: params.aid, uid: params.uid});
    }

    componentDidMount() {
        this.findAlbum();
        this.findData();
    }

    componentDidUpdate() {
        this.findAlbum();
    }

    findAlbum = () => {
        if (!this.state.albumNotNull && this.props.loadDataAlbums === false) {

            try {
                if (this.props.myAlbums[this.state.uid].length > 0) {

                    const filtered = filterData(this.props.myAlbums[this.state.uid], 'id', this.state.aid);

                    if (filtered.length > 0) {
                        this.setState({selectedAlbum: filtered[0], albumNotNull: true});
                    } else {
                        this.setState({albumNotNull: true, selectedAlbum: {}});
                    }
                } else {
                    this.setState({albumNotNull: true});
                }
            } catch (error) {
                const filter = {userId: this.state.uid};
                this.props.getAlbumsFromServer(filter, this.state.uid);
            }
        }
    }

    findData = () => {
        const key = this.state.aid;
        if (key !== undefined && key !== '' && key !== null) {
            const filter = {albumId: key};
            this.props.getPhotosFromServer(filter, key);
        }
    }

    selectPhoto = (data) => {
        this.setState({selectedPhoto: data, showDetailPhoto: true})
    };

    closeModal = () => {
        this.setState({showDetailPhoto: false})
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                labelStyle={{fontWeight: 'bold'}}
                primary={true}
                onClick={this.closeModal}
            />,
        ];
        return (
            <Wrapper title={'Photos from ' + this.state.selectedAlbum.title} showHorizontalLine={true}
                     showBackButton={true} history={this.props.history}>
                <Row>
                    <Col sm={1} md={1} lg={1} xs={1}/>
                    <Col sm={10} md={10} lg={10} xs={10}>

                        <Dialog
                            title=""
                            modal={false}
                            style={{marginTop: '-50px'}}
                            actions={actions}
                            onRequestClose={this.closeModal}
                            contentStyle={{width: '100%', maxWidth: 'none', height: '700px'}}
                            open={this.state.showDetailPhoto}>

                            <Row>
                                <Col sm={6} md={6} lg={6} xs={6}>
                                    <div align="center">
                                        <img src={this.state.selectedPhoto.url} width={'600px'} height={'auto'}
                                             alt={this.state.selectedPhoto.title}/>
                                    </div>
                                </Col>
                                <Col sm={6} md={6} lg={6} xs={6}>
                                    <h4><b>{this.state.selectedPhoto.title}</b></h4>
                                    <table style={{width: '100%'}}>
                                        <tbody>
                                        <tr>
                                            <td style={{width: '25%'}}>Photo ID</td>
                                            <td style={{width: '75%'}}>{this.state.selectedPhoto.id}</td>
                                        </tr>
                                        <tr>
                                            <td>Album</td>
                                            <td>{this.state.selectedAlbum.title}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                        </Dialog>

                        <PhotosComponent data={this.props.myPhoto[this.state.aid]}
                                         isStillLoading={this.props.loadDataPhoto}
                                         onClick={this.selectPhoto}
                                         error={this.props.errorGettingPhoto}/>
                    </Col>
                    <Col sm={1} md={1} lg={1} xs={1}/>
                </Row>

            </Wrapper>
        );
    }
    ;
}


const mapStateToProps = (state) => {
    return {
        myAlbums: state.rAlbums.albums,
        loadDataAlbums: state.rAlbums.gettingDataFromServer,
        errorGettingAlbum: state.rAlbums.error,
        myPhoto: state.rPhotos.photo,
        loadDataPhoto: state.rPhotos.gettingDataFromServer,
        errorGettingPhoto: state.rPhotos.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPhotosFromServer: (params, id) => dispatch(photoActionType.getPhotoFromServer(params, id)),
        getAlbumsFromServer: (params, id) => dispatch(albumActionType.getAlbumFromServer(params, id)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Photos);