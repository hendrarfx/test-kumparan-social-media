import React, {Component} from 'react';
import {Card, CardText, CircularProgress, Dialog, RaisedButton, TextField} from "material-ui";
import PropTypes from 'prop-types';
import {snackBarActionType, commentActionType} from "../../../../redux/actions";
import {connect} from "react-redux";

class AddCommentForms extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        postId: PropTypes.number,
        userName: PropTypes.string,
        email: PropTypes.string,
        onRefreshData: PropTypes.func
    };

    static defaultProps = {
        show: false
    }

    state = {
        comments: '',
        onSubmit: false
    }

    componentDidUpdate() {
        this.afterTransaction();
    }

    submitCommentToServer = () => {
        if (this.state.comments !== '' && this.state.comments !== null && this.state.comments !== undefined) {
            const comments = {
                postId: this.props.postId,
                name: this.props.userName,
                email: this.props.email,
                body: this.state.comments
            };
            this.props.saveCommentToServer(comments);
            this.setState({onSubmit: true, comments: ''});
        }
    };

    afterTransaction = () => {
        if (this.props.transactionInProcess === false && this.state.onSubmit === true) {

            if (this.props.transactionSuccess) {
                this.props.openSnackBar('Comment have been saved');
                this.setState({onSubmit: false, comments: ''});
            }

            if (this.props.transactionFailed) {
                this.props.openSnackBar(this.props.transactionMessage);
                this.setState({onSubmit: false, comments: ''});
            }
        }
    }

    render() {
        const rendered = this.props.show ? (<div>
                <Dialog
                    title=""
                    titleStyle={{textAlign: 'center'}}
                    modal={true}
                    open={this.state.onSubmit}>
                    <div align="center"><CircularProgress size={80} thickness={5}/><br/><br/><h4>Save Comment to Server,
                        Please
                        Wait ...</h4></div>
                </Dialog>
                <Card style={{marginTop: '10px'}}>

                    <CardText>
                        <TextField
                            hintText={'Add your comment here'}
                            fullWidth={true}
                            multiLine={true}
                            rows={3}
                            value={this.state.comments}
                            floatingLabelStyle={{fontWeight: 'bold', fontSize: '18pt'}}
                            floatingLabelText={'Add Comment'}
                            onChange={(event) => this.setState({comments: event.target.value})}
                            rowsMax={3}
                            type="text"
                        />
                        <div align="right">
                            <RaisedButton primary={true} label={'SUBMIT'} onClick={this.submitCommentToServer}/>
                        </div>
                    </CardText>
                </Card></div>
        ) : null;
        return rendered;
    }
}


const mapStateToProps = (state) => {
    return {
        transactionInProcess: state.rComments.cTransactionInProcess,
        transactionFailed: state.rComments.cTransactionFailed,
        transactionSuccess: state.rComments.cTransactionSuccess,
        transactionMessage: state.rComments.cTransactionMessage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveCommentToServer: (comment) => dispatch(commentActionType.saveCommentToServer(comment)),
        openSnackBar: (message) => dispatch(snackBarActionType.openSnackBar(message)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForms);