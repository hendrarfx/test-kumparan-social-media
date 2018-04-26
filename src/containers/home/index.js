import React, {Component} from 'react';
import {AppBar, Navigation} from '../../components/navigation';
import AppRouter from '../appRouter';
import {connect} from "react-redux";
import {snackBarActionType} from '../../redux/actions';
import {Snackbar} from "material-ui";

class Home extends Component {
    render() {
        return (<div>
            <AppBar {...this.props} />
            <Navigation {...this.props} />
            <main>
                <AppRouter {...this.props} />
            </main>
            <Snackbar
                open={this.props.open}
                message={this.props.message}
                autoHideDuration={4000}
                onRequestClose={this.closeSnackBar}
            />
        </div>);
    };
}

const mapStateToProps = (state) => {
    return {
        message: state.rSnackBar.message,
        open: state.rSnackBar.open
    }
};

const mapStateToDispatch = (dispacth) => {
    return {
        closeSnackBar: () => dispacth(snackBarActionType.closeSnackBar())
    }
};

export default connect(mapStateToProps, mapStateToDispatch)(Home);