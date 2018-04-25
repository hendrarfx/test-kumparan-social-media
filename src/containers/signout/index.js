import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionType from '../../redux/auth/actions';

class SignOut extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return <Redirect to="/" />
    }
}
const mapsStateToProps = state => {
    return {
        login: state.rAuth.login
    };
};
const mapsDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actionType.logout())
    };
};

export default connect(mapsStateToProps, mapsDispatchToProps)(SignOut);