import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dialog, FlatButton, TextField} from "material-ui";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class PostForm extends Component {
    static propTypes = {
        dialogTitle: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        postTitle: PropTypes.string.isRequired,
        postTitleOnChange: PropTypes.func.isRequired,
        postBody: PropTypes.string.isRequired,
        postBodyOnChange: PropTypes.func.isRequired,
        message: PropTypes.string
    };
    static defaultProps = {
        dialogTitle: 'Post Form',
        postTitle: '',
        postBody: '',
    }

    render() {

        const actions = [
            <FlatButton
                label="CANCEL"
                labelStyle={{fontWeight: 'bold'}}
                primary={true}
                style={{marginRight: '15px'}}
                onClick={this.props.onRequestClose}
            />,
            <FlatButton
                label="SAVE"
                labelStyle={{fontWeight: 'bold'}}
                primary={true}
                onClick={this.props.onSubmit}
            />
        ];
        const messageRendered = (this.props.message !== '' && this.props.message !== null && this.props.message !== undefined) ?
            <div style={{color: 'red', textAlign: 'center',marginTop:'15px'}}>*{this.props.message}</div> : null;

        return (<Dialog
            title={this.props.dialogTitle}
            titleStyle={{fontSize: '20pt'}}
            modal={true}
            actions={actions}
            style={{marginTop: '-50px'}}
            onRequestClose={this.closeModal}
            contentStyle={{width: '80%', maxWidth: 'none'}}
            open={this.props.open}>
            <TextField
                type="text"
                style={{fontSize: '18pt'}}
                floatingLabelStyle={{fontSize: '18pt'}}
                value={this.props.postTitle}
                onChange={this.props.postTitleOnChange}
                fullWidth={true}
                floatingLabelText={'Title'}
            />
            <ReactQuill
                style={{height: '350px'}}
                defaultValue={this.props.postBody}
                onChange={(content, delta, source, editor) => this.props.postBodyOnChange(content)}
            />
            <br />
            <br />
            {messageRendered}
            <br/>
        </Dialog>);
    }
}

export default PostForm;