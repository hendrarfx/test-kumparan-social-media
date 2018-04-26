import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dialog, FlatButton, TextField,CircularProgress} from "material-ui";

class PostForm extends Component {
    static propTypes = {
        dialogTitle: PropTypes.string.isRequired,
        open: PropTypes.bool.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onSubmitLoading: PropTypes.bool.isRequired,
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
            <div style={{color: 'red', textAlign: 'center', marginTop: '15px'}}>*{this.props.message}</div> : null;

        const forms = (<Dialog
            title={this.props.dialogTitle}
            titleStyle={{fontSize: '20pt'}}
            modal={true}
            actions={actions}
            style={{marginTop: '-50px'}}
            onRequestClose={this.closeModal}
            contentStyle={{width: '100%', maxWidth: 'none'}}
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
            <TextField
                multiLine={true}
                rowsMax={5}
                rows={5}
                floatingLabelText={'Body'}
                floatingLabelStyle={{fontSize: '18pt'}}
                fullWidth={true}
                value={this.props.postBody}
                onChange={(event)=>this.props.postBodyOnChange(event.target.value)}
                />
            <br/>
            {messageRendered}
            <br/>
        </Dialog>);

        const loading = (<Dialog
            title={this.props.dialogTitle}
            titleStyle={{fontSize: '20pt'}}
            modal={true}
            actions={actions}
            style={{marginTop: '-50px'}}
            onRequestClose={this.closeModal}
            open={this.props.open}>
            <div align="center"><CircularProgress size={80} thickness={5}/><br/><br/><h4>Save In Process, Please
                Wait ...</h4></div>
        </Dialog>);

        const rendered=this.props.onSubmitLoading ? loading:forms;

        return rendered;
    }
}

export default PostForm;