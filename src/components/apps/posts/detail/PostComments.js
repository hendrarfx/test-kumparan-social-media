import React, {Component} from 'react';
import {Card, CardHeader, CardText, CircularProgress} from "material-ui";
import PropTypes from 'prop-types';

import ScrollBar from '../../../UI/ScrollBar';
import {snackBarActionType, commentActionType} from "../../../../redux/actions";
import {connect} from "react-redux";
import Comment from './Comment';
import DialogDeleteComment from './DialogDeleteComment';
import DialogUpdateComment from './DialogUpdateComment';

class PostComments extends Component {
    static propTypes = {
        comments: PropTypes.array,
        isStillLoading: PropTypes.bool,
        error: PropTypes.string,
        canModify: PropTypes.bool.isRequired
    };

    static defaultProps = {
        canModify: false
    }

    state = {
        comments: '',
        submitOnProcess: false,
        deleteModalOpen: false,
        updateModalOpen: false,
        submitMode: '',
        selectedValue: '',
        formMessage: ''
    }

    componentDidUpdate() {
        this.afterTransaction();
    }

    selectData = (value, mode) => {
        const data = {...value};
        let deleteModalOpen = false;
        let updateModalOpen = false;
        if (mode === 'update') {
            deleteModalOpen = false;
            updateModalOpen = true;
        } else if (mode === 'delete') {
            deleteModalOpen = true;
            updateModalOpen = false;
        }
        this.setState({selectedValue: data, deleteModalOpen: deleteModalOpen, updateModalOpen: updateModalOpen});
    }

    deleteCommentsFromServer = () => {
        const data = {...this.state.selectedValue};
        this.props.onDelete(data);
        this.setState({submitOnProcess: true, submitMode: 'delete'});
    }

    saveCommentToServer = () => {
        const data = {...this.state.selectedValue};

        if (data.body !== '' && data.body !== null && data.body !== undefined) {
            this.props.onUpdate(data);
            this.setState({submitOnProcess: true, submitMode: 'update'});
        } else {
            this.setState({formMessage: 'Body is required'});
        }
    }

    afterTransaction = () => {
        if (this.props.transactionInProcess === false && this.state.submitOnProcess === true) {

            if (this.props.transactionSuccess) {
                if (this.state.submitMode === 'update') {

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

        let rendered = <div align="center">No Comments<br/> {this.props.error}</div>;

        if (this.props.isStillLoading) {
            rendered = (<div style={{marginTop: '50px', textAlign: 'center'}}><CircularProgress/></div>);
        } else {
            if (this.props.comments !== undefined) {
                if (this.props.comments.length > 0) {
                    rendered = this.props.comments.map((data) => {
                        return <Comment key={data.id} canModify={this.props.canModify} data={data}
                                        onSelect={this.selectData}/>
                    });
                }
            }
        }

        return (<div>

            <DialogDeleteComment
                open={this.state.deleteModalOpen}
                onClose={() => this.setState({deleteModalOpen: false})}
                onYes={this.deleteCommentsFromServer}
            />
            <DialogUpdateComment
                onSubmitToServer={this.state.submitOnProcess}
                open={this.state.updateModalOpen}
                onChange={(value) => {
                    const data = {...this.state.selectedValue};
                    data.body = value;
                    this.setState({selectedValue: data});
                }}
                value={this.state.selectedValue}
                errorMessage={this.state.formMessage}
                onClose={() => this.setState({updateModalOpen: false})}
                onYes={this.saveCommentToServer}
            />
            <Card>
                <CardHeader
                    title={'All Comments'}
                    titleStyle={{fontWeight: 'bold', fontSize: '14pt'}}
                    style={{borderBottom: 'thin solid #e5e5e5', margin: '0px 16px'}}
                />
                <CardText>
                    <ScrollBar id="scrollBarPostComments" height="400px">
                        {rendered}
                    </ScrollBar>
                </CardText>
            </Card></div>);
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
        onUpdate: (comment) => dispatch(commentActionType.updateCommentToServer(comment)),
        onDelete: (comment) => dispatch(commentActionType.deleteCommentFromServer(comment)),
        openSnackBar: (message) => dispatch(snackBarActionType.openSnackBar(message)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComments);