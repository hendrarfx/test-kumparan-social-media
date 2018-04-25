import React, {Component} from 'react';
import {Card, CardHeader, CardText, RaisedButton, TextField} from "material-ui";
import PropTypes from 'prop-types';

class AddCommentForms extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    render() {
        return (<Card style={{marginTop: '25px'}}>
            <CardHeader
                title={'Add Comments'}
                titleStyle={{fontWeight: 'bold', fontSize: '14pt'}}
            />
            <CardText>
                <TextField
                    hintText={'Add your comment here'}
                    fullWidth={true}
                    multiLine={true}
                    rows={3}
                    rowsMax={3}
                    type="text"
                />
                <div align="right">
                    <RaisedButton primary={true} label={'SUBMIT'}/>
                </div>
            </CardText>
        </Card>);
    }
}

export default AddCommentForms;