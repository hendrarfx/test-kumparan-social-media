import React, {Component} from 'react';
import {Card, CardHeader, CardText, Dialog, IconButton, FlatButton} from "material-ui";
import PropTypes from 'prop-types';
import {ActionDelete} from "material-ui/svg-icons/index";
import PostForm from "../postForm";

class PostBody extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showAddModalPost: false,
            form: {
                id: props.post.id,
                userId: props.post.userId,
                title: props.post.title,
                body: props.post.body
            },
            formMessage: '',
            submitOnProcess: false,

            deleteModalOpen: false,
            submitMode: ''
        };
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
        post: PropTypes.object.isRequired,
        canModify: PropTypes.bool.isRequired,
        onDelete: PropTypes.func,
        onUpdate: PropTypes.func,
        afterUpdate: PropTypes.func,
        afterDelete: PropTypes.func,
        transactionInProcess: PropTypes.bool,
        transactionFailed: PropTypes.bool,
        transactionSuccess: PropTypes.bool,
        transactionMessage: PropTypes.string,
        openSnackBar: PropTypes.func,
        history:PropTypes.object
    };

    static defaultProps = {
        canModify: false,
        transactionInProcess: false,
        transactionFailed: false,
        transactionSuccess: false,
        transactionMessage: ''
    }

    componentDidUpdate() {
        this.afterTransaction();
    }

    openModal = (data) => {
        this.setState({showAddModalPost: true, formMessage: ''})
    };

    closeModal = () => {
        this.setState({showAddModalPost: false, formMessage: ''})
    }

    changeTitleValue = (event) => {
        let newValue = {...this.state.form};
        newValue.title = event.target.value;
        this.setState({form: newValue, formMessage: ''});
    }

    changeBodyValue = (content) => {
        let newValue = {...this.state.form};
        newValue.body = content;
        this.setState({form: newValue, formMessage: ''});
    }

    savePostToServer = () => {
        const data = {...this.state.form};
        data.userId = this.props.user.id;
        if (data.title !== '' && data.title !== null && data.title !== undefined) {
            if (data.body !== '' && data.body !== null && data.body !== undefined) {
                this.props.onUpdate(data);
                this.setState({submitOnProcess: true, submitMode: 'update'});
            } else {
                this.setState({formMessage: 'Body is required'});
            }
        } else {
            this.setState({formMessage: 'Title is required'});
        }
    }

    deletePostFromServer = () => {
        const data = {...this.state.form};
        this.props.onDelete(data);
        this.setState({submitOnProcess: true, submitMode: 'delete'});
    }

    afterTransaction = () => {

        if (this.props.transactionInProcess === false && this.state.submitOnProcess === true) {

            if (this.props.transactionSuccess) {
                if (this.state.submitMode === 'update') {
                    this.closeModal();
                }
                if (this.state.submitMode === 'delete') {
                    this.props.history.push('/dashboard');
                }
                this.props.openSnackBar(this.props.transactionMessage);
                this.setState({deleteModalOpen: false, submitOnProcess: false});
            }

            if (this.props.transactionFailed) {
                this.setState({
                    formMessage: this.props.transactionMessage,
                    submitOnProcess: false,
                    deleteModalOpen: false
                });
            }
        }
    }

    render() {


        const rendered = this.props.canModify ? <CardText style={{textAlign: 'right'}}>
            <IconButton tooltip="Update Post" iconStyle={{color: '#555'}} onClick={this.openModal}>
                <i className="material-icons">mode_edit</i>
            </IconButton>
            <IconButton tooltip="Delete Post" iconStyle={{color: '#555'}}
                        onClick={() => this.setState({deleteModalOpen: true})}>
                <ActionDelete/>
            </IconButton>
        </CardText> : null;

        const actions = [
            <FlatButton
                label="NO"
                labelStyle={{fontWeight: 'bold'}}
                primary={true}
                style={{marginRight: '15px'}}
                onClick={() => this.setState({deleteModalOpen: false})}
            />,
            <FlatButton
                label="YES"
                labelStyle={{fontWeight: 'bold'}}
                primary={true}
                onClick={this.deletePostFromServer}
            />
        ];

        return (<div>

            <Dialog
                actions={actions}
                title={'Delete Post'}
                open={this.state.deleteModalOpen}
                onRequestClose={() => this.setState({deleteModalOpen: false})}>
                Do you want delete post?
            </Dialog>

            <PostForm dialogTitle="UPDATE POST" open={this.state.showAddModalPost} onRequestClose={this.closeModal}
                      onSubmit={this.savePostToServer} postTitle={this.state.form.title}
                      postTitleOnChange={this.changeTitleValue}
                      message={this.state.formMessage}
                      onSubmitLoading={this.props.transactionInProcess}
                      postBody={this.state.form.body} postBodyOnChange={this.changeBodyValue}/>

            <Card>
                <CardHeader
                    title={this.props.post.title}
                    titleStyle={{fontWeight: 'bold', fontSize: '14pt'}}
                    subtitle={'by ' + this.props.user.name}/>
                <CardText>
                    <p>{this.props.post.body}</p>
                </CardText>
                {rendered}
            </Card></div>);
    }
}

export default PostBody;