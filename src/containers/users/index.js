import React, {Component} from 'react';
import Wrapper from "../../common/hoc/Wrapper";
import {connect} from "react-redux";
import * as actionType from '../../redux/users/actions';
import CompUser from '../../components/apps/users';
import {CircularProgress} from "material-ui";

class Users extends Component {

    componentDidMount() {
        this.props.getUsersFromServer()
    }

    render() {

        const error = this.props.errorGettingUser !== '' && this.props.errorGettingUser !== null && this.props.errorGettingUser !== undefined ? (
            <div style={{
                marginTop: '25px',
                color: 'red',
                textAlign: 'center'
            }}>{this.props.errorGettingUser}</div>) : null;
        let rendered = null;

        if (this.props.loadData) {
            rendered = (<div style={{marginTop: '50px', textAlign: 'center'}}><CircularProgress/></div>);
        } else {
            rendered = <CompUser data={this.props.usersData} onClick={this.selectUser} baseURL={this.props.match.url} />
        }

        return (<Wrapper title="All Users" showHorizontalLine={true}>
            {rendered}
            {error}
        </Wrapper>);
    }
}

const mapStateToProps = (state) => {
    return {
        usersData: state.rUsers.users,
        loadData: state.rUsers.gettingDataFromServer,
        errorGettingUser: state.rUsers.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsersFromServer: () => dispatch(actionType.getUserFromServer())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Users);