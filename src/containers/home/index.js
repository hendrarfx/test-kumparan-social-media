import React, {Component} from 'react';
import {AppBar, Navigation} from '../../components/navigation';
import AppRouter from '../appRouter';

class Home extends Component {
    render() {
        return (<div>
            <AppBar/>
            <Navigation/>
            <main>
                <AppRouter {...this.props} />
            </main>
        </div>);
    };
}

export default Home;