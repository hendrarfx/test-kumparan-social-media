import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import PublicRouter from './router';
import {MuiThemeProvider} from "material-ui";
import {themes} from "./common/config/material.ui.themes.config";

class App extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={themes}>
                <BrowserRouter>
                    <PublicRouter/>
                </BrowserRouter>
            </MuiThemeProvider>

        );
    }
}

export default App;
