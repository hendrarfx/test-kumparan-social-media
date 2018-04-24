import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import PublicRouter from './router';
import {MuiThemeProvider} from "material-ui";
import {themes} from "./common/config/material.ui.themes.config";
import {Provider} from "react-redux";
import {store} from "./redux/store";

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={themes}>
                    <BrowserRouter>
                        <PublicRouter />
                    </BrowserRouter>
                </MuiThemeProvider>
            </Provider>

        );
    }
}

export default App;
