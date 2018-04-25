import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dialog, TextField} from "material-ui";

class PostForm extends Component {
    static propTypes = {
        dialogTitle:PropTypes.string.isRequired,
        open:PropTypes.bool.isRequired,
        onRequestClose:PropTypes.func.isRequired
    };

    render() {
        return (<Dialog
            title="ADD POST Post"
            modal={false}
            style={{marginTop: '-50px'}}
            onRequestClose={this.closeModal}
            contentStyle={{width: '80%', maxWidth: 'none'}}
            open={this.props.open}>
            <TextField
                type="text"
                fullWidth={true}
                floatingLabelText={'Title'}
            />
        </Dialog>);
    }
}

export default PostForm;