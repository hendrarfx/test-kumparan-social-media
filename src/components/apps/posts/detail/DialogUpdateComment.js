import React from 'react';
import {CircularProgress, Dialog, FlatButton, TextField} from "material-ui";

const dialogUpdateComment = (props) => {
    const actions = [
        <FlatButton
            label="CANCEL"
            labelStyle={{fontWeight: 'bold'}}
            primary={true}
            style={{marginRight: '15px'}}
            onClick={props.onClose}
        />,
        <FlatButton
            label="SAVE"
            labelStyle={{fontWeight: 'bold'}}
            primary={true}
            onClick={props.onYes}
        />
    ];

    const messageRendered = (props.errorMessage !== '' && props.errorMessage !== null && props.errorMessage !== undefined) ?
        <div style={{color: 'red', textAlign: 'center', marginTop: '15px'}}>*{props.errorMessage}</div> : null;

    const forms = (<Dialog
        title="Update Comment"
        titleStyle={{fontSize: '20pt'}}
        modal={true}
        actions={actions}
        style={{marginTop: '-50px'}}
        onRequestClose={props.onClose}
        contentStyle={{width: '60%', maxWidth: 'none'}}
        open={props.open}>
        <hr/>
        <table cellSpacing={10}>
            <tbody>
            <tr>
                <td width={'75px'}><b>Name</b></td>
                <td>{props.value.name}</td>
            </tr>
            <tr style={{marginTop:'5px'}}>
                <td><b>Email</b></td>
                <td>{props.value.email}</td>
            </tr>
            </tbody>

        </table>


        <TextField
            multiLine={true}
            rowsMax={5}
            rows={5}
            floatingLabelText={'Comment'}
            fullWidth={true}
            value={props.value.body}
            onChange={(event) => props.onChange(event.target.value)}
        />
        <br/>
        {messageRendered}
        <br/>
    </Dialog>);

    const loading = (<Dialog
        titleStyle={{fontSize: '20pt'}}
        modal={true}
        style={{marginTop: '-50px'}}
        onRequestClose={props.onClose}
        open={props.open}>
        <div align="center"><CircularProgress size={80} thickness={5}/><br/><br/><h4>Update Comment In Process, Please
            Wait ...</h4></div>
    </Dialog>);

    const rendered = props.onSubmitToServer ? loading : forms;

    return rendered;
};

export default dialogUpdateComment;