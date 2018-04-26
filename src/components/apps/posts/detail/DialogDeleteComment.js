import React from 'react';
import {Dialog, FlatButton} from "material-ui";

const dialogDeleteComment = (props) => {
    const actions = [
        <FlatButton
            label="NO"
            labelStyle={{fontWeight: 'bold'}}
            primary={true}
            style={{marginRight: '15px'}}
            onClick={props.onClose}
        />,
        <FlatButton
            label="YES"
            labelStyle={{fontWeight: 'bold'}}
            primary={true}
            onClick={props.onYes}
        />
    ];

    return <Dialog
        actions={actions}
        title={'Delete Comment'}
        open={props.open}
        onRequestClose={props.onClose}>
        Do you want delete this comments?
    </Dialog>
};

export default dialogDeleteComment;