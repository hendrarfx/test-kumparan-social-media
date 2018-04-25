import React, {Component} from 'react';
import {AppBar, Navigation} from '../../components/navigation';
import AppRouter from '../appRouter';

class Home extends Component {
    render() {
        return (<div>
            <AppBar {...this.props} />
            <Navigation {...this.props} />
            <main>
                <AppRouter {...this.props} />
            </main>
        </div>);
    };
}

export default Home;