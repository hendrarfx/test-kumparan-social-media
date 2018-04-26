import React, {Component} from 'react';
import {
    Inputs,
    checkValidity,
    checkFormValid,
    getFormValueJSONObject,
    elementType
} from '../../components/UI/MUICustomInput';
import classes from './SignIn.css';
import {connect} from 'react-redux';
import {authActionType} from '../../redux/actions';

import {Card, CardText, CardTitle, CircularProgress, Dialog} from 'material-ui';
import {RaisedButton} from "material-ui";
import {styling} from '../../common/config/material.ui.themes.config';

class SignIn extends Component {
    state = {
        form: [
            {
                id: 'username',
                label: 'Username',
                hintText: 'Your Username',
                elementType: elementType.input,
                config: {
                    validation: {
                        required: true
                    }
                },
                valid: false,
                validationMessage: [],
                touched: false,
                value: '',
                defaultValue: ''
            }, {
                id: 'password',
                label: 'Password',
                hintText: 'Your Password',
                elementType: elementType.password,
                config: {
                    validation: {
                        required: true
                    }
                },
                valid: false,
                validationMessage: [],
                touched: false,
                value: '',
                defaultValue: ''
            }
        ],
        loginObject: {}
    }

    inputChangedHandler = (event, id) => {
        let authForm = [...this.state.form];
        let selected = {...authForm[id]};
        selected.value = event.target.value;
        checkValidity(selected);
        authForm[id] = selected;
        const formValid = checkFormValid(authForm);
        const jsonObj = getFormValueJSONObject(authForm);
        this.setState({form: authForm, formIsValid: formValid, loginObject: jsonObj});
    }

    componentWillMount() {
        this.props.checkStateFromLocalStorage();
    }

    componentDidUpdate() {
        if (this.props.isLogin) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (<div className={classes.wrapper} style={{backgroundColor: styling.palette.primary3Color}}>
            <div className={classes.SignIn}>

                <Dialog
                    title=""
                    titleStyle={{textAlign: 'center'}}
                    modal={true}
                    open={this.props.authInProcess}>
                    <div align="center"><CircularProgress size={80} thickness={5}/><br/><br/><h4>Auth In Process, Please
                        Wait ...</h4></div>
                </Dialog>
                <Card style={{padding: '25px'}}>
                    <CardTitle title={'SOCMED DASHBOARD'} titleStyle={{
                        textAlign: 'center',
                        fontSize: '20pt',
                        fontWeight: 'bold',
                        color: styling.palette.primary1Color,
                        paddingBottom: '10px',
                        borderBottom: 'thin solid #ddd'
                    }}
                               subtitle={'Sign In to Your Account'}
                               subtitleStyle={{
                                   textAlign: 'center',
                                   marginTop: '16px',
                                   fontWeight: 'bold',
                                   fontSize: '12pt'
                               }}
                    />
                    <CardText>
                        <Inputs form={this.state.form} onChange={this.inputChangedHandler}/>
                        <RaisedButton
                            label={'SIGN IN'}
                            fullWidth={true}
                            labelStyle={{fontSize: '16pt'}}
                            disabled={!this.state.formIsValid}
                            primary={true}
                            onClick={() => this.props.login(this.state.loginObject)}
                        />
                        <div style={{marginTop: '25px', marginBottom: '10px', textAlign: 'center', color: 'red'}}>
                            {this.props.errorMessage}</div>
                    </CardText>
                </Card>

            </div>
        </div>)
            ;
    }
}

const mapsStateToProps = state => {
    return {
        authInProcess: state.rAuth.inProcess,
        error: state.rAuth.error,
        errorMessage: state.rAuth.errorMessage,
        isLogin: state.rAuth.login
    };
};

const mapsDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(authActionType.loginUser(user)),
        checkStateFromLocalStorage: () => dispatch(authActionType.checkStateFromLocalStorage())
    };
};

export default connect(mapsStateToProps, mapsDispatchToProps)(SignIn);